# Metabolic viewer - SBML/JSON

## TO DO:

* input function: To convert a SBML file to JSON to be visualized.

* updating sbml2json to parse all kind of SBML files (managing errors and stuff).

* Add different options for the user: Updating the physarum file or visualizing their own file.

* improving the layout.

## JSON file structure:

**Example of the different part needed to construct the network and the information needed.**

```
[
  {
    "group": "nodes", 
    "data": {
      "id": "M_13dpg_c", 
      "name": "M_13dpg_c"
    }
  }, 
  {
    "group": "nodes", 
    "classes": "rxn", 
    "data": {
      "id": "R_ACKr", 
      "name": "R_acetate_kinase"
    }
  }, 
  {
    "group": "edges", 
    "classes": "reactant", 
    "data": {
      "source": "M_atp_c", 
      "id": "M_atp_c_R_ACKr", 
      "target": "R_ACKr"
    }
  }, 
   {
    "group": "edges", 
    "classes": "product", 
    "data": {
      "source": "R_ACKr", 
      "id": "M_adp_c_R_ACKr", 
      "target": "M_adp_c"
    }
  }
]
```
## SBML2JSON:
Can convert a SBML level 2 version 4 to our json structure.

Does not take into account the <notes> and <annotation> tags.

Need to be tested on other SBML files from Biomodels and others to manage the errors and the different levels.

(Does not use libSBML) 

## Credits:

Inspired by https://github.com/funasoul/visualizeSBML

Using Cytoscapejs
