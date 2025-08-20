import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function TitleInput({ value, onChangeText }) {
  return (
    <TextInput
      style={styles.title}
      value={value}
      onChangeText={onChangeText}
      placeholder="Enter note title..."
      placeholderTextColor="#888"
      returnKeyType="done"
      autoCapitalize="sentences"
      maxLength={120}
      accessibilityLabel="Note title"
    />
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    marginRight: 5,
    fontSize: 20,
    fontWeight: '700',
  },
});
