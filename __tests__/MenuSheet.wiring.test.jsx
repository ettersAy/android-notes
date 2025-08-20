// __tests__/MenuSheet.wiring.test.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Safe area mocks
jest.mock('react-native-safe-area-context', () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
        SafeAreaView: View,
        SafeAreaProvider: ({ children }) => children,
        useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    };
});

// Firebase mock
jest.mock('../firebase', () => ({ db: {} }));

// NoteEditor: minimal placeholder that exposes a button to open the menu
jest.mock('../components/NoteEditor', () => (props) => {
    const React = require('react');
    const { View, Button } = require('react-native');
    return (
        <View testID="note-editor">
            <Button title="Open Menu" testID="open-menu" onPress={props.onOpenMenu} />
        </View>
    );
});

// MenuSheet mock exposing buttons to invoke App-provided callbacks
jest.mock('../components/MenuSheet', () => (props) => {
    const React = require('react');
    const { View, Button } = require('react-native');
    return (
        <View testID="menu-sheet">
            <Button
                title="Select Note 2"
                testID="select-note-2"
                onPress={() => props.onSelectNote('n2')}
            />
            <Button
                title="Delete Note 1"
                testID="delete-note-1"
                onPress={() => props.onDeleteNote('n1')}
            />
            <Button
                title="Copy All"
                testID="copy-all"
                onPress={props.handleCopyAll}
            />
            <Button
                title="Toggle Auth"
                testID="toggle-auth"
                onPress={props.handleToggleAuth}
            />
        </View>
    );
});

// AuthScreen minimal
jest.mock('../components/AuthScreen', () => () => {
    const React = require('react');
    const { View } = require('react-native');
    return <View testID="auth-screen" />;
});

// Hooks: authenticated user; control notes and menu handlers via spies
jest.mock('../hooks/useAuthUser', () =>
    jest.fn(() => ({ user: { uid: 'u1', email: 'x@y.z' }, checkingAuth: false }))
);

jest.mock('../hooks/useNotesData', () =>
    jest.fn(() => ({
        notes: [
            { id: 'n1', title: 'First', body: 'Hello' },
            { id: 'n2', title: 'Second', body: 'World' },
        ],
        setNotes: jest.fn(),
        refreshNotes: jest.fn(),
        fetchLatest: jest.fn(),
    }))
);

const selectNoteSpy = jest.fn();
const deleteNoteSpy = jest.fn();
const copyAllSpy = jest.fn();
const toggleAuthSpy = jest.fn();

jest.mock('../hooks/useAppMenuController', () =>
    jest.fn(() => ({
        menuOpen: true, // ensure MenuSheet is visible
        openMenu: jest.fn(),
        closeMenu: jest.fn(),
        onCreateNoteFromMenu: jest.fn(),
        onSelectNoteFromMenu: selectNoteSpy,
        handleDeleteNote: deleteNoteSpy,
        handleCopyAll: copyAllSpy,
        handleDeleteAll: jest.fn(),
        handleToggleAuth: toggleAuthSpy,
    }))
);

jest.mock('../hooks/useNoteEditor', () =>
    jest.fn(() => ({
        title: 'T',
        setTitle: jest.fn(),
        note: 'N',
        setNote: jest.fn(),
        noteId: 'n1',
        setNoteId: jest.fn(),
        saving: false,
        savedVisible: false,
        handleSave: jest.fn(),
        handleCreateNote: jest.fn(),
        handleSelectNote: jest.fn(),
        reset: jest.fn(),
    }))
);

import App from '../App';

describe('MenuSheet wiring', () => {
    beforeEach(() => {
        selectNoteSpy.mockClear();
        deleteNoteSpy.mockClear();
        copyAllSpy.mockClear();
        toggleAuthSpy.mockClear();
    });

    it('invokes onSelectNoteFromMenu with the correct id', () => {
        const { getByTestId } = render(<App />);
        fireEvent.press(getByTestId('select-note-2'));
        expect(selectNoteSpy).toHaveBeenCalledTimes(1);
        expect(selectNoteSpy).toHaveBeenCalledWith('n2');
    });

    it('invokes handleDeleteNote with the correct id', () => {
        const { getByTestId } = render(<App />);
        fireEvent.press(getByTestId('delete-note-1'));
        expect(deleteNoteSpy).toHaveBeenCalledTimes(1);
        expect(deleteNoteSpy).toHaveBeenCalledWith('n1');
    });

    it('invokes handleCopyAll', () => {
        const { getByTestId } = render(<App />);
        fireEvent.press(getByTestId('copy-all'));
        expect(copyAllSpy).toHaveBeenCalledTimes(1);
    });

    it('invokes handleToggleAuth', () => {
        const { getByTestId } = render(<App />);
        fireEvent.press(getByTestId('toggle-auth'));
        expect(toggleAuthSpy).toHaveBeenCalledTimes(1);
    });
});