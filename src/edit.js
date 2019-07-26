import { initializedEditPage, generateLastEdited } from "./views";
import { updateNotes, removeNote } from "./notes";

const noteId = location.hash.substring(1);

const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const dateElement = document.querySelector('#last-edited');
const removeElement = document.querySelector('#remove-note');

initializedEditPage(noteId, titleElement, bodyElement, dateElement);

titleElement.addEventListener('input', (e) => {
    const note = updateNotes(noteId, {
        title: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt);
})

bodyElement.addEventListener('input', (e) => {
    const note = updateNotes(noteId, {
        body: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt);
})

removeElement.addEventListener('click', (e) => {
    removeNote(noteId);
    location.assign('/index.html');
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializedEditPage(noteId);
    }
})