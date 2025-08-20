# MyNotes (React Native + Expo)

[![CI - Tests](https://github.com/ettersAy/android-notes/actions/workflows/test.yml/badge.svg)](https://github.com/ettersAy/android-notes/actions/workflows/test.yml)

Replace OWNER/REPO above with your GitHub org/user and repo name.

A simple notes app built with React Native (Expo). This repo includes a minimal, fast testing setup using Jest and React Native Testing Library, plus a GitHub Actions workflow that runs tests on every push and pull request.

## Requirements
- Node.js 20.x (as used in CI)
- npm (package manager)

## Installation
```
bash
npm ci
```
## Scripts
- Test once:
  ```bash
  npm test
  ```
- Test in watch mode:
  ```bash
  npm run test:watch
  ```
- Test with coverage:
  ```bash
  npm run test:coverage
  ```

## Testing Approach
- Unit and component tests run with Jest and @testing-library/react-native.
- Tests are written against behavior rather than implementation details.
- External concerns (Firebase, native modules, navigation, etc.) are mocked for fast, deterministic tests.

Key files:
- jest.config.js: Jest configuration tailored for Expo/React Native.
- jest.setup.js: Optional setup for matchers while staying version-safe.
- .github/workflows/test.yml: CI workflow running tests on push/PR.

## Continuous Integration
This repository includes a GitHub Actions workflow:
- Triggers on push to main and on pull requests.
- Uses Node.js 20 and npm ci for reproducible installs.
- Runs npm test.

Check the “Actions” tab to see runs. Green check = success. You can click any run to see detailed logs.

## Troubleshooting
- ESM modules (e.g., some Expo packages) must be listed in transformIgnorePatterns in jest.config.js so Jest transpiles them.
- If a package adds TypeScript or ESM-only output and Jest fails to parse it, add that package name to transformIgnorePatterns.
- If matchers from @testing-library/jest-native aren’t available in your version, jest.setup.js gracefully falls back without failing.

## Project Structure (testing-focused)
- __tests__/: Test files colocated or centralized. Prefer simple mocks to isolate components/hooks.
- __mocks__/firebase.js: Mock for Firebase bindings used in tests.
- Components and hooks follow single-responsibility and are tested through their public behavior.

## SOLID-friendly Testing Guidelines
- Single Responsibility: Keep components focused; test one behavior per test.
- Open/Closed: Extend via props and composition; avoid modifying internals to test.
- Liskov Substitution: Mock dependencies with compatible interfaces.
- Interface Segregation: Pass minimal props and mock only what a test needs.
- Dependency Inversion: Depend on abstractions (e.g., hooks, small utilities) that can be mocked in tests.

## Next Steps
- Add unit tests for pure logic helpers (e.g., text/validation utilities) that don’t require React rendering.
- Consider e2e tests later (e.g., Detox) if you want on-device flow verification—keep it minimal to start.
- Add a pre-push hook to run npm test locally (via Husky) to catch issues before CI.

## License
MIT