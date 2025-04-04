const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector("#createBtn");
const clearBtn = document.querySelector("#clearBtn");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content")

const focusLastNote = () => {
  const notes = document.querySelectorAll(".input-box");
  notes[notes.length - 1].focus();
};

const contentCreater = () => {
  const noteContainer = document.createElement("div");
  noteContainer.className = "note-container";
  noteContainer.innerHTML = `
    <img src="images/delete.png" alt="Delete note">
    <p class="input-box" contenteditable="true"></p>
  `;
  return noteContainer;
};

document.addEventListener("DOMContentLoaded", () => {
  const savedNotes = localStorage.getItem("notes");

  if (savedNotes && savedNotes.trim()) {
    notesContainer.innerHTML = savedNotes;
  } else {
    notesContainer.append(contentCreater());
  }

  focusLastNote();
});


const updateStorage = () => {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  notesContainer.append(contentCreater());
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

notesContainer.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.execCommand("insertLineBreak");
  }
});

const toggleModal = () => {
  modal.classList.toggle("close");
  document.body.classList.toggle("overflow-hidden");
};

clearBtn.addEventListener("click", toggleModal);

modalContent.addEventListener("click", (e) => {
  if (e.target.textContent === "Yes") {
    localStorage.removeItem("notes");
    notesContainer.innerHTML = "";
    notesContainer.append(contentCreater());
    focusLastNote();
    toggleModal();

  } else if (e.target.textContent === "Cancel") {
    toggleModal();
  }
});