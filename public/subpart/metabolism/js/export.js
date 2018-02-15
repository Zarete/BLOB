//Created by Amelie Laporte

function exportPng(){
var img=cy.png();
document.getElementById("png").src=img;
var modal = document.getElementById('myModal');
modal.style.display = "block";
var span = document.getElementsByClassName("close")[0];

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