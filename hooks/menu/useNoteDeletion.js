
// hooks/menu/useNoteDeletion.js
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { deleteNote } from '../../services/notesService';

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
                                        }) {
    return useCallback(
        (n) => {
            if (!user?.uid) {
                Alert.alert('Not signed in', 'Please sign in to delete notes.');
                return;
            }
            Alert.alert(
                'Delete this note?',
                `${n.title?.trim() ? `“${n.title.trim()}”` : 'This note'} will be permanently deleted.`,
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: async () => {
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
                            } catch (e) {
                                Alert.alert('Delete failed', e.message || String(e));
                            }
                        },
                    },
                ],
                { cancelable: true }
            );
        },
        [db, user?.uid, noteId, notes, setNoteId, setTitle, setNote, refreshNotes]
    );
}