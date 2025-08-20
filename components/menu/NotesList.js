// component/NotesList.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * NotesList
 * Displays a list of notes with select/delete actions.
 *
 * @param {{
 *   notes: Array<{id: string, title?: string}>,
 *   currentNoteId?: string,
 *   onSelectNote?: (note: any) => void,
 *   onDeleteNote?: (note: any) => void
 * }} props
 */
export default function NotesList({
                                      notes = [],
                                      currentNoteId,
                                      onSelectNote,
                                      onDeleteNote,
                                  }) {
    if (!notes.length) {
        return <EmptyList />;
    }

    return (
        <View>
            {notes.map((n) => {
                const isActive = currentNoteId && n.id === currentNoteId;
                const title = n.title || '(Untitled)';
                return (
                    <View key={n.id} style={[styles.noteRow, isActive && styles.noteRowActive]}>
                        <TouchableOpacity
                            style={styles.noteTitleBtn}
                            onPress={() => onSelectNote?.(n)}
                            accessibilityRole="button"
                            accessibilityState={{ selected: !!isActive }}
                            accessibilityLabel={`Open note: ${title}`}
                            accessibilityHint="Opens this note in the editor"
                        >
                            <Text
                                style={[styles.noteTitleText, isActive && styles.noteTitleActive]}
                                numberOfLines={1}
                            >
                                {title}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => onDeleteNote?.(n)}
                            accessibilityLabel={`Delete note: ${title}`}
                            accessibilityHint={`Deletes ${title}`}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            style={styles.deleteBtn}
                            accessibilityRole="button"
                        >
                            <Text style={styles.deleteIcon}>🗑️</Text>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
}

function EmptyList() {
    return (
        <View style={styles.emptyWrap} accessible accessibilityRole="text">
            <Text style={styles.emptyText}>No notes yet</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    noteRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 6,
        paddingRight: 2,
        paddingVertical: 6,
        borderRadius: 8,
    },
    noteRowActive: {
        backgroundColor: '#f3f4f6',
    },
    noteTitleBtn: {
        flex: 1,
        paddingVertical: 4,
        paddingRight: 8,
    },
    noteTitleText: {
        fontSize: 16,
        color: '#222',
    },
    noteTitleActive: {
        fontWeight: '700',
    },
    deleteBtn: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginRight: 6,
    },
    deleteIcon: {
        fontSize: 16,
        color: '#c02727',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    emptyWrap: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        borderRadius: 8,
    },
    emptyText: {
        fontSize: 16,
        color: '#777',
    },
});