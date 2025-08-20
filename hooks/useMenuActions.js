// hooks/useMenuActions.js
import { useCallback } from 'react';

/**
 * Provides stable handlers for menu actions.
 * This keeps MenuSheet lean and helps avoid re-renders of children.
 */
export default function useMenuActions({
  onCreateNote,
  onCopyAll,
  onDeleteAll,
  onToggleAuth,
  onSelectNote,
  onDeleteNote,
}) {
  const onPressCreate = useCallback(() => {
    onCreateNote?.();
  }, [onCreateNote]);

  const onPressCopyAll = useCallback(() => {
    onCopyAll?.();
  }, [onCopyAll]);

  const onPressDeleteAll = useCallback(() => {
    onDeleteAll?.();
  }, [onDeleteAll]);

  const onPressToggleAuth = useCallback(() => {
    onToggleAuth?.();
  }, [onToggleAuth]);

  const handleSelectNote = useCallback(
    (note) => {
      onSelectNote?.(note);
    },
    [onSelectNote]
  );

  const handleDeleteNote = useCallback(
    (note) => {
      onDeleteNote?.(note);
    },
    [onDeleteNote]
  );

  return {
    onPressCreate,
    onPressCopyAll,
    onPressDeleteAll,
    onPressToggleAuth,
    handleSelectNote,
    handleDeleteNote,
  };
}
