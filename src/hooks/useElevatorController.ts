import { useEffect, useRef } from 'react';
import { useElevatorStore } from '../stores/elevatorStore';
import type { ElevatorId } from '../types';

export function useElevatorController(elevatorId: ElevatorId) {
  const elevator = useElevatorStore((state) => state.elevators[elevatorId]);
  const speedMsPerFloor = useElevatorStore((state) => state.speedMsPerFloor);
  const doorOpenMs = useElevatorStore((state) => state.doorOpenMs);

  const isProcessingRef = useRef(false);
  const animationFrameRef = useRef<number>();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    try {
      audioRef.current = new Audio('/sounds/arrival.mp3');
      audioRef.current.volume = 0.3; // Set volume to 30%
    } catch (error) {
      console.warn('Failed to load arrival sound:', error);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!elevator) return;

    if (isProcessingRef.current) return;

    if (elevator.targetQueue.length === 0) {
      if (elevator.status !== 'idle') {
        useElevatorStore.getState().updateElevatorStatus(elevatorId, 'idle');
        useElevatorStore.getState().setElevatorDirection(elevatorId, 'idle');
      }
      return;
    }

    isProcessingRef.current = true;
    processNextFloor();

    async function processNextFloor() {
      const store = useElevatorStore.getState();
      const nextFloor = store.removeFromQueue(elevatorId);
      
      if (nextFloor === undefined) {
        isProcessingRef.current = false;
        store.updateElevatorStatus(elevatorId, 'idle');
        store.setElevatorDirection(elevatorId, 'idle');
        return;
      }

      const currentElevator = store.elevators[elevatorId];
      if (!currentElevator) {
        isProcessingRef.current = false;
        return;
      }

      const startFloor = currentElevator.currentFloor;
      const floorsToMove = Math.abs(nextFloor - startFloor);

      if (floorsToMove === 0) {
        isProcessingRef.current = false;
        return;
      }

      const direction = nextFloor > startFloor ? 'up' : 'down';
      store.setElevatorDirection(elevatorId, direction);
      store.updateElevatorStatus(elevatorId, 'moving');

      await animateMovement(startFloor, nextFloor, floorsToMove);

      store.updateElevatorStatus(elevatorId, 'stopped');
      await wait(1000);

      store.updateElevatorStatus(elevatorId, 'doorOpen');
      
      // Play arrival sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0; // Reset to start
        audioRef.current.play().catch((error) => {
          console.warn('Failed to play arrival sound:', error);
        });
      }
      
      await wait(doorOpenMs);
      await wait(1000);

      isProcessingRef.current = false;

      const updatedElevator = store.elevators[elevatorId];
      if (updatedElevator && updatedElevator.targetQueue.length > 0) {
        isProcessingRef.current = true;
        processNextFloor();
      } else {
        store.updateElevatorStatus(elevatorId, 'idle');
        store.setElevatorDirection(elevatorId, 'idle');
      }
    }

    function animateMovement(
      start: number,
      end: number,
      floors: number
    ): Promise<void> {
      const totalTime = floors * speedMsPerFloor;
      const startTime = Date.now();

      return new Promise<void>((resolve) => {
        function animate() {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / totalTime, 1);

          const eased =
            progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          const currentFloor = start + (end - start) * eased;
          useElevatorStore.getState().updateElevatorPosition(elevatorId, currentFloor);

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(animate);
          } else {
            useElevatorStore.getState().updateElevatorPosition(elevatorId, end);
            resolve();
          }
        }

        animate();
      });
    }

    function wait(ms: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    return () => {
      if (!isProcessingRef.current && animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [elevator, elevatorId, speedMsPerFloor, doorOpenMs]);

  return elevator;
}

