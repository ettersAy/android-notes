
// hooks/menu/useNoteDeletion.js
import { useCallback } from 'react';
import { deleteNote } from '../../services/notesService';
import { useSnackbar } from '../../utils/snackbar';

/**
 * Returns a handler to delete a single note with confirmation.
 */
export default function useNoteDeletion({
                                            db,
                                            user,
                                            noteId,
                                            notes,
                                            setNoteId,
                                            setTitle,
                                            setNote,
                                            refreshNotes,
                                            closeMenu,
                                        }) {
    const { showSnackbar } = useSnackbar();
    return useCallback(
        (n) => {
            if (!user?.uid) {
                showSnackbar('Not signed in. Please sign in to delete notes.');
                return;
            }
            // Close the menu so the snackbar is not obscured by it
            if (typeof closeMenu === 'function') {
                try { closeMenu(); } catch {}
            }
            // Confirm via snackbar action
            const titleText = n.title?.trim() ? `“${n.title.trim()}”` : 'this note';
            showSnackbar({
                message: `Delete ${titleText}?`,
                actionLabel: 'Delete',
                onAction: async () => {
                    try {
                        await deleteNote(db, { uid: user.uid, id: n.id });
                        if (n.id === noteId) {
                            const next = notes.find((x) => x.id !== n.id);
                            if (next) {
                                setNoteId(next.id);
                                setTitle(next.title || '');
                                setNote(next.body || '');
                            } else {
                                setNoteId(null);
                                setTitle('');
                                setNote('');
                            }
                        }
                        await refreshNotes();
                        showSnackbar('Note deleted.');
                    } catch (e) {
                        showSnackbar(`Delete failed: ${e.message || String(e)}`);
                    }
                },
                duration: 0,
            });
        },
        [db, user?.uid, noteId, notes, setNoteId, setTitle, setNote, refreshNotes, closeMenu]
    );
}