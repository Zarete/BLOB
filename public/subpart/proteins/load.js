var fileFromServer;

let current_representation = 'cartoon';
let current_scheme = 'chainid';
let spin_flag = false;

function initialLoad(){
    var xhttp = new XMLHttpRequest();
}

function loadPDB(file){
  stage.loadFile(file, {defaultRepresentation: true}).then( function( comp){
      console.log("loading successful");
      listeProts.push(comp);
      changeRepresentation(current_representation, current_scheme);
      addChoice("mySelect1");
      addChoice("mySelect2");
  });
}

function getFile(){
    var doc = document.forms["proteinList"].elements["selection"];
    var pdb = doc[doc.selectedIndex].text;

    if(pdb == "Browse for a new file..."){
      var elem = document.getElementById("hiddenInput");
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, false);
      elem.dispatchEvent(evt);
    }
    else{
      console.log("loading file from server...");
      getFileFromServer("PDB/PDB_BLOB/"+pdb, function(file) {
        if (file === null) {
            console.log("an error occured");
        }
        else {
          file.lastModifiedDate = new Date();
          file.name = pdb;
          loadPDB(file);
        }
      });
    }


}

function getFileFromServer(url, doneCallback) {

    fileFromServer = new XMLHttpRequest();
    fileFromServer.onreadystatechange = handleStateChange;
    console.log(url);
    fileFromServer.open("GET", url, true);
    fileFromServer.responseType = 'blob';
    fileFromServer.send();

    function handleStateChange() {
      console.log(fileFromServer.readyState);
        if (fileFromServer.readyState === 4) {
          console.log(fileFromServer.status);
          console.log(fileFromServer.response);
            doneCallback(fileFromServer.status == 200 ? fileFromServer.response : null);
        }
    }
}

function addChoice(selectName){
    var dropdownSelected = document.getElementById(selectName);
    var option = document.createElement("option");
    option.class = "option";
    option.text = listeProts[listeProts.length-1].name;
    dropdownSelected.add(option);
}

function clearChoice(selectName){
    dropdownSelected = document.getElementById(selectName);
    while (dropdownSelected.children[1]) {
        dropdownSelected.removeChild(dropdownSelected.children[1]);
    }
}

function changeRepresentation(representation, current_scheme){
    stage.eachComponent(function( o ){
        console.log(current_scheme);
        o.removeAllRepresentations();
        o.addRepresentation( representation, {
                                              sele: "polymer",
                                              colorScheme: current_scheme,
                                              colorDomain: [ -0.3, 0.3 ],
                                              surfaceType: "av"
                                            });
        current_representation = representation;
    });
}

function changeColor(scheme, current_representation){
    stage.eachComponent(function( o ){
        console.log(current_scheme);
        o.removeAllRepresentations();
        console.log(current_representation);
        o.addRepresentation( current_representation, {
                                              sele: "polymer",
                                              colorScheme: scheme,
                                              colorDomain: [ -0.3, 0.3 ],
                                              surfaceType: "av"
                                            });
        current_scheme = scheme;
    });

}

function clear(){
    stage.removeAllComponents();
    listeProts = [];
    // displayProteins();
    clearChoice("mySelect1");
    clearChoice("mySelect2");
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdown(){
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  // if (!event.target.matches('.dockButton') && !event.target.matches('.dockProts') && !event.target.matches('.option')) {
  //
  //   var dropdowns = document.getElementsByClassName("dockProts");
  //   var i;
  //   for (i = 0; i < dropdowns.length; i++) {
  //     var openDropdown = dropdowns[i];
  //     if (openDropdown.classList.contains('show')) {
  //       openDropdown.classList.remove('show');
  //     }
  //   }
  // }
}

document.addEventListener("load", initialLoad());

function dock(){
    var prot1 = document.getElementById("mySelect1")
    var prot1pdb = prot1.options[prot1.selectedIndex].text

    var prot2 = document.getElementById("mySelect2")
    var prot2pdb = prot2.options[prot2.selectedIndex].text

    if (prot1pdb === "Select first protein..." || prot2pdb === "Select second protein..."){
        alert("Please select two protein files for docking.")
    }
    else{
        window.confirm("Confirm that you want to dock?");
        // TODO : Docking code
    }
}


document.getElementById("load").addEventListener("click", getFile);
document.getElementById("clear").addEventListener("click", clear);
//REPRESENTATION
document.getElementById("backbone").addEventListener("click", function(){
    changeRepresentation("backbone", current_scheme);
    // current_representation = "backbone";
});
document.getElementById("ballStick").addEventListener("click", function(){
    changeRepresentation("ball+stick", current_scheme);
    // current_representation = "ball+stick";
});
document.getElementById("cartoon").addEventListener("click", function(){
    changeRepresentation("cartoon", current_scheme);
    // current_representation = "cartoon";
});

document.getElementById("surface").addEventListener("click", function(){
    changeRepresentation("surface", current_scheme);
    // current_representation = "cartoon";
});


// COLOR
document.getElementById("hydrophobicity").addEventListener("click", function(){
    changeColor("hydrophobicity",  current_representation);
  });
document.getElementById("chainid").addEventListener("click", function(){
    changeColor("chainid",  current_representation);
  });
document.getElementById("atomindex").addEventListener("click", function(){
    changeColor("atomindex",  current_representation);
  });

document.getElementById("electrostatic").addEventListener("click", function(){
    let tmp_scheme = current_scheme;
    changeColor("electrostatic",  "surface");
    current_scheme = tmp_scheme
  });

document.getElementById("spin").addEventListener("click", function(){
  spin_flag = spin_flag === true ? false : true;
  stage.setSpin(spin_flag);
  });

/*resets the value to address navigating away from the page
and choosing to upload the same file */
$('#hiddenInput').on('click touchstart' , function(){
    $(this).val('');
});


//Trigger now when you have selected any file
$("#hiddenInput").change(function(e) {
  var elem = document.getElementById("hiddenInput");
  pdb = elem.files[0];
  loadPDB(pdb);
});
