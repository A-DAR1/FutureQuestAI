# Contributing

FutureQuest AI is currently a portfolio prototype. Small, focused improvements are welcome.

## Local checks

```bash
npm ci
npx tsc --noEmit
```

Run the app with `npm start` and manually verify the complete seven-screen flow before opening a pull request.

## Pull requests

- Keep each pull request focused on one improvement.
- Explain the user problem and the behavior that changed.
- Include screenshots or a short recording for interface changes.
- Do not commit secrets, student data, `.env` files, `node_modules`, or local Expo state.
- Clearly separate implemented prototype behavior from future product vision.

Changes affecting minors, parent controls, AI output, community features, or data handling should include a short safety and privacy impact note.
