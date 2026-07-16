# FutureQuest AI Prototype

A pitch-ready Expo/React Native prototype for **FutureQuest AI**, an AI companion for Indian students from Class 8 to 12.

## What this prototype demonstrates

- Fun onboarding / future scan
- AI-generated future avatar
- Career worlds
- Weekly quest dashboard
- Simulated AI companion chat
- Parent progress report

The AI chat is intentionally scripted for demo reliability. You can connect a real AI API later if needed.

## How to run locally

Install Node.js first, then run:

```bash
cd futurequest-ai-prototype
npm install
npx expo start
```

Then scan the QR code using Expo Go on your phone, or run it on an Android emulator.

## How to create an APK

Expo's current EAS Build flow supports Android APK builds by setting `android.buildType` to `apk` in `eas.json`. This project already includes that preview profile.

Run:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

After the cloud build finishes, Expo will give you a download link for the `.apk` file.

## Demo flow to show in your pitch

1. Open Welcome screen.
2. Start the Future Scan as Aarav, a Class 10 student.
3. Answer quiz questions.
4. Show the Future Avatar result.
5. Open Career Worlds.
6. Show Quest Dashboard.
7. Open AI Companion Chat.
8. Click quick prompts like “I am confused between commerce and humanities.”
9. Show Parent Report.

## Best pitch line

FutureQuest does not ask students what they want to become. It helps them test who they could become through quests, AI guidance, parent reports, and a growing portfolio.
