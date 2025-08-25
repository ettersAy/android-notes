// hooks/menu/useBulkActions.js
import { useCallback } from 'react';
import * as Clipboard from 'expo-clipboard';
import { deleteAllNotes } from '../../services/notesService';
import { useSnackbar } from '../../utils/snackbar';

/**
 * Returns handlers for bulk copy/delete actions.
 */
export default function useBulkActions({
                                           notes,
                                           closeMenu,
                                           db,
                                           user,
                                           resetEditor,
                                           refreshNotes,
                                       }) {
    const { showSnackbar } = useSnackbar();

    const handleCopyAll = useCallback(async () => {
        try {
            if (!notes.length) {
                showSnackbar('Nothing to copy. You have no notes yet.');
                return;
            }
            const { composeAllNotesText } = await import('../../utils/clipboard');
            const text = composeAllNotesText(notes);

            await Clipboard.setStringAsync(text);
            showSnackbar('All notes copied to clipboard.');
        } catch (e) {
            showSnackbar(`Copy failed: ${e.message || String(e)}`);
        } finally {
            closeMenu?.();
        }
    }, [notes, closeMenu]);

    const handleDeleteAll = useCallback(() => {
        if (!notes.length) {
            closeMenu?.();
            showSnackbar('Nothing to delete. You have no notes yet.');
            return;
        }
        if (!user?.uid) {
            showSnackbar('Not signed in. Please sign in to delete notes.');
            return;
        }
        closeMenu?.();
        // Use snackbar with action as a lightweight confirmation
        showSnackbar({
            message: 'Delete all notes? This action cannot be undone.',
            actionLabel: 'Delete',
            onAction: async () => {
                try {
                    await deleteAllNotes(db, { uid: user.uid });
                    resetEditor?.();
                    await refreshNotes?.();
                    showSnackbar('All notes have been deleted.');
                } catch (e) {
                    showSnackbar(`Delete failed: ${e.message || String(e)}`);
                } finally {
                    closeMenu?.();
                }
            },
            duration: 0, // keep open until user acts or manually dismissed later
        });
    }, [notes.length, closeMenu, db, user?.uid, resetEditor, refreshNotes]);

    return { handleCopyAll, handleDeleteAll };
}
