# Audio Assets

This directory contains documentation for sound effects in the elevator system.

## Arrival Sound

An arrival "ding" sound is configured to play when elevators arrive at floors.

**Location:** The audio file is served from `public/sounds/arrival.mp3`

**Usage:** The sound automatically plays when an elevator arrives at a floor and opens its doors.

## Recommended specifications

- Format: MP3 or WAV
- Duration: 0.5 - 1 second
- File size: < 10 KB
- Volume: Normalized to -6dB

## Free sound resources

- [Freesound.org](https://freesound.org/)
- [Zapsplat](https://www.zapsplat.com/)
- [SoundBible](https://soundbible.com/)

## Implementation

The sound is played in the `useElevatorController` hook when the elevator status changes to `doorOpen`.

**Current implementation:**
- Audio file is loaded when the hook initializes
- Volume is set to 30% for a pleasant experience
- Sound plays automatically when doors open
- Errors are caught and logged to console

**Code location:** `src/hooks/useElevatorController.ts`

```typescript
// Audio is initialized once
const audioRef = useRef<HTMLAudioElement | null>(null);
audioRef.current = new Audio('/sounds/arrival.mp3');
audioRef.current.volume = 0.3;

// Played when doors open
audioRef.current.play().catch((error) => {
  console.warn('Failed to play arrival sound:', error);
});
```

