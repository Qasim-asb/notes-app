const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const clearBtn = document.querySelector("#clearBtn");

const initNotes = () => {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    notesContainer.innerHTML = savedNotes;

    const notes = document.querySelectorAll(".input-box");
    if (notes.length > 0) {
      notes[notes.length - 1].focus();
    }
  } else {
    document.querySelector(".input-box").focus();
  }
}
initNotes();

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

  noteContainer.querySelector(".input-box").focus();
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

clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all notes?")) {
    notesContainer.innerHTML = `
      <div class="note-container">
				<img src="images/delete.png" alt="Delete note">
				<p class="input-box" contenteditable="true"></p>
			</div>
      `;

    localStorage.removeItem("notes");

    document.querySelector(".input-box").focus();
  }
});