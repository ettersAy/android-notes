
// hooks/menu/useAuthToggle.js
import { useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useSnackbar } from '../../utils/snackbar';

/**
 * Returns a handler to toggle auth (logout if signed in).
 */
export default function useAuthToggle({ user, closeMenu, resetEditor, setNotes }) {
    const { showSnackbar } = useSnackbar();
    return useCallback(() => {
        if (user) {
            closeMenu?.();
            // confirm via snackbar action
            showSnackbar({
                message: 'Log out? You will need to sign in again to save notes.',
                actionLabel: 'Log out',
                onAction: async () => {
                    try {
                        await signOut(auth);
                        resetEditor?.();
                        setNotes?.([]);
                    } catch (e) {
                        showSnackbar(`Logout failed: ${e.message || String(e)}`);
                    } finally {
                        closeMenu?.();
                    }
                },
                duration: 0,
            });
        } else {
            closeMenu?.();
        }
    }, [user, closeMenu, resetEditor, setNotes, showSnackbar]);
}