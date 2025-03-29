const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const clearBtn = document.querySelector("#clearBtn");

const focusLastNote = () => {
  const notes = document.querySelectorAll(".input-box");
  notes[notes.length - 1].focus();
};

const contentCreater = () => {
  notesContainer.innerHTML = `
  <div class="note-container">
    <img src="images/delete.png" alt="Delete note">
    <p class="input-box" contenteditable="true"></p>
  </div>
  `;
};

document.addEventListener("DOMContentLoaded", () => {
  const savedNotes = localStorage.getItem("notes");

  if (savedNotes && savedNotes.trim()) {
    notesContainer.innerHTML = savedNotes;
  } else {
    contentCreater();
  }

  focusLastNote();
});


const updateStorage = () => {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  const noteContainer = document.createElement("div");
  noteContainer.className = "note-container";
  noteContainer.innerHTML = `
  <img src="images/delete.png" alt="Delete note">
  <p class="input-box" contenteditable="true"></p>
  `;

  notesContainer.append(noteContainer);
  focusLastNote();
});

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  }
});

notesContainer.addEventListener("input", (e) => {
  if (e.target.tagName === "P") {
    updateStorage();
  }
});

notesContainer.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.execCommand("insertLineBreak");
  }
});

clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all notes?")) {
    localStorage.removeItem("notes");

    contentCreater();
    focusLastNote();
  }
});