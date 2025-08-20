// jest.config.js
module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    testPathIgnorePatterns: ['/node_modules/'],
    transformIgnorePatterns: [
        'node_modules/(?!(react-native|@react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?|expo-modules-core|expo-status-bar|@expo|@unimodules)/)',
    ],
};