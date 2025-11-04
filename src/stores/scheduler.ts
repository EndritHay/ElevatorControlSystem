// Multi-elevator scheduler - picks best elevator for a request
import type { Elevator, FloorNumber } from '../types';

/**
 * Estimates the time (in ms) for an elevator to serve a floor request
 * Considers current queue and simulates walk-through
 */
export function estimateTimeToServe(
  elevator: Elevator,
  requestFloor: FloorNumber,
  speedMsPerFloor: number,
  doorOpenMs: number
): number {
  // If elevator has no queue, simple calculation
  if (elevator.targetQueue.length === 0) {
    const distance = Math.abs(elevator.currentFloor - requestFloor);
    return distance * speedMsPerFloor;
  }

  // Simulate walking through the queue
  let currentPosition = elevator.currentFloor;
  let totalTime = 0;

  // Add time for all queued stops
  for (const queuedFloor of elevator.targetQueue) {
    const distance = Math.abs(currentPosition - queuedFloor);
    totalTime += distance * speedMsPerFloor + doorOpenMs;
    currentPosition = queuedFloor;
  }

  // Add time from last queue stop to request floor
  const finalDistance = Math.abs(currentPosition - requestFloor);
  totalTime += finalDistance * speedMsPerFloor;

  return totalTime;
}

/**
 * Picks the best elevator to serve a floor request
 * Uses estimated arrival time as primary metric
 */
export function pickBestElevator(
  elevators: Elevator[],
  requestFloor: FloorNumber,
  speedMsPerFloor: number = 500,
  doorOpenMs: number = 800
): Elevator | null {
  if (elevators.length === 0) {
    return null;
  }

  let bestElevator: Elevator | null = null;
  let minTime = Infinity;

  for (const elevator of elevators) {
    const estimatedTime = estimateTimeToServe(
      elevator,
      requestFloor,
      speedMsPerFloor,
      doorOpenMs
    );

    // Prefer elevator with shorter estimated time
    if (estimatedTime < minTime) {
      minTime = estimatedTime;
      bestElevator = elevator;
    }
    // Tie-breaker: prefer elevator with smaller queue
    else if (estimatedTime === minTime && bestElevator) {
      if (elevator.targetQueue.length < bestElevator.targetQueue.length) {
        bestElevator = elevator;
      }
    }
  }

  return bestElevator;
}

/**
 * Checks if a floor is already in the elevator's queue
 */
export function isFloorInQueue(
  elevator: Elevator,
  floor: FloorNumber
): boolean {
  return elevator.targetQueue.includes(floor);
}

/**
 * Adds floor to queue if not already present
 */
export function addFloorToQueue(
  queue: FloorNumber[],
  floor: FloorNumber
): FloorNumber[] {
  if (queue.includes(floor)) {
    return queue; // Already in queue
  }
  return [...queue, floor];
}

