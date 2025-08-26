// hooks/useAppMenuController.js
import useMenuState from './menu/useMenuState';
import useNoteDeletion from './menu/useNoteDeletion';
import useBulkActions from './menu/useBulkActions';
import useAuthToggle from './menu/useAuthToggle';

/**
 * Provides menu open/close state and stable action handlers used by MenuSheet.
 * Composes smaller hooks for cohesion.
 */
export default function useAppMenuController({
  db,
  user,
  notes,
  noteId,
  setNotes,
  setNoteId,
  setTitle,
  setNote,
  refreshNotes,
  resetEditor,
  handleCreateNote,
  handleSelectNote,
}) {
  const { menuOpen, openMenu, closeMenu } = useMenuState({
    user,
    refreshNotes,
    resetEditor,
    setNotes,
  });

  const onCreateNoteFromMenu = () => {
    handleCreateNote();
    closeMenu();
  };

  const onSelectNoteFromMenu = (n) => {
    handleSelectNote(n);
    closeMenu();
  };

  const handleDeleteNote = useNoteDeletion({
    db,
    user,
    noteId,
    notes,
    setNoteId,
    setTitle,
    setNote,
    refreshNotes,
    closeMenu,
  });

  const { handleCopyAll, handleDeleteAll } = useBulkActions({
    notes,
    closeMenu,
    db,
    user,
    resetEditor,
    refreshNotes,
  });

  const handleToggleAuth = useAuthToggle({
    user,
    closeMenu,
    resetEditor,
    setNotes,
  });

  return {
    menuOpen,
    openMenu,
    closeMenu,
    onCreateNoteFromMenu,
    onSelectNoteFromMenu,
    handleDeleteNote,
    handleCopyAll,
    handleDeleteAll,
    handleToggleAuth,
  };
}
