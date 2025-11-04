import {
  estimateTimeToServe,
  pickBestElevator,
  isFloorInQueue,
  addFloorToQueue,
} from '../scheduler';
import type { Elevator } from '../../types';

describe('Scheduler', () => {
  const mockElevator = (
    id: string,
    currentFloor: number,
    targetQueue: number[]
  ): Elevator => ({
    id,
    currentFloor,
    targetQueue,
    status: 'idle',
    direction: 'idle',
    speedMsPerFloor: 500,
  });

  describe('estimateTimeToServe', () => {
    it('should calculate time correctly for idle elevator', () => {
      const elevator = mockElevator('e1', 0, []);
      const time = estimateTimeToServe(elevator, 5, 500, 800);
      expect(time).toBe(2500); // 5 floors * 500ms
    });

    it('should account for queued stops', () => {
      const elevator = mockElevator('e1', 0, [3, 6]);
      const time = estimateTimeToServe(elevator, 8, 500, 800);
      // 0->3: 1500ms + 800ms door = 2300ms
      // 3->6: 1500ms + 800ms door = 2300ms
      // 6->8: 1000ms = 1000ms
      // Total: 5600ms
      expect(time).toBe(5600);
    });

    it('should handle elevator already at requested floor', () => {
      const elevator = mockElevator('e1', 5, []);
      const time = estimateTimeToServe(elevator, 5, 500, 800);
      expect(time).toBe(0);
    });
  });

  describe('pickBestElevator', () => {
    it('should pick closest idle elevator', () => {
      const elevators = [
        mockElevator('e1', 1, []),
        mockElevator('e2', 6, []),
        mockElevator('e3', 9, []),
      ];

      const chosen = pickBestElevator(elevators, 5, 500, 800);
      expect(chosen?.id).toBe('e2'); // Closest to floor 5
    });

    it('should prefer elevator with shorter queue', () => {
      const elevators = [
        mockElevator('e1', 0, [2, 4, 6]),
        mockElevator('e2', 0, [2]),
      ];

      const chosen = pickBestElevator(elevators, 8, 500, 800);
      expect(chosen?.id).toBe('e2'); // Shorter queue
    });

    it('should return null for empty elevator list', () => {
      const chosen = pickBestElevator([], 5, 500, 800);
      expect(chosen).toBeNull();
    });

    it('should handle multiple elevators at same distance', () => {
      const elevators = [
        mockElevator('e1', 0, []),
        mockElevator('e2', 0, []),
      ];

      const chosen = pickBestElevator(elevators, 5, 500, 800);
      expect(chosen).toBeTruthy();
      expect(['e1', 'e2']).toContain(chosen?.id);
    });
  });

  describe('isFloorInQueue', () => {
    it('should return true if floor is in queue', () => {
      const elevator = mockElevator('e1', 0, [2, 5, 8]);
      expect(isFloorInQueue(elevator, 5)).toBe(true);
    });

    it('should return false if floor is not in queue', () => {
      const elevator = mockElevator('e1', 0, [2, 5, 8]);
      expect(isFloorInQueue(elevator, 3)).toBe(false);
    });

    it('should return false for empty queue', () => {
      const elevator = mockElevator('e1', 0, []);
      expect(isFloorInQueue(elevator, 5)).toBe(false);
    });
  });

  describe('addFloorToQueue', () => {
    it('should add floor to queue', () => {
      const queue = [2, 5];
      const newQueue = addFloorToQueue(queue, 8);
      expect(newQueue).toEqual([2, 5, 8]);
    });

    it('should not add duplicate floor', () => {
      const queue = [2, 5, 8];
      const newQueue = addFloorToQueue(queue, 5);
      expect(newQueue).toEqual([2, 5, 8]);
    });

    it('should handle empty queue', () => {
      const queue: number[] = [];
      const newQueue = addFloorToQueue(queue, 5);
      expect(newQueue).toEqual([5]);
    });

    it('should not mutate original queue', () => {
      const queue = [2, 5];
      const newQueue = addFloorToQueue(queue, 8);
      expect(queue).toEqual([2, 5]);
      expect(newQueue).not.toBe(queue);
    });
  });
});

