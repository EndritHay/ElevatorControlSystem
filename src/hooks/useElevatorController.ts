// Custom hook to control elevator movement and queue processing
import { useEffect, useRef } from 'react';
import { useElevatorStore } from '../stores/elevatorStore';
import type { ElevatorId } from '../types';

/**
 * Hook that processes elevator movement for a specific elevator
 * Handles the queue processing loop and animations
 */
export function useElevatorController(elevatorId: ElevatorId) {
  const elevator = useElevatorStore((state) => state.elevators[elevatorId]);
  const speedMsPerFloor = useElevatorStore((state) => state.speedMsPerFloor);
  const doorOpenMs = useElevatorStore((state) => state.doorOpenMs);

  const isProcessingRef = useRef(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!elevator) return;

    // Debug: log queue changes
    console.log(`[${elevatorId}] Queue:`, elevator.targetQueue, 'Processing:', isProcessingRef.current, 'Status:', elevator.status);

    // If already processing, don't interfere - let the async process handle everything
    if (isProcessingRef.current) {
      console.log(`[${elevatorId}] Already processing, skipping effect`);
      return;
    }

    // If there's nothing in the queue, set to idle and exit
    if (elevator.targetQueue.length === 0) {
      if (elevator.status !== 'idle') {
        useElevatorStore.getState().updateElevatorStatus(elevatorId, 'idle');
        useElevatorStore.getState().setElevatorDirection(elevatorId, 'idle');
      }
      return;
    }

    // Start processing the queue
    console.log(`[${elevatorId}] Starting to process queue`);
    isProcessingRef.current = true;
    processNextFloor();

    async function processNextFloor() {
      const store = useElevatorStore.getState();
      
      // Get next floor from queue
      const nextFloor = store.removeFromQueue(elevatorId);
      console.log(`[${elevatorId}] Removed floor from queue: ${nextFloor}`);
      
      if (nextFloor === undefined) {
        isProcessingRef.current = false;
        store.updateElevatorStatus(elevatorId, 'idle');
        store.setElevatorDirection(elevatorId, 'idle');
        return;
      }

      // Get current elevator state
      const currentElevator = store.elevators[elevatorId];
      if (!currentElevator) {
        isProcessingRef.current = false;
        return;
      }

      const startFloor = currentElevator.currentFloor;
      const floorsToMove = Math.abs(nextFloor - startFloor);
      console.log(`[${elevatorId}] Current floor: ${startFloor}, Target: ${nextFloor}, Distance: ${floorsToMove}`);

      // If already at target floor, continue to next
      if (floorsToMove === 0) {
        console.log(`[${elevatorId}] Already at target floor, skipping`);
        isProcessingRef.current = false;
        return;
      }

      // Set direction
      const direction = nextFloor > startFloor ? 'up' : 'down';
      store.setElevatorDirection(elevatorId, direction);
      console.log(`[${elevatorId}] Direction set to: ${direction}`);

      // Set status to moving
      store.updateElevatorStatus(elevatorId, 'moving');
      console.log(`[${elevatorId}] Status set to: moving`);

      // Animate movement
      await animateMovement(startFloor, nextFloor, floorsToMove);

      // Arrived at floor - open doors
      store.updateElevatorStatus(elevatorId, 'doorOpen');

      // Wait for doors to open/close
      await wait(doorOpenMs);

      // Close doors
      store.updateElevatorStatus(elevatorId, 'stopped');

      // Brief pause before next
      await wait(100);

      // Mark as not processing
      isProcessingRef.current = false;

      // Check if there are more floors to process
      const updatedElevator = store.elevators[elevatorId];
      if (updatedElevator && updatedElevator.targetQueue.length > 0) {
        // Continue processing the next floor
        isProcessingRef.current = true;
        processNextFloor();
      } else {
        // No more floors, set to idle
        store.updateElevatorStatus(elevatorId, 'idle');
        store.setElevatorDirection(elevatorId, 'idle');
      }
    }

    function animateMovement(
      start: number,
      end: number,
      floors: number
    ): Promise<void> {
      console.log(`[${elevatorId}] Animating from floor ${start} to ${end} (${floors} floors, ${floors * speedMsPerFloor}ms)`);
      const totalTime = floors * speedMsPerFloor;
      const startTime = Date.now();

      return new Promise<void>((resolve) => {
        let frameCount = 0;
        function animate() {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / totalTime, 1);

          // Ease-in-out cubic
          const eased =
            progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          const currentFloor = start + (end - start) * eased;
          
          // Debug: Log every 10 frames
          if (frameCount % 10 === 0) {
            console.log(`[${elevatorId}] Animation frame ${frameCount}: floor=${currentFloor.toFixed(2)}, progress=${(progress * 100).toFixed(0)}%`);
          }
          frameCount++;
          
          useElevatorStore.getState().updateElevatorPosition(elevatorId, currentFloor);

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(animate);
          } else {
            console.log(`[${elevatorId}] Animation complete, arrived at floor ${end}`);
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

    // Cleanup on unmount - but NOT during processing!
    return () => {
      // Only cancel animation if we're not actively processing
      // This prevents the effect cleanup from killing ongoing animations
      if (!isProcessingRef.current && animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [elevator, elevatorId, speedMsPerFloor, doorOpenMs]);

  return elevator;
}

