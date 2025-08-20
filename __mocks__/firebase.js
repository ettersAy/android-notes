// This is a mock firebase file for testing purposes.
// It doesn't contain any sensitive data.

// Mock the getAuth function
export const getAuth = () => ({
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
});

// Mock the getFirestore function
export const getFirestore = () => ({});

// Mock auth object
export const auth = {
    signOut: jest.fn(() => Promise.resolve()),
};

// Mock db object
export const db = {};