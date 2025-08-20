// hooks/menu/useBulkActions.js
import { useCallback } from 'react';
import { Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { deleteAllNotes } from '../../services/notesService';

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
    const handleCopyAll = useCallback(async () => {
        try {
            if (!notes.length) {
                Alert.alert('Nothing to copy', 'You have no notes yet.');
                return;
            }
            const { composeAllNotesText } = await import('../../utils/clipboard');
            const text = composeAllNotesText(notes);

            await Clipboard.setStringAsync(text);
            Alert.alert('Copied', 'All notes copied to clipboard.');
        } catch (e) {
            Alert.alert('Copy failed', e.message || String(e));
        } finally {
            closeMenu?.();
        }
    }, [notes, closeMenu]);

    const handleDeleteAll = useCallback(() => {
        if (!notes.length) {
            closeMenu?.();
            Alert.alert('Nothing to delete', 'You have no notes yet.');
            return;
        }
        if (!user?.uid) {
            Alert.alert('Not signed in', 'Please sign in to delete notes.');
            return;
        }
        Alert.alert(
            'Delete all notes?',
            'This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteAllNotes(db, { uid: user.uid });
                            resetEditor?.();
                            await refreshNotes?.();
                            Alert.alert('Deleted', 'All notes have been deleted.');
                        } catch (e) {
                            Alert.alert('Delete failed', e.message || String(e));
                        } finally {
                            closeMenu?.();
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    }, [notes.length, closeMenu, db, user?.uid, resetEditor, refreshNotes]);

    return { handleCopyAll, handleDeleteAll };
}
