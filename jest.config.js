// jest.config.js
module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['/node_modules/'],
    transformIgnorePatterns: [
        'node_modules/(?!(react-native|@react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?|expo-modules-core|expo-status-bar|@expo|@unimodules)/)',
    ],
    moduleNameMapper: {
        '^\\./firebase$': '<rootDir>/__mocks__/firebase.js',
        '^\\.\\./firebase$': '<rootDir>/__mocks__/firebase.js',
    },
};

