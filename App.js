// App.js
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoteEditor from './components/NoteEditor';
import AuthScreen from './components/AuthScreen';
import MenuSheet from './components/MenuSheet';
import { db } from './firebase';
import useAuthUser from './hooks/useAuthUser';
import useNotesData from './hooks/useNotesData';
import useNoteEditor from './hooks/useNoteEditor';
import useAppMenuController from './hooks/useAppMenuController';

export default function App() {
  const { user, checkingAuth } = useAuthUser();
  const { notes, setNotes, refreshNotes, fetchLatest } = useNotesData(db, user?.uid);

  const {
    title, setTitle,
    note, setNote,
    noteId, setNoteId,
    saving, savedVisible,
    handleSave, handleCreateNote, handleSelectNote,
    reset: resetEditor,
  } = useNoteEditor({ db, user, fetchLatest, refreshNotes });

  const {
    menuOpen,
    openMenu,
    closeMenu,
    onCreateNoteFromMenu,
    onSelectNoteFromMenu,
    handleDeleteNote,
    handleCopyAll,
    handleDeleteAll,
    handleToggleAuth,
  } = useAppMenuController({
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
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.container}>
          {checkingAuth ? null : user ? (
            <>
              <NoteEditor
                title={title}
                note={note}
                onChangeTitle={setTitle}
                onChangeNote={setNote}
                onSave={saving ? () => {} : handleSave}
                onCopy={() => {}}
                onOpenMenu={openMenu}
                showSaved={savedVisible}
              />
              <MenuSheet
                visible={menuOpen}
                onRequestClose={closeMenu}
                userEmail={user?.email || null}
                notes={notes}
                onCreateNote={onCreateNoteFromMenu}
                onSelectNote={onSelectNoteFromMenu}
                onDeleteNote={handleDeleteNote}
                onCopyAll={handleCopyAll}
                onDeleteAll={handleDeleteAll}
                onToggleAuth={handleToggleAuth}
                currentNoteId={noteId}
              />
            </>
          ) : (
            <AuthScreen />
          )}
          <StatusBar style="auto" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
});
