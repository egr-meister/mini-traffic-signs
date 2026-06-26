# Mini Traffic Signs

Mini Traffic Signs is a calm, friendly, offline learning app for young children.
It introduces four simple traffic signs in a soft, toy-like, non-scary way and
lets children practice with two gentle mini-games. There are no timers, no
pressure, and no scary scenes.

> **Important:** This app is not a real road safety course and must not replace
> adult supervision. It is only a soft educational introduction to simple signs.

## Features

- Four friendly sign cards: Stop, Traffic Light, Crosswalk, Bus Stop.
- Each card shows a large simple icon, the sign name, a short friendly meaning,
  and a gentle safe action.
- Two calm mini-games: **Find the Sign** and **Choose the Safe Action**.
- Three difficulty levels: Easy (2 choices), Medium (3 choices), Hard (4 choices).
- Local learning statistics and friendly achievement badges.
- Parent settings: sound on/off, default difficulty, and clear-all-data.
- Fully offline. No accounts, no internet, no permissions.

## Child safety notes

- Extremely friendly, calm tone with soft colors and toy-like icons.
- Positive feedback only. A wrong answer shows "Good try" with the correct
  answer and never shames the child.
- Safe-action wording always keeps a grown-up involved
  (for example, "Cross with a grown-up").

## Road safety disclaimer

This app is a simple learning activity and does not replace adult supervision
near roads. It does not teach children to act independently in real traffic.

## Friendly scene rules / no accident / no scary scene note

The app intentionally avoids accidents, crashes, injuries, fear, sirens, police
scenes, emergency scenes, realistic fast traffic, and any scary road situation.
Only soft colors, calm cards, toy-like streets, and friendly icons are used.

## No internet / no permissions note

The app works fully offline. It does not request internet access and does not
request any runtime permissions (no camera, microphone, location, contacts,
gallery, notifications, storage, or sharing). The Android `permissions` array is
empty.

## Airplane mode support

The app runs completely in airplane mode. All content is bundled and all data is
stored locally on the device.

## No timer / no pressure note

There are no timers, no countdowns, and no penalties anywhere in the app.
Children can take as long as they like on every question.

## Fullscreen sticky immersive mode

The app uses Android edge-to-edge fullscreen with `SystemBars` from
`react-native-edge-to-edge`. The status bar and navigation bar are hidden during
use and only reappear briefly after an edge swipe.

## Portrait only

Orientation is locked to portrait (configured in `app.json`).

## Safe area note

All screens use `react-native-safe-area-context` so content never overlaps
camera cutouts, notches, or rounded corners.

## Keep awake only on the game screen

`expo-keep-awake` is activated only while the active **Sign Game** screen is
focused, and released when leaving it. It is never used globally or on static
screens (home, sign cards, stats, parent settings).

## No ads / no purchases / no accounts / no data collection note

Mini Traffic Signs does not collect, store, or share personal information. The
app works offline. Learning statistics, progress, and settings are stored only
on the device. There are no ads, in-app purchases, accounts, analytics, social
sharing, leaderboards, or any real-money mechanics.

## Achievements and progress

Achievements are local learning progress markers only. They have no value beyond
encouraging learning. Milestones:

1. First Sign Badge — answer 1 question correctly.
2. Stop Sign Helper Badge — answer 5 Stop questions correctly.
3. Light Learner Badge — answer 5 Traffic Light questions correctly.
4. Crosswalk Buddy Badge — answer 5 Crosswalk questions correctly.
5. Friendly Sign Star — answer 20 questions correctly.

## Privacy note

Mini Traffic Signs does not collect personal data. The app works offline and
stores statistics, progress, and settings only on this device. It never stores
names, age, location, device identifiers, or behavioral tracking data.

## App icon and splash screen note

The app uses custom assets designed specifically for it (a friendly toy-like
traffic light and stop sign on a soft cream background). The default Expo icon
and default Expo splash are not used. See `assets/icon.png`,
`assets/adaptive-icon.png`, and `assets/splash.png`, configured in `app.json`.

---

## Getting started

### Requirements

- Node.js 20+
- A recent Expo SDK (this project targets Expo SDK 53 / React Native 0.79).
- Android Studio + Android SDK Platform 35 + Build Tools 35.0.0 for native builds.

### How to scaffold with the official Expo template

This repository already contains the source. If you want to recreate the base
project from the official template:

```bash
npx create-expo-app mini-traffic-signs --template blank
```

Then copy the `src/`, `assets/`, `App.js`, and `app.json` from this repository
over the scaffold.

### How to install dependencies

Install dependencies using Expo so versions stay aligned with the SDK:

```bash
npm install
npx expo install --fix
npx expo-doctor
npx expo install --check
```

Every package imported in the code is listed in `package.json` as a direct
dependency, including the Expo core modules `expo-asset`, `expo-constants`,
`expo-font`, `expo-modules-core`, and `expo-keep-awake`.

### How to run locally

```bash
npx expo start
```

Press `a` to open on an Android emulator or scan the QR code with a device.

### How to build Android (development / debug)

```bash
npx expo run:android
```

---

## Android build (release)

