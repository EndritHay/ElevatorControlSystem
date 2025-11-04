# Audio Assets

This directory contains sound effects for the elevator system.

## Adding the arrival sound

To add an arrival "ding" sound:

1. Place a short audio file (5-10 KB recommended) named `arrival.mp3` or `arrival.wav` in this directory
2. The sound will play when an elevator arrives at a floor and opens its doors

## Recommended specifications

- Format: MP3 or WAV
- Duration: 0.5 - 1 second
- File size: < 10 KB
- Volume: Normalized to -6dB

## Free sound resources

- [Freesound.org](https://freesound.org/)
- [Zapsplat](https://www.zapsplat.com/)
- [SoundBible](https://soundbible.com/)

## Usage in code

The sound is played in the `useElevatorController` hook when the elevator status changes to `doorOpen`.

Example implementation (optional):
```typescript
const audio = new Audio('/src/assets/sounds/arrival.mp3');
audio.volume = 0.3;
audio.play().catch(() => {
  // Handle audio play failure (user interaction required on some browsers)
});
```

