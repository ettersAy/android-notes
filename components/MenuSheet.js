// component/MenuSheet.js
import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import MenuItem from './menu/MenuItem';
import NotesList from './menu/NotesList';
import useMenuActions from '../hooks/useMenuActions';

export default function MenuSheet({
  visible,
  onRequestClose,
  userEmail,
  notes = [],
  onCreateNote,
  onSelectNote,
  onDeleteNote,
  onCopyAll,
  onDeleteAll,
  onToggleAuth, // "Log in" or "Log out"
  currentNoteId, // added
}) {
  const {
    onPressCreate,
    onPressCopyAll,
    onPressDeleteAll,
    onPressToggleAuth,
    handleSelectNote,
    handleDeleteNote,
  } = useMenuActions({
    onCreateNote,
    onCopyAll,
    onDeleteAll,
    onToggleAuth,
    onSelectNote,
    onDeleteNote,
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <Pressable style={styles.backdrop} onPress={onRequestClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <ScrollView contentContainerStyle={styles.content}>
            <MenuItem label="➕ Create a new Note" onPress={onPressCreate} bold />

            <Separator />

            <NotesList
              notes={notes}
              currentNoteId={currentNoteId}
              onSelectNote={handleSelectNote}
              onDeleteNote={handleDeleteNote}
            />

            <Separator />

            {userEmail ? (
              <MenuItem label={`🪪  ${userEmail}`} disabled />
            ) : null}
            <MenuItem label="📋  Copy all Notes" onPress={onPressCopyAll} />
            <MenuItem label="️🗑️  Delete all notes" onPress={onPressDeleteAll} danger />
            <MenuItem
              label={userEmail ? '🚪  Log out' : '🔐  Log in'}
              onPress={onPressToggleAuth}
            />
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 12,
    maxHeight: '70%',
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
    gap: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 6,
  },
});
