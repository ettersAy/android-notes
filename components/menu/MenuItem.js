import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function MenuItem({ label, onPress, bold, disabled, danger }) {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.6}
      style={[styles.item, disabled && styles.itemDisabled]}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
    >
      <Text
        style={[
          styles.itemText,
          bold && styles.itemBold,
          danger && styles.itemDanger,
          disabled && styles.textDisabled,
        ]}
        numberOfLines={2}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#222',
  },
  itemBold: {
    fontWeight: '700',
  },
  itemDanger: {
    color: '#c02727',
    fontWeight: '600',
  },
  itemDisabled: {
    backgroundColor: 'transparent',
  },
  textDisabled: {
    color: '#777',
  },
});
