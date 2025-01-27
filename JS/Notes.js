var a=document.getElementsByClassName("login")[0];
var log=false;
const checkboxes = document.querySelectorAll('#checkmark');

window.onload = logcheck();
function logcheck(){
if (log){
a.style.visibility = "visible";
}}


//Adding list
const addNoteBtn = document.getElementById('addNote');
const inputDiv = document.getElementById('addWindow');
const noteContainer = document.querySelector('.noteCont');
const titleInput = document.getElementById('Title');
const bodyInput = document.getElementById('Body');
const removeButton = document.getElementById('removeNote');

addNoteBtn.addEventListener('click', () => {
    inputDiv.style.visibility = 'visible';
});

function addTask() {
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

   
    if (!title || !body) {
        alert('Please fill in both fields!');
        return;
    }

   
    const note = document.createElement('div');
    note.classList.add('note'); 

    note.innerHTML = `
       <div id="note">
           <input type="checkbox" id="checkmark">
           <span style="font-weight: bold;">${title}</span>
           <span>${body}</span>
        </div>
    `;
    noteContainer.appendChild(note);
    titleInput.value = '';
    bodyInput.value = '';
    // Hide the input div
    inputDiv.style.visibility = 'hidden';
}

//Remove
let removeMode = false;

removeButton.addEventListener('click', () => {
    removeMode = !removeMode; 
    if (removeMode) {
        removeButton.textContent = 'Cancel Remove'; 
    } else {
        removeButton.textContent = 'Remove -'; 
    }
});


noteContainer.addEventListener('click', (e) => {
    if (removeMode && e.target.closest('#note')) {
        const noteR = e.target.closest('#note'); 
        noteR.remove(); 
    }
});

//For green
noteContainer.addEventListener('change', function (e) {
    
    if (e.target && e.target.type === 'checkbox' && e.target.id === 'checkmark') {
        const parentDiv = e.target.closest('#note'); // Find the parent div
        if (e.target.checked) {
            parentDiv.classList.add('done'); 
        } else {
            parentDiv.classList.remove('done');
        }
    }
});

