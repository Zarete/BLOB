/**
 * This example shows how to use the dragNodes plugin.
 */
var g = {
      nodes: [],
      edges: []
    };

// Generate a random graph:
var xcoor = [0,1,2]
var ycoor = [0,2,0]

for (var i = 0; i< xcoor.length ; i++){
  g.nodes.push({
    id: 'n' + i,
    label: 'Node ' + i,
    x: xcoor[i],
    y: ycoor[i],
    size: 1,
    color: '#FF0000'
  });
}

var earr = [0,1,2,0]

for (var i = 0; i< earr.length - 1 ; i++){
  g.edges.push({
    id: 'e' + i,
    source: 'n' + earr[i],
    target: 'n' + earr[i+1],
    size: 1,
    color: '#ccc'
  });
}
// sigma.renderers.def = sigma.renderers.canvas
// Instantiate sigma:
var s = new sigma({
  graph: g,
  container: 'graph-container'
});

// Initialize the dragNodes plugin:
var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);

dragListener.bind('startdrag', function(event) {
  console.log(event);
});
dragListener.bind('drag', function(event) {
  console.log(event);
});
dragListener.bind('drop', function(event) {
  console.log(event);
});
dragListener.bind('dragend', function(event) {
  console.log(event);
});

var tabl_text = new Array;
tabl_text[0]= " PLASMODIUM :\nBeginning of the plasmodium state, the main vegetative phase of the blob life cycle. Usually diploid, it is a large syncytium that can grow very rapidly (several centimeters in the laboratory). It is in this state that the organism has the ability to migrate and seek a source of food. ";
tabl_text[1]= "SCLEROTE : \nThe sclerote stage is a dormant state in which the blob can enter to conserve its resources in case of stress or lack of food. The organism can then return to the state of plasmodium if the conditions become favorable for its development.";
tabl_text[2]= "SPORULATION : \nSporulation is induced if the blob is under too much stress, such as lack of food, too much light, too much temperature or other environmental stresses. During this step a sequential synthesis of the proteins responsible for the formation of the sporocarp is carried out. About eleven hours after induction, the plasma mass dissociates from the cytoplasmic nodule, each forming a sporocarp. The cytoplasmic mass includes in the sporocarp will perform many meiotic divisions to form haploid nuclei clustered in spore-shaped packets. ";
tabl_text[3]= "SPORULATION : \nSporulation is induced if the blob is under too much stress, such as lack of food, too much light, too much temperature or other environmental stresses. During this step a sequential synthesis of the proteins responsible for the formation of the sporocarp is carried out. About eleven hours after induction, the plasma mass dissociates from the cytoplasmic nodule, each forming a sporocarp. The cytoplasmic mass includes in the sporocarp will perform many meiotic divisions to form haploid nuclei clustered in spore-shaped packets. ";
tabl_text[4]= "SPORE : \nThe sporulation ends with the breaking of the sporangia and the release of the spores in the near environment. ";
tabl_text[5]= "AMOEBAE : \nThe released spores may release a haploid amoebae if the conditions are adequate, ie if the level of moisture and food intake is sufficient. ";
tabl_text[6]= "AMOEBAE : \nThe amoebaes released are haploid cells, they can be grown on solid media or in suspension with bacteria as a food source. In difficult conditions, lack of food, dissection, population too important, etc ... the amoebae can take the form of a cyst, a very strong dormant form, from which the amoebae will emerge once the external conditions become favorable again. ";
tabl_text[7]= "AMOEBAE : \nThe cells (diploid or haploid) thus formed are considered to be uninucleic plasmodiums which after culturing become multinucleic plasmodiums. ";
tabl_text[8]= "AMOEBAE FLAGELLE : \nDuring its growth the amoebae can develop flagella to facilitate its movement, this modification does not require synthesis of new proteins, it is only a rearrangement of elements of the cytosquellette such as actin filaments and microtubules. ";
tabl_text[9]= "AMOEBAE : \nTwo amoebaes can also fuse to form a diploid cell from which a new plasmodium can grow. ";
tabl_text[10]= "PLASMODIUM : \nGrowth phase of newly formed plasmodium. ";

function aff_info(id) {
  document.getElementById('ton_texte').innerText=tabl_text[id];
}
