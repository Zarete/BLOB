//Created by Amelie Laporte
function hideShow(){
  var span=document.getElementById("hideshow");
  var checkbox=document.getElementById("checkhide");
  if (checkbox.checked){
    span.innerHTML="Hide compounds"
    var icon=document.createElement('i');
    icon.className='fa fa-eye-slash';
    span.appendChild(icon);
    show();
  }else{
    span.innerHTML="Show compounds"
    var icon=document.createElement('i');
    icon.className='fa fa-eye'
    span.appendChild(icon);
    hide();
  }
}

//Created by Adrien Mendes Santos
//Global vavariable for each compounds, so hide and show functions can access them
var elco,elnad,elnadh,elho,eladp,elatp,elh,elgtp,elphos,elphos2,el2h2o,elutp,eludp,elppi,elpi,elh20,elHCO3,elamp,elgdpp,elimp,eltrna;  
var eltcoash,elcoash2,elcoash3,elcoash4,elcoq,elcoqh2,eltadp,elsterol,elpyruvate,elglyc,elrooh,elroh,elrx,elhx,el2h2o2;

//hide function, to remove the compounds from the graph.
//built this way and not using a loop, because of how works .restore().
//To restore elements, .restore() need know which element have been removed, only 1 item can be store in a variable.

function hide() {
  elco= cy.elements('node[name= "CO2"]').remove();
  elnad = cy.elements('node[name= "NAD+"]').remove();
  elnadP = cy.elements('node[name= "NADP+"]').remove();
  elnadph =cy.elements('node[name= "NADPH"]').remove();
  elnadh =cy.elements('node[name= "NADH"]').remove();
  elho =cy.elements('node[name= "H2O"]').remove();
  eladp =cy.elements('node[name= "ADP"]').remove();
  elatp =cy.elements('node[name= "ATP"]').remove();
  elh =cy.elements('node[name= "H+"]').remove();
  elgtp =cy.elements('node[name= "GTP"]').remove();
  elphos =cy.elements('node[name= "Phosphate"]').remove();
  elphos2 =cy.elements('node[name= "phosphate"]').remove();
  el2h2o =cy.elements('node[name= "2H20"]').remove();
  el2h2o2 =cy.elements('node[name= "2H2O"]').remove();
  elutp =cy.elements('node[name= "UTP"]').remove();
  eludp =cy.elements('node[name= "UDP"]').remove();
  elppi =cy.elements('node[name= "PPi"]').remove();
  elpi =cy.elements('node[name= "Pi"]').remove();    
  elh20 =cy.elements('node[name= "H20"]').remove();
  elHCO3 =cy.elements('node[name= "HCO3-"]').remove();
  elamp =cy.elements('node[name= "AMP"]').remove();
  elgdpp =cy.elements('node[name= "GDP"]').remove();
  elimp =cy.elements('node[name= "IMP"]').remove();
  eltrna =cy.elements('node[name= "tRNA"]').remove();
  eltcoash =cy.elements('node[name= "CoA SH"]').remove();
  elcoash2 =cy.elements('node[name= "CoA-SH"]').remove();
  elcoash3 =cy.elements('node[name= "CoA_SH"]').remove();
  elcoash4 =cy.elements('node[name= "CoA"]').remove();
  elcoq =cy.elements('node[name= "CoQ10"]').remove();
  elcoqh2 =cy.elements('node[name= "CoQ10H2"]').remove();
  eltadp =cy.elements('node[name= "Adp"]').remove();
  elrooh =cy.elements('node[name= "ROOH"]').remove();
  elroh =cy.elements('node[name= "ROH"]').remove();
  elrx =cy.elements('node[name= "RX"]').remove();
  elhx =cy.elements('node[name= "HX"]').remove();
}

function show() {
elco.restore();
elnad.restore();
elnadP.restore();
elnadph.restore();
elnadh.restore();
elho.restore();
eladp.restore();
elatp.restore();
elh.restore();
elgtp.restore();
elphos.restore();
elphos2.restore();
el2h2o.restore();
elutp.restore();
eludp.restore();
elppi.restore();
elpi.restore();    
elh20.restore();
elHCO3.restore();  
elamp.restore();
elgdpp.restore();
elimp.restore();
eltrna.restore();  
eltcoash.restore();
elcoash2.restore();
elcoash3.restore();
elcoash4.restore();
elcoq.restore();
elcoqh2.restore();
eltadp.restore();
elglyc.restore();
elrooh.restore();
elroh.restore();
elrx.restore();
elhx.restore();
el2h2o2.restore();
}
