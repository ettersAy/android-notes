// component/ActionBar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * ActionBar
 * Renders header action buttons.
 *
 * @param {{ onSave?: () => void, onCopy?: () => void }} props
 */
export default function ActionBar({ onSave, onCopy }) {
    return (
        <View style={styles.actions}>
            <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => onSave?.()}
                accessibilityRole="button"
                accessibilityLabel="Save note"
                accessibilityHint="Saves the current note"
            >
                <Text style={styles.actionText}>✔</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => onCopy?.()}
                accessibilityRole="button"
                accessibilityLabel="Copy note to clipboard"
                accessibilityHint="Copies the note content to the clipboard"
            >
                <Text style={styles.actionText}>📋</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        gap: 5,
    },
    actionBtn: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#f2f2f2',
        borderRadius: 6,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
    },
});