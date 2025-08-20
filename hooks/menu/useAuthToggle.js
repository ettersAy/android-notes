
// hooks/menu/useAuthToggle.js
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

/**
 * Returns a handler to toggle auth (logout if signed in).
 */
export default function useAuthToggle({ user, closeMenu, resetEditor, setNotes }) {
    return useCallback(() => {
        if (user) {
            Alert.alert(
                'Log out?',
                'You will need to sign in again to save notes.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Log out',
                        style: 'destructive',
                        onPress: async () => {
                            try {
                                await signOut(auth);
                                resetEditor?.();
                                setNotes?.([]);
                            } catch (e) {
                                Alert.alert('Logout failed', e.message || String(e));
                            } finally {
                                closeMenu?.();
                            }
                        },
                    },
                ]
            );
        } else {
            closeMenu?.();
        }
    }, [user, closeMenu, resetEditor, setNotes]);
}