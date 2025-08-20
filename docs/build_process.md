# Steps to build the installation file .apk for android

This guide uses Expo EAS Build to generate an installable APK. It is the simplest, reliable approach for Expo/React Native apps.

References:
- Build APK with EAS: https://docs.expo.dev/build-reference/apk/
- Create your first EAS build: https://docs.expo.dev/build/setup/
- EAS configuration: https://docs.expo.dev/build/eas-json/

Prerequisites:
- Node.js and npm installed.
- An Expo account (free). If you don’t have one, create it at https://expo.dev.

Step 1 — Install EAS CLI (globally)
- Command: npm i -g eas-cli
- Verify: eas --version

Step 2 — Log in to Expo
- Command: eas login
- Follow the prompt to sign in.

Step 3 — Configure EAS in the project (once)
- Command: npx expo install expo@latest
- Command: eas build:configure
- Accept defaults. This will create/equip eas.json and configure the Android project.

Step 4 — Add an APK build profile in eas.json
- Open eas.json in the project root.
  - Add a profile that forces APK output:
    {
        "build": {
            "apk": {
                "android": {
                    "buildType": "apk"
                }
            }
        }
    }
- Notes:
    - You can keep other profiles (development/preview/production) if already present.
    - The key is android.buildType = "apk" to get a single universal APK.

Step 5 — Run the APK build
- Command: eas build -p android --profile apk
- Wait for the cloud build to finish. The CLI will show a build URL.

Step 6 — Download and install the APK
- After completion, the CLI offers a direct download link.
- Download the .apk and install it on your Android device (enable “Install unknown apps” if prompted) or drag-and-drop onto an Android emulator.

Troubleshooting:
- If you see permission issues, re-run eas login and ensure you’re in the correct project folder.
- If the build fails, open the build URL from the CLI to view logs in the Expo dashboard.