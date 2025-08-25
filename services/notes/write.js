// services/notes/write.js
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';

/**
 * Save (create or update) a note for a user.
 * - If id is provided: updates users/{uid}/notes/{id}.
 * - If no id: creates a new document under users/{uid}/notes and returns its id.
 * @param {*} db
 * @param {{ uid: string, title?: string, body?: string, id?: string }} params
 * @returns {Promise<string>} The note id (existing or newly created)
 */
export async function saveNote(db, { uid, title, body, id }) {
  const trimmedTitle = (title || '').trim();
  const trimmedBody = (body || '').trim();
  if (!uid) throw new Error('Please connect to save your Notes');
  if (!trimmedTitle || !trimmedBody) throw new Error(`Title and content can't be empty`);

  const now = serverTimestamp();

  if (id) {
    const noteRef = doc(db, 'users', uid, 'notes', id);
    await updateDoc(noteRef, {
      title: trimmedTitle,
      body: trimmedBody,
      updatedAt: now,
    });
    return id;
  }

  const colRef = collection(db, 'users', uid, 'notes');
  const created = await addDoc(colRef, {
    title: trimmedTitle,
    body: trimmedBody,
    createdAt: now,
    updatedAt: now,
  });
  return created.id;
}

/**
 * Delete a single note by id for a user.
 * @param {*} db
 * @param {{ uid: string, id: string }} params
 */
export async function deleteNote(db, { uid, id }) {
  if (!uid) throw new Error('Missing user id');
  if (!id) throw new Error('Missing note id');
  const ref = doc(db, 'users', uid, 'notes', id);
  await deleteDoc(ref);
}

/**
 * Delete all notes for a user (batched).
 * @param {*} db
 * @param {{ uid: string }} params
 */
export async function deleteAllNotes(db, { uid }) {
  if (!uid) throw new Error('Missing user id');
  const colRef = collection(db, 'users', uid, 'notes');
  const snap = await getDocs(colRef);
  if (snap.empty) return;

  const batch = writeBatch(db);
  snap.forEach((d) => {
    batch.delete(doc(db, 'users', uid, 'notes', d.id));
  });
  await batch.commit();
}
