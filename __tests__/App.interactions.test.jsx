
// __tests__/App.interactions.test.jsx
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

// Mock NoteEditor to expose buttons for interactions
jest.mock('../components/NoteEditor', () => (props) => {
    const React = require('react');
    const { View, Button } = require('react-native');
    return (
        <View testID="note-editor-mock">
            <Button title="Save" testID="save-button" onPress={props.onSave} />
            <Button title="Open Menu" testID="open-menu-button" onPress={props.onOpenMenu} />
        </View>
    );
});

// Keep MenuSheet and AuthScreen minimal
jest.mock('../components/MenuSheet', () => () => {
    const React = require('react');
    const { View } = require('react-native');
    return <View testID="menu-sheet" />;
});

jest.mock('../components/AuthScreen', () => () => {
    const React = require('react');
    const { View } = require('react-native');
    return <View testID="auth-screen" />;
});

// Hooks: we’ll inject spies via mock implementations
jest.mock('../hooks/useAuthUser', () =>
    jest.fn(() => ({ user: { uid: 'u1', email: 'x@y.z' }, checkingAuth: false }))
);

jest.mock('../hooks/useNotesData', () =>
    jest.fn(() => ({
        notes: [],
        setNotes: jest.fn(),
        refreshNotes: jest.fn(),
        fetchLatest: jest.fn(),
    }))
);

jest.mock('../hooks/useNoteEditor', () =>
    jest.fn(() => ({
        title: '',
        setTitle: jest.fn(),
        note: '',
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

jest.mock('../hooks/useAppMenuController', () =>
    jest.fn(() => ({
        menuOpen: false,
        openMenu: jest.fn(),
        closeMenu: jest.fn(),
        onCreateNoteFromMenu: jest.fn(),
        onSelectNoteFromMenu: jest.fn(),
        handleDeleteNote: jest.fn(),
        handleCopyAll: jest.fn(),
        handleDeleteAll: jest.fn(),
        handleToggleAuth: jest.fn(),
    }))
);

import App from '../App';

describe('App interactions', () => {
    it('calls handleSave when NoteEditor Save is pressed', () => {
        const useNoteEditor = require('../hooks/useNoteEditor').default || require('../hooks/useNoteEditor');
        const saveSpy = jest.fn();

        // For this test, override once to inject our spy
        useNoteEditor.mockImplementationOnce(() => ({
            title: '',
            setTitle: jest.fn(),
            note: '',
            setNote: jest.fn(),
            noteId: 'n1',
            setNoteId: jest.fn(),
            saving: false,
            savedVisible: false,
            handleSave: saveSpy,
            handleCreateNote: jest.fn(),
            handleSelectNote: jest.fn(),
            reset: jest.fn(),
        }));

        const { getByTestId } = render(<App />);
        fireEvent.press(getByTestId('save-button'));
        expect(saveSpy).toHaveBeenCalledTimes(1);
    });

    it('calls openMenu when NoteEditor Open Menu is pressed', () => {
        const useAppMenuController =
            require('../hooks/useAppMenuController').default || require('../hooks/useAppMenuController');
        const openMenuSpy = jest.fn();

        // Override once to inject our spy
        useAppMenuController.mockImplementationOnce(() => ({
            menuOpen: false,
            openMenu: openMenuSpy,
            closeMenu: jest.fn(),
            onCreateNoteFromMenu: jest.fn(),
            onSelectNoteFromMenu: jest.fn(),
            handleDeleteNote: jest.fn(),
            handleCopyAll: jest.fn(),
            handleDeleteAll: jest.fn(),
            handleToggleAuth: jest.fn(),
        }));

        const { getByTestId } = render(<App />);
        fireEvent.press(getByTestId('open-menu-button'));
        expect(openMenuSpy).toHaveBeenCalledTimes(1);
    });
});