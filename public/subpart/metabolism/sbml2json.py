#!/usr/bin/python2.7
#-*- coding: utf-8 -*-
"""
Created on Wed Jan 31 2018
Latest update on Thu Feb 8 2018
@author: Amelie Laporte
"""
import sys
import json

sbml_json=[]

#fonction pour suppRimer les notes et annotations

def getIndex(txt,startSelection,stopSelection,int1,int2):
    txt=txt[txt.index(startSelection)+int1:txt.index(stopSelection,txt.index(startSelection))+int2]
    return txt

def getName(text):
    try:
        return getIndex(text,'name="','" ',len('name="'),0)
    except ValueError:
        try:
            return getIndex(text,'name="','">',len('name="'),0)
        except ValueError:
            return getIndex(text,'name="','"/>',len('name="'),0)

def getId(text):
    try:
        return getIndex(text,' id="','" ',len(' id="'),0)
    except ValueError:
        if "<!--":
            pass
def getSpecies(text):
    try:
        return getIndex(text,'species="','" ',len('species="'),0)
    except ValueError:
        try:
            return getIndex(text,'species="','"/>',len('species="'),0)
        except ValueError:
            if "<!--":
                pass
def getListOf(attribut,sbml):
    liste=getIndex(sbml,"<listOf"+attribut+">","</listOf"+attribut+">",len("<listOf"+attribut+">"),0).split('\n')
    del liste[0]
    del liste[-1]
    return liste

def getReactionsInfo(text):
    listOfReactions=[]
    #add reaction node
    all_reactions=getIndex(text,"<listOfReactions>","</listOfReactions",len("<listOfReactions>"),0).split('</reaction>')
    del all_reactions[-1]
    for r in all_reactions:
        listOfReactions.append(getIndex(r,"<reaction",'>',len("<reaction"),1))
        for rxn in listOfReactions:
            r_id_dic= { "id": getId(rxn), "name": getName(rxn)}
            r_dic={ "data": r_id_dic, "group":"nodes","classes":"rxn" }
            sbml_json.append(r_dic)
            reac_id_dic= { "id": "", "source":"", "target":getId(rxn) }
            prod_id_dic = { "id": "", "source":getId(rxn), "target":"" }
            mod_id_dic = { "id": "", "source": "", "target": getId(rxn) }
            reaction_id=getId(rxn)
    #Add reactant -> reaction edge
        reactant=getIndex(r,"<listOfReactants>","</listOfReactants>",len("<listOfReactants>"),0).split("\n")
        del reactant[0]
        del reactant[-1]
        for reac in reactant:
            reac_id_dic["id"]=getSpecies(reac)+"_"+reaction_id
            reac_id_dic["source"]=getSpecies(reac)
            reac_dic={"data": reac_id_dic,"group":"edges","classes":"reactant"}
            sbml_json.append(reac_dic)
            reac_id_dic={"id": "", "source":"", "target":getId(rxn)}
    #Add reaction -> product edge
        product=getIndex(r,"<listOfProducts>","</listOfProducts>",len("<listOfProducts>"),0).split("\n")
        del product[0]
        del product[-1]
        for prod in product:
            prod_id_dic["id"]=getSpecies(prod)+"_"+reaction_id
            prod_id_dic["target"]=getSpecies(prod)
            prod_dic={"data": prod_id_dic,"group":"edges","classes":"product"}
            sbml_json.append(prod_dic)
            prod_id_dic = { "id": "", "source":getId(rxn), "target":"" }
    #Add modifier -> reaction edge
        try:
            modifier=getIndex(r,"<listOfModifiers>","</listOfModifiers>",len("<listOfModifiers>"),0).split("\n")
            del modifier[0]
            del modifier[-1]
            for mod in modifier:
                mod_id_dic["id"]=getSpecies(mod)+"_"+reaction_id
                mod_id_dic["source"]=getSpecies(mod)
                mod_dic={"data": mod_id_dic,"group":"edges","classes":"activation"}
                sbml_json.append(mod_dic)
        except ValueError:
            pass
    return sbml_json

def check_name_duplicated(sbml):
    name_duplicated=False
    name_dic={}
    for s in getListOf("Species",sbml):
        try:
            if getName(s) in name_dic:
                name_duplicated=True
        except ValueError:
            if getId(s) in name_dic:
                name_duplicated=True
                break
        try:
            if getName(s) not in name_dic:
                name_dic[getName(s)]=getId(s)
                name_duplicated=False
        except ValueError:
            if getId(s) not in name_dic:
                name_dic[getId(s)]=getId(s)
                name_duplicated=False
    return name_duplicated

def add_species(sbml):
    name_duplicated = check_name_duplicated(sbml)
    for s in getListOf("Species",sbml):
        if name_duplicated:
            try:
                s_id_dic = { "id": getId(s), "name": getName(s) }
            except ValueError:
                s_id_dic = { "id": getId(s), "name": getId(s) }                
        else:
            try:
                s_id_dic = { "id": getId(s), "name": getName(s) }
            except ValueError:
                s_id_dic={"id":getId(s), "name":getId(s)}
        s_dic = { "data": s_id_dic, "group": "nodes" }
        sbml_json.append(s_dic)

def add_sbml_objects(sbml_file):
    sbml=sbml_file.read()
    add_species(sbml)
    getReactionsInfo(sbml)

def main():
    sbml_file=open(sys.argv[1],'r')
    add_sbml_objects(sbml_file)
    sbml_file.close()
    f=open('model.json','w')
    json.dump(sbml_json, f, ensure_ascii=False, indent=2)
    f.close()
    print "Le fichier %s a ete exporte en model.json" %sys.argv[1]

if __name__=="__main__":
    main()