This project uses the Expo prebuild flow. The native `android/` folder is
generated and is not committed (see `.gitignore`).

```bash
npx expo prebuild --platform android --no-install
cd android
./gradlew :app:assembleRelease   # APK
./gradlew :app:bundleRelease     # AAB
```

### Google Play compatibility notes

- Targets Android API level 35 (`targetSdkVersion 35`, `compileSdkVersion 35`),
  pinned via the `expo-build-properties` plugin in `app.json`.
- `minSdkVersion 24` (compatible with React Native 0.79).
- React Native 0.79 / Expo SDK 53 produce a release AAB that supports Android 15+
  16 KB memory page sizes.
- This avoids the Play Console errors
  "must target at least API level 35" and "does not support 16 KB memory page sizes".

---

## Android signing

Never store real passwords or a keystore in the repository.

### How to generate a PKCS12 keystore

Use the **same password** for the keystore and the key (different passwords can
break PKCS12 signing):

```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore mini-traffic-signs-release-key.p12 \
  -alias mini_traffic_signs_key \
  -keyalg RSA -keysize 2048 -validity 10000
```

### How to convert the keystore to base64

```bash
# macOS / Linux
base64 -i mini-traffic-signs-release-key.p12 -o keystore.base64.txt
# or
base64 mini-traffic-signs-release-key.p12 > keystore.base64.txt
```

### How to add GitHub Secrets

In your repository: **Settings -> Secrets and variables -> Actions -> New
repository secret**, add:

| Secret name                 | Value                                            |
|-----------------------------|--------------------------------------------------|
| `ANDROID_KEYSTORE_BASE64`   | Contents of `keystore.base64.txt`                |
| `ANDROID_KEYSTORE_PASSWORD` | The keystore password                            |
| `ANDROID_KEY_ALIAS`         | `mini_traffic_signs_key`                         |
| `ANDROID_KEY_PASSWORD`      | The key password (same as the keystore password) |

### GitHub Actions build explanation

The workflow at `.github/workflows/android-build.yml` runs on push to `main`
(and can be run manually). It:

1. Checks out the code and sets up Node.js and JDK 17.
2. Installs the Android SDK, then `platforms;android-35` and `build-tools;35.0.0`.
3. Runs `npm install`, `npx expo install --fix`, `npx expo-doctor`, and
   `npx expo install --check`.
4. Runs `npx expo prebuild` to generate the native `android/` project.
5. Copies `proguard-rules.pro` into `android/app/` (used only when minify is on).
6. Decodes the keystore from `ANDROID_KEYSTORE_BASE64`.
7. Builds a signed release **APK** and **AAB** using AGP injected signing
   properties (no build.gradle editing required).
8. Uploads `mini-traffic-signs-release.apk` and `mini-traffic-signs-release.aab`
   as build artifacts.

The emulator launch smoke-test is intentionally not part of CI. Launch
verification is a local pre-release step (below).

---

## Obfuscation / release optimization (staged)

Use staged release optimization. **First build and verify a non-minified release
build**, then enable minification and resource shrinking.

Initial release config (`android/app/build.gradle`):

```gradle
android {
    buildTypes {
        release {
            minifyEnabled false
            shrinkResources false
        }
    }
}
```

Only after the non-minified release build launches successfully, enable R8/ProGuard
and resource shrinking:

```gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

With the Expo prebuild flow you can toggle these in `android/gradle.properties`:

```properties
android.enableProguardInReleaseBuilds=true
android.enableShrinkResourcesInReleaseBuilds=true
```

Use the included `proguard-rules.pro` (default optimized config plus React
Native / Expo keep-rules). Do not add risky third-party obfuscation libraries.
Re-test the app launch locally after enabling minify and resource shrinking.

---

## Local launch verification checklist

A successful CI build is **not** proof that the app launches. Before release:

1. Build the release APK.
2. Install it on a physical Android device or local emulator:
   `adb install -r artifacts/mini-traffic-signs-release.apk`
3. Launch the app.
4. Capture logs: `adb logcat *:E`
5. Confirm there are no errors such as:
   - "Cannot find native module"
   - "Module has not been registered"
   - "Invariant Violation"
   - "theme.fonts.regular is undefined"
6. Confirm the app opens to the Home screen in portrait, fullscreen.
7. Turn on airplane mode and confirm everything still works.

## Verification quick commands

```bash
npx expo install --fix
npx expo-doctor
npx expo install --check
```

## Project structure

```text
App.js
app.json
package.json
babel.config.js
proguard-rules.pro
.github/workflows/android-build.yml

assets/
  icon.png
  adaptive-icon.png
  splash.png

src/
  navigation/AppNavigator.js
  screens/  (Home, SignCards, GamePicker, SignGame, Stats, ParentSettings)
  components/  (AppButton, TrafficSignCard, SignIconView, GameModeCard,
                DifficultyChip, AnswerCard, SituationCard, StatCard,
                EmptyState, ScreenContainer)
  data/  (signItems, situationItems, achievementItems)
  utils/  (signGameHelpers, statsHelpers, progressHelpers, soundHelpers,
           immersiveHelpers, dateUtils)
  storage/appStorage.js
  theme/colors.js
```
