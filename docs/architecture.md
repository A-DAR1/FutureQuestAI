# Prototype architecture

FutureQuest AI is an Expo/React Native prototype optimized for a reliable product demo. The original implementation is intentionally compact: the entire seven-screen experience lives in `App.tsx`, and screen changes are controlled by local React state.

## Screen flow

```mermaid
flowchart LR
    A["Welcome"] --> B["Future Scan"]
    B --> C["Future Avatar"]
    C --> D["Career Worlds"]
    D --> E["Weekly Quests"]
    E --> F["AI Companion"]
    F --> G["Parent Report"]
```

The header also allows direct movement among screens during a pitch.

## Runtime model

- `index.ts` registers the root Expo component.
- `App.tsx` owns navigation state, quiz answers, the selected career world, chat messages, and all presentation components.
- `getAvatar()` derives one of three future-avatar profiles from quiz answers.
- `aiReply()` selects a scripted response using simple keyword matching.
- `StyleSheet.create()` contains the visual system for the complete prototype.
- All state is in memory. Restarting the app resets the demo.

## Why the AI is scripted

The prototype is meant to work predictably in a live presentation without network latency, model variability, API costs, or secret keys. The scripted companion demonstrates the interaction pattern while keeping the demo deterministic.

## Production evolution

A production system would likely separate the current file into feature modules and introduce:

1. Typed navigation and independent screen components
2. Authenticated student and parent roles
3. A secure API and database with explicit retention rules
4. A quest, rating, approval, and student-profile domain model
5. Guardrailed AI orchestration with evaluation and monitoring
6. Moderated community questions without open direct messaging
7. College and opportunity integrations built around user consent
8. Automated tests, observability, and incident response

Any production design should treat minor safety, parent controls, privacy, and explainability as core product requirements rather than later additions.
