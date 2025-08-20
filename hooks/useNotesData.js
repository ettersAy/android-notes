// hooks/useNotesData.js
import { useCallback, useEffect, useState } from 'react';
import { fetchNotes, fetchLatestNote } from '../services/notesService';

export default function useNotesData(db, uid) {
  const [notes, setNotes] = useState([]);

  const refreshNotes = useCallback(async () => {
    if (!uid) {
      setNotes([]);
      return;
    }
    try {
      const all = await fetchNotes(db, { uid });
      setNotes(all);
    } catch {
    }
  }, [db, uid]);

  const fetchLatest = useCallback(async () => {
    if (!uid) return null;
    try {
      return await fetchLatestNote(db, { uid });
    } catch {
      return null;
    }
  }, [db, uid]);

  useEffect(() => {
    if (!uid) {
      setNotes([]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const all = await fetchNotes(db, { uid });
        if (!cancelled) setNotes(all);
      } catch {
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [db, uid]);

  return { notes, setNotes, refreshNotes, fetchLatest };
}
