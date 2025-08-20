// services/notesService.js
// Facade kept for backwards compatibility.
// Internally split into focused read/write modules.

export { saveNote, deleteNote, deleteAllNotes } from './notes/write';
export { fetchLatestNote, fetchNotes } from './notes/read';