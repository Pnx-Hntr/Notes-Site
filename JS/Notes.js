var a=document.getElementsByClassName("login")[0];
var log=false;
window.onload = logcheck();
function logcheck(){
if (log){
a.style.visibility = "visible";
}}

const checkboxes = document.querySelectorAll('#checkmark');

// Add event listeners to checkboxes
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
        const parentDiv = this.closest('#note'); // Find the parent div of the checkbox
        if (this.checked) {
            parentDiv.classList.add('done'); // Add 'checked' class when checkbox is checked
        } else {
            parentDiv.classList.remove('done'); // Remove 'checked' class when unchecked
        }
    });
});




async function fetchNotes(userId) {
    try {
        const response = await fetch(`http://localhost:3200/notes?userId=${userId}`, {
            method: "GET",
        });

        return response.json();
    } catch (error) {
        console.error("Error:", error);
        return { error: "Failed to fetch notes." };
    }
}

async function addNote(userId, noteTitle, noteBody) {
    try {
        const response = await fetch("http://localhost:3200/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, noteTitle, noteBody }),
        });

        return response.json();
    } catch (error) {
        console.error("Error:", error);
        return { error: "Failed to add note." };
    }
}

async function deleteNote(noteId) {
    try {
        const response = await fetch(`http://localhost:3200/notes/${noteId}`, {
            method: "DELETE",
        });

        return response.json();
    } catch (error) {
        console.error("Error:", error);
        return { error: "Failed to delete note." };
    }
}
