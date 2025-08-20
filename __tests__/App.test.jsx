
// __tests__/App.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react-native';

// Mock native-safe-area to avoid provider requirements
jest.mock('react-native-safe-area-context', () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
        SafeAreaView: View,
        SafeAreaProvider: ({ children }) => children,
        useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    };
});

// Mock Firebase export used by hooks
jest.mock('../firebase', () => ({ db: {} }));

// Mock components to simple placeholders so tests don’t depend on their internals
jest.mock('../components/AuthScreen', () => () => {
    const React = require('react');
    const { View, Text } = require('react-native');
    return (
        <View testID="auth-screen">
            <Text>Auth</Text>
        </View>
    );
});

jest.mock('../components/NoteEditor', () => (props) => {
    const React = require('react');
    const { View, Text } = require('react-native');
    return (
        <View testID="note-editor">
            <Text>NoteEditor</Text>
        </View>
    );
});

jest.mock('../components/MenuSheet', () => (props) => {
    const React = require('react');
    const { View, Text } = require('react-native');
    return (
        <View testID="menu-sheet">
            <Text>MenuSheet</Text>
        </View>
    );
});

// Mock hooks to control App branching
jest.mock('../hooks/useAuthUser', () =>
    jest.fn(() => ({ user: null, checkingAuth: false }))
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
        noteId: null,
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

// Test: shows AuthScreen when no user
it('renders AuthScreen when user is not authenticated', () => {
    render(<App />);
    expect(screen.getByTestId('auth-screen')).toBeTruthy();
});

// Test: shows NoteEditor when user is present
it('renders NoteEditor when user is authenticated', async () => {
    const useAuthUser = require('../hooks/useAuthUser').default || require('../hooks/useAuthUser');
    useAuthUser.mockImplementationOnce(() => ({ user: { uid: '123', email: 'u@e.com' }, checkingAuth: false }));

    render(<App />);
    expect(screen.getByTestId('note-editor')).toBeTruthy();
});