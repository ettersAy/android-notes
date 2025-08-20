// jest.setup.js
// Try to load built-in matchers from @testing-library/react-native (v12.4+).
// If not available, continue without failing.
try {
    // eslint-disable-next-line global-require
    require('@testing-library/react-native/extend-expect');
} catch (_) {
    // No-op: matchers not present in this version
}