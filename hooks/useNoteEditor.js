// hooks/useNoteEditor.js
import { useCallback, useEffect, useRef, useState } from 'react';
import { saveNote } from '../services/notesService';
import { useSnackbar } from '../utils/snackbar';

export default function useNoteEditor({ db, user, fetchLatest, refreshNotes }) {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [noteId, setNoteId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [savedVisible, setSavedVisible] = useState(false);
    const savedTimeoutRef = useRef(null);

    // Load latest note when user changes
    useEffect(() => {
        let cancelled = false;
        (async () => {
            if (!user?.uid) return;
            const existing = await fetchLatest();
            if (!cancelled && existing) {
                setTitle(existing.title || '');
                setNote(existing.body || '');
                setNoteId(existing.id || null);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [user?.uid, fetchLatest]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (savedTimeoutRef.current) {
                clearTimeout(savedTimeoutRef.current);
                savedTimeoutRef.current = null;
            }
        };
    }, []);

    const reset = useCallback(() => {
        setNoteId(null);
        setTitle('');
        setNote('');
        setSaving(false);
        setSavedVisible(false);
        if (savedTimeoutRef.current) {
            clearTimeout(savedTimeoutRef.current);
            savedTimeoutRef.current = null;
        }
    }, []);

    const { showSnackbar } = useSnackbar();

    const handleSave = useCallback(async () => {
        if (saving) return;
        if (!user) {
            showSnackbar('Not signed in. Please sign in to save your note.');
            return;
        }
        try {
            setSaving(true);
            const id = await saveNote(db, { uid: user.uid, title, body: note, id: noteId });
            if (!noteId) setNoteId(id);
            setSavedVisible(true);
            if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current);
            savedTimeoutRef.current = setTimeout(() => {
                setSavedVisible(false);
                savedTimeoutRef.current = null;
            }, 1500);
            await refreshNotes();
        } catch (e) {
            showSnackbar(`Save failed: ${e.message || String(e)}`);
        } finally {
            setSaving(false);
        }
    }, [db, title, note, noteId, refreshNotes, saving, user]);

    const handleCreateNote = useCallback(() => {
        setNoteId(null);
        setTitle('');
        setNote('');
    }, []);

    const handleSelectNote = useCallback((n) => {
        setNoteId(n.id);
        setTitle(n.title || '');
        setNote(n.body || '');
    }, []);

    return {
        // state
        title,
        setTitle,
        note,
        setNote,
        noteId,
        setNoteId,
        saving,
        savedVisible,
        // actions
        handleSave,
        handleCreateNote,
        handleSelectNote,
        reset,
    };
}