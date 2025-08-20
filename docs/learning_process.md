# Learning Process

Initial request:
- Build my first Android app using React Native and Expo Go.
- UI: a title in the top-left, three buttons on the right of the same line (✔ Save, 📋 Copy, 🗑 Delete), and a textarea below for writing a note.
- Provide the simplest method, one step at a time; wait for confirmation/failures before proceeding; update this log after each finished step.

Completed steps:
- Step 1 — Open project in Expo Go on Android
    - Action: Started a tunnel with `npx expo start --tunnel` and opened the app in Expo Go.
    - Result: App loaded on Android and displayed the default message.

- Step 2 — Build the base UI (header + actions + note area)
    - Action: Implemented a header with a title on the left and three buttons on the right, plus a multiline text area below.
    - Result: Confirmed the new UI is visible on Android.

- Step 3 — Make the title editable
    - Action: Replaced static title with a TextInput so users can modify it.
    - Result: Confirmed the title edits correctly on Android.

- Step 4 — Install Firebase SDK
    - Action: Ran `npm install firebase`.
    - Result: Packages installed successfully, no vulnerabilities reported.

- Step 5 — Firebase initialization
    - Action: Created `firebase.js` with project config and exported `auth` and `db`.
    - Result: No errors in Expo/Metro console; ready to use Auth and Firestore.

- Step 5.2 — UI refinements and Android safe area
    - Action: Removed deprecated `blurOnSubmit` from the title input. Wrapped the app with a proper SafeAreaView and adjusted paddings so the header is fully visible under Android system UI; kept KeyboardAvoidingView.
    - Result: No deprecation warning; header is no longer overlapped by Android system UI.

- Step 5.3 — Resolve package resolution error (safe-area-context)
    - Issue: Metro bundler error “Unable to resolve 'react-native-safe-area-context'” caused by a Node.js version mismatch (v10.24.1 vs v22.18.0), which led to an npm ERR! ELIFECYCLE and incomplete dependency install.
    - Fix:
        1) Switched to a compatible Node.js version via nvm (v24.6.0).
        2) Performed a clean reinstall: `rm -rf node_modules package-lock.json && npm install`.
        3) Explicitly installed the missing package: `npm install react-native-safe-area-context`.
    - Result: Dependencies installed cleanly; bundler error resolved. Header fully visible; deprecation warning gone.

- Step 6 — Configure React Native Auth persistence
    - Issue: Firebase Auth initialized without AsyncStorage caused a warning and in‑memory persistence (users signed out after app restarts).
    - Fix:
        1) Installed `@react-native-async-storage/async-storage`.
        2) Initialized Auth with `initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })`, falling back to `getAuth(app)` if already initialized.
        3) Reloaded the app and verified the warning disappeared and session persists across relaunch.
    - Result: Warning removed; users remain signed in after closing/reopening the app.

- Step 7 — Replace success dialog with inline “Saved” indicator
    - Action: Removed the success Alert after saving; added a transient “Saved” badge in the top-right of the textarea controlled by a showSaved flag from App.
    - Result: Save feedback is non-intrusive and doesn’t block the UI.

- Step 7.1 — Robust timeout for the “Saved” indicator
    - Action: Managed the timeout via a ref; cleared/restarted on rapid taps; cleaned up on unmount to prevent leaks.
    - Result: Indicator timing is consistent; no flicker on repeated taps; no dangling timers.

- Step 7.2 — Prevent text overlap with the badge
    - Action: Added extra right padding to the textarea to avoid text rendering under the badge.
    - Result: Improved readability when lines reach the right edge.

- Step 8 — Save note as upsert (create or update)
    - Action: Updated the note service to accept an optional id. If present, update the note; otherwise, create and return the new id. App now stores noteId after first save and passes it on subsequent saves.
    - Result: Subsequent saves update the same document; no more duplicate notes.

- Step 9 — Load latest note on app start
    - Action: On successful authentication, fetched the most recently updated note for the user and populated the editor (title/body) and noteId.
    - Result: Returning users see their latest note immediately; saving continues to update the same document.

- Incident — “Invalid hook call” (Resolved)
    - Cause: A useEffect was placed outside a component.
    - Fix: Moved the hook inside App and added cleanup. Introduced lint rules and CI checks to prevent recurrences.