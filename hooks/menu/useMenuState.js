
// hooks/menu/useMenuState.js
import { useCallback, useEffect, useState } from 'react';

/**
 * Manages menu visibility and resets editor/notes on logout.
 */
export default function useMenuState({ user, refreshNotes, resetEditor, setNotes }) {
    const [menuOpen, setMenuOpen] = useState(false);

    // Reset editor and notes when user logs out
    useEffect(() => {
        if (!user) {
            resetEditor?.();
            setNotes?.([]);
        }
    }, [user, resetEditor, setNotes]);

    const openMenu = useCallback(async () => {
        await refreshNotes?.();
        setMenuOpen(true);
    }, [refreshNotes]);

    const closeMenu = useCallback(() => setMenuOpen(false), []);

    return { menuOpen, openMenu, closeMenu };
}