// Created by Amelie Laporte
//Layout option
function optionsModal(){
    var modal = document.getElementById('Modal');
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[2];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    } 
    }
function glycolyse(){
    var checkbox = document.getElementById("glycolyse");
    if(checkbox.checked) {
        cy.elements('node[id $= "_glycolyse"]').style("background-color",'#D6A2E8');
    }else {
        cy.elements('node[id $= "_glycolyse"]').style("background-color",'#d5fcd7');
    }
}
function krebs(){
    var checkbox = document.getElementById("krebs");
    if(checkbox.checked) {
        cy.elements('node[id $= "_krebs"]').style("background-color",'#55E6C1');
    }else {
        cy.elements('node[id $= "_krebs"]').style("background-color",'#d5fcd7');
    }
}
function hexose(){
    var checkbox = document.getElementById("hexose");
    if(checkbox.checked) {
        cy.elements('node[id $= "_hexose"]').style("background-color",'#F8EFBA');
    }else {
        cy.elements('node[id $= "_hexose"]').style("background-color",'#d5fcd7');
    }
}
function pentose(){
    var checkbox = document.getElementById("pentose");
    if(checkbox.checked) {
        cy.elements('node[id $= "_pentose"]').style("background-color",'#1B9CFC');
    }else {
        cy.elements('node[id $= "_pentose"]').style("background-color",'#d5fcd7');
    }
}
function neoglu(){
    var checkbox = document.getElementById("neoglu");
    if(checkbox.checked) {
        cy.elements('node[id $= "_neoglu"]').style("background-color",'#CAD3C8');
    }else {
        cy.elements('node[id $= "_neoglu"]').style("background-color",'#d5fcd7');
    }
}
function oxipyr(){
    var checkbox = document.getElementById("oxipyr");
    if(checkbox.checked) {
        cy.elements('node[id $= "_oxipyr"]').style("background-color",'#3B3B98');
    }else {
        cy.elements('node[id $= "_oxipyr"]').style("background-color",'#d5fcd7');
    }
}
function anapleu(){
    var checkbox = document.getElementById("anapleu");
    if(checkbox.checked) {
        cy.elements('node[id $= "_anapleu"]').style("background-color",'#B33771');
    }else {
        cy.elements('node[id $= "_anapleu"]').style("background-color",'#d5fcd7');
    }
}
function aspartate(){
    var checkbox = document.getElementById("aspartate");
    if(checkbox.checked) {
        cy.elements('node[id $= "_aspartate"]').style("background-color",'#EAB543');
    }else {
        cy.elements('node[id $= "_aspartate"]').style("background-color",'#d5fcd7');
    }
}
function ethanol(){
    var checkbox = document.getElementById("ethanol");
    if(checkbox.checked) {
        cy.elements('node[id $= "_ethanol"]').style("background-color",'#FC427B');
    }else {
        cy.elements('node[id $= "_ethanol"]').style("background-color",'#d5fcd7');
    }
}
function glutathione(){
    var checkbox = document.getElementById("glutathione");
    if(checkbox.checked) {
        cy.elements('node[id $= "_glutathione"]').style("background-color",'#BDC581');
    }else {
        cy.elements('node[id $= "_glutathione"]').style("background-color",'#d5fcd7');
    }
}
function glycogen(){
    var checkbox = document.getElementById("glycogen");
    if(checkbox.checked) {
        cy.elements('node[id $= "_glycogen"]').style("background-color",'#f78fb3');
    }else {
        cy.elements('node[id $= "_glycogen"]').style("background-color",'#d5fcd7');
    }
}
function seleno(){
    var checkbox = document.getElementById("seleno");
    if(checkbox.checked) {
        cy.elements('node[id $= "_seleno"]').style("background-color",'#82589F');
    }else {
        cy.elements('node[id $= "_seleno"]').style("background-color",'#d5fcd7');
    }
}
function phyShow(){
    var checkbox = document.getElementById("physhow");
    if(checkbox.checked) {
        cy.elements('node[id ^= "P_"]').style("background-color","#E75926")
    }else {
        cy.elements('node[id ^= "P_"]').style("background-color","#d5fcd7")
    }
}

