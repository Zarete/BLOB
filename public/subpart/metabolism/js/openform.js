//Created by Amelie Laporte
function openForm(){
var form=document.getElementById('form');

//modal    
var modal = document.getElementById('formModal');
modal.style.display = "block";
var span = document.getElementsByClassName("close")[1];

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