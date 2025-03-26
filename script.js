const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function initNotes() {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    notesContainer.innerHTML = savedNotes;
    
    const notes = document.querySelectorAll(".input-box");
    if (notes.length > 0) {
      notes[notes.length - 1].focus();
    }
  }
}
initNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  const newNote = document.createElement("p");
  newNote.className = "input-box";
  newNote.contentEditable = 'true';

  const deleteBtn = document.createElement("img");
  deleteBtn.src = "images/delete.png";
  deleteBtn.alt = "Delete note";
  
  newNote.append(deleteBtn);
  notesContainer.append(newNote);

  // Alternative
  // notesContainer.appendChild(newNote).appendChild(img);

  // Or alternative
  // notesContainer.append(inputBox.append(img));

  newNote.focus();
});

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  }
});

notesContainer.addEventListener("input", (e) => {
  if (e.target.classList.contains("input-box")) {
    updateStorage();
  }
});