function allPath(){
    glycolyse();
    krebs();
    hexose();
    pentose();
    neoglu();
    oxipyr();
    anapleu();
    aspartate();
    ethanol();
    glutathione();
    glycogen();
    seleno();
    phyShow();
}
// Created by Adrien Mendes Santos
function checkAll1() {

    var inputs = document.querySelectorAll('.control-path');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = true;
    }
    allPath(); 
    this.onclick = uncheckAll1;
  }
  
  function uncheckAll1() {
    var inputs = document.querySelectorAll('.control-path');
    for (var i = 0; i < inputs.length; i++) {
        console.log(inputs);
      inputs[i].checked = false;
    }
    allPath();  
    this.onclick = checkAll1; 
  }
  
  var el = document.getElementById("checkall1"); 
  el.onclick = checkAll1; 

//Created by Amelie Laporte
//Algo change
function algoModal(){
    var modal = document.getElementById('algoModal');
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[3];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    } 
    }
    function random(){
        var check = document.getElementById("random");
        if(check.checked) {
            var layout = cy.layout({
                name: 'random',
                fit: true,
                padding: 30,
                avoidOverlap: true,
                avoidOverlapPadding: 10,
              });
          
              layout.run(); 
        }else {
            var layout = cy.layout({
                name: 'cose',
        nodeOverlap: 20,
        componentSpacing: 100,
        nodeRepulsion: 550000,
        edgeElasticity: 100,
        directed: true,
        nestingFactor: 5,
        padding: 10,
        animate: true,
              });
          
              layout.run(); 
        }
    }
    function grid(){
        var check = document.getElementById("grid");
        if(check.checked) {
            var layout = cy.layout({
                name: 'grid',
                fit: true,
                padding: 30,
                avoidOverlap: true,
                avoidOverlapPadding: 10,
                
              });
          
              layout.run(); 
        }else {
            var layout = cy.layout({
                name: 'cose',
        nodeOverlap: 20,
        componentSpacing: 100,
        nodeRepulsion: 550000,
        edgeElasticity: 100,
        directed: true,
        nestingFactor: 5,
        padding: 10,
        animate: true,
              });
          
              layout.run(); 
        }
    }
    function circle(){
        var check = document.getElementById("circle");
        if(check.checked) {
            var layout = cy.layout({
                name: 'circle',
                fit: true,
                padding: 30,
                avoidOverlap: true,
                clockwise: true,
              });
          
              layout.run(); 
        }else {
            var layout = cy.layout({
                name: 'cose',
        nodeOverlap: 20,
        componentSpacing: 100,
        nodeRepulsion: 550000,
        edgeElasticity: 100,
        directed: true,
        nestingFactor: 5,
        padding: 10,
        animate: true,
              });
          
              layout.run(); 
        }
    }
    function concentric(){
        var check = document.getElementById("concentric");
        if(check.checked) {
            var layout = cy.layout({
                name: 'concentric',
                fit: true,
                padding: 30,
                clockwise: true,
                avoidOverlap: true,
              });
          
              layout.run(); 
        }else {
            var layout = cy.layout({
                name: 'cose',
        nodeOverlap: 20,
        componentSpacing: 100,
        nodeRepulsion: 550000,
        edgeElasticity: 100,
        directed: true,
        nestingFactor: 5,
        padding: 10,
        animate: true,
              });
          
              layout.run(); 
        }
    }
    function breadthfirst(){
        var check = document.getElementById("breadthfirst");
        if(check.checked) {
            var layout = cy.layout({
                name: 'breadthfirst',
                fit: true,
                directed: true,
                padding: 30,
                avoidOverlap: true,
              });
          
              layout.run(); 
        }else {
            var layout = cy.layout({
                name: 'cose',
        nodeOverlap: 20,
        componentSpacing: 100,
        nodeRepulsion: 550000,
        edgeElasticity: 100,
        directed: true,
        nestingFactor: 5,
        padding: 10,
        animate: true,
              });
          
              layout.run(); 
        }
    }