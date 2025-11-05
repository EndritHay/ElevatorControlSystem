import type { Elevator, FloorNumber } from '../types';


export function estimateTimeToServe(
  elevator: Elevator,
  requestFloor: FloorNumber,
  speedMsPerFloor: number,
  doorOpenMs: number
): number {
  // nese nese nuk ka qe ne queue, thjesht llogaritja
  if (elevator.targetQueue.length === 0) {
    const distance = Math.abs(elevator.currentFloor - requestFloor);
    return distance * speedMsPerFloor;
  }

  // simulojm duke kaluar ne queue
  let currentPosition = elevator.currentFloor;
  let totalTime = 0;

  // shtojme koheneee
  for (const queuedFloor of elevator.targetQueue) {
    const distance = Math.abs(currentPosition - queuedFloor);
    totalTime += distance * speedMsPerFloor + doorOpenMs;
    currentPosition = queuedFloor;
  }

  const finalDistance = Math.abs(currentPosition - requestFloor);
  totalTime += finalDistance * speedMsPerFloor;

  return totalTime;
}

/**
 merr lifti me kohen mat shkurt , BESTELEVATOR
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

    // lifti ma i afert ne kohe
    if (estimatedTime < minTime) {
      minTime = estimatedTime;
      bestElevator = elevator;
    }
    else if (estimatedTime === minTime && bestElevator) {
      if (elevator.targetQueue.length < bestElevator.targetQueue.length) {
        bestElevator = elevator;
      }
    }
  }

  return bestElevator;
}

export function isFloorInQueue(
  elevator: Elevator,
  floor: FloorNumber
): boolean {
  return elevator.targetQueue.includes(floor);
}

export function addFloorToQueue(
  queue: FloorNumber[],
  floor: FloorNumber
): FloorNumber[] {
  if (queue.includes(floor)) {
    return queue; 
  }
  return [...queue, floor];
}

