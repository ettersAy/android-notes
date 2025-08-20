import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SavedBadge({ visible }) {
  if (!visible) return null;
  return (
    <View style={styles.savedBadge} pointerEvents="none" accessibilityRole="text">
      <Text style={styles.savedText}>🟢 Saved</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  savedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#eaf9ea',
    borderColor: '#b6e3b6',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  savedText: {
    color: '#15803d',
    fontSize: 12,
    fontWeight: '700',
  },
});
