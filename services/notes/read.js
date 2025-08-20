import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';

/**
 * @typedef {Object} Note
 * @property {string} id
 * @property {string} [title]
 * @property {string} [body]
 */

/**
 * Fetch the most recently updated note for a user.
 * Returns { id, title, body } or null if none found.
 * @param {*} db
 * @param {{ uid: string }} params
 * @returns {Promise<Note|null>}
 */
export async function fetchLatestNote(db, { uid }) {
  if (!uid) throw new Error('Missing user id');
  const colRef = collection(db, 'users', uid, 'notes');
  const q = query(colRef, orderBy('updatedAt', 'desc'), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const docSnap = snap.docs[0];
  const data = docSnap.data() || {};
  return { id: docSnap.id, title: data.title || '', body: data.body || '' };
}

/**
 * Fetch all notes for a user ordered by updatedAt desc.
 * Returns an array of { id, title, body }.
 * @param {*} db
 * @param {{ uid: string }} params
 * @returns {Promise<Note[]>}
 */
export async function fetchNotes(db, { uid }) {
  if (!uid) throw new Error('Missing user id');
  const colRef = collection(db, 'users', uid, 'notes');
  const q = query(colRef, orderBy('updatedAt', 'desc'));
  const snap = await getDocs(q);
  const items = [];
  snap.forEach((d) => {
    const data = d.data() || {};
    items.push({
      id: d.id,
      title: data.title || '',
      body: data.body || '',
    });
  });
  return items;
}
