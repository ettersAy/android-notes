// component/NoteEditor.js
import React, { useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ActionBar from './ActionBar';
import TitleInput from './editor/TitleInput';
import SavedBadge from './editor/SavedBadge';

export default function NoteEditor({
  title,
  note,
  onChangeTitle,
  onChangeNote,
  onSave,
  onCopy,
  onOpenMenu,
  showSaved,
}) {
  const bodyRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.textareaWrap}>
        <TextInput
          ref={bodyRef}
          style={styles.textarea}
          multiline
          placeholder="Write your note here..."
          placeholderTextColor="#999"
          value={note}
          onChangeText={onChangeNote}
          textAlignVertical="top"
        />
        <SavedBadge visible={showSaved} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.menuBtn} onPress={onOpenMenu}>
          <Text style={styles.menuText}>⚙️</Text>
        </TouchableOpacity>
        <TitleInput value={title} onChangeText={onChangeTitle} />
        <ActionBar onSave={onSave} onCopy={onCopy} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textarea: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 5,
    fontSize: 16,
    lineHeight: 22,
    paddingRight: 5
  },
  textareaWrap: {
    flex: 1,
    position: 'relative',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    marginRight: 5,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
});
