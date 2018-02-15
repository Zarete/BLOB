var fileFromServer;

let current_representation = 'cartoon';
let current_scheme = 'chainid';
let spin_flag = false;
let background_color = 'black'
let imgname = "screenshot.png"

function initialLoad(){
    var xhttp = new XMLHttpRequest();
}

function loadPDB(file){
  stage.loadFile(file, {defaultRepresentation: true}).then( function( comp){
    //stage settings:

      //options: "light", "dark"
      console.log(comp);
      imgname = comp.name.replace(".pdb", "_") + imgname;
      console.log("loading successful");
      listeProts.push(comp);
      changeRepresentation(current_representation, current_scheme);
      addChoice("mySelect1");
      addChoice("mySelect2");
      stage.setParameters( { backgroundColor: background_color } );
      stage.viewer.container.addEventListener( "dblclick", function(){
    stage.toggleFullscreen();
} );
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
            alert("File could not be found. Try again later.");
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
    fileFromServer.open("GET", url, true);
    fileFromServer.responseType = 'blob';
    fileFromServer.send();

    function handleStateChange() {
        if (fileFromServer.readyState === 4) {
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
        o.removeAllRepresentations();
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
    imgname =  "screenshot.png";
    listeProts = [];
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
          let nomprojet = prompt("Enter a project name. Don't forget it as you will need it to retrieve the result. Results are stored 48h only.", "project");
          if (nomprojet != null){
            $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8080/subpart/proteins/',
        	    datatype: 'text',
        	    data: {
        		'prot1': prot1pdb,
        		'prot2': prot2pdb,
            'nomprojet': nomprojet
        	    },
              success: function(msg){
                let answer = JSON.stringify(msg)
                answer = JSON.parse(answer);
                if (answer['msg'] == "Success"){
                  alert("Docking in progress, you can retrieve the result by clicking on 'Result Docking' and giving the project name.")
                }
                else{
                    alert(answer['msg']);
                }
              },
                    error: function(jqXHR, textStatus, errorThrown) {
        		alert('error ' + textStatus + " " + errorThrown);
                    }
        	   });
          }
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

  document.getElementById("backcolor").addEventListener("click", function(){
    background_color= background_color == 'black' ? 'white' : 'black';
    stage.setParameters( { backgroundColor: background_color } );
    });

    document.getElementById("fullscreen").addEventListener("click", function(){
      stage.toggleFullscreen();
      });

document.getElementById("screenshot").addEventListener("click", function () {

          stage.makeImage({
            factor: 1,
            antialias: false,
            trim: false,
            transparent: false
          }).then(function (blob) {
            NGL.download(blob, imgname)
          })
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

document.getElementById("dockDownload").addEventListener("click", function(){
  var projet = prompt('Enter the project name you are looking for :', 'project');
  if (projet != null){
    $.ajax({
        url:'http://localhost:8080/subpart/proteins/PDB/' + projet + '/macro.mac',
        type:'GET',
        error: function(jqXHR, textStatus, errorThrown)
        {
            alert('error ' + textStatus + " " + errorThrown + "\n\nThis project does not exist.");
        },
        success: function()
        {
          $.ajax({
              url:'http://localhost:8080/subpart/proteins/PDB/' + projet + '/resultDocking.pdb',
              type:'GET',
              error: function(jqXHR, textStatus, errorThrown)
              {
                  alert("The docking is still in progress.");
              },
              success: function()
              {
                let formDownload = document.getElementById("formDownload");
                formDownload.action = 'http://localhost:8080/subpart/proteins/PDB/' + projet + '/resultDocking.pdb';
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("click", true, false);
                let buttonDownload = document.getElementById("hiddenDownload");
                buttonDownload.dispatchEvent(evt);
              }
          });
        }
    });
  }
});
