import moment from "moment";
import { removeNote, sortNotes, saveNotes, getNotes } from "./notes";
import { getFilters } from "./filters.js";

// Создание DOM структуры для заметки
const generateNoteDOM = (note) => {
  const noteEl = document.createElement("div");
  const textEl = document.createElement("a");
  const button = document.createElement("button");
  const editButton = document.createElement("a");

  // Кнопка удаления
  button.classList.add("remove-button");
  button.setAttribute("title", "remove note");
  noteEl.appendChild(button);
  button.addEventListener("click", () => {
    removeNote(note.id);
    saveNotes();
    renderNotes();
  });

  // Кнопка редактирвоания
  editButton.setAttribute("href", `/edit.html#${note.id}`);
  editButton.classList.add("edit-button");
  editButton.textContent = "EDIT";
  noteEl.appendChild(editButton);

  // Заголовок заметки
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }

  noteEl.classList.add("notes__controls");
  textEl.classList.add("note__text");
  noteEl.appendChild(textEl);

  return noteEl;
};

// Вывод заметок на экран
const renderNotes = () => {
  let notesEl = document.querySelector("#notes");
  const filters = getFilters();
  const notes = sortNotes(filters.sortBy);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  notesEl.innerHTML = "";

  filteredNotes.forEach((note) => {
    const noteEl = generateNoteDOM(note);
    notesEl.appendChild(noteEl);
  });
};

const initializedEditPage = (noteId, titleElement, bodyElement, dateElement) => {
  const notes = getNotes();
  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    location.assign("/index.html");
  }

  titleElement.value = note.title;
  bodyElement.value = note.body;
  dateElement.textContent = generateLastEdited(note.updatedAt);
};

// Последнее обновление заметки
const generateLastEdited = (timestamp) => {
  return `Last edited: ${moment(timestamp).fromNow()}`;
};

export { generateNoteDOM, renderNotes, generateLastEdited, initializedEditPage };
