import { renderHook, act } from '@testing-library/react';
import { useElevatorStore } from '../elevatorStore';

describe('ElevatorStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useElevatorStore());
    act(() => {
      result.current.resetAll();
    });
  });

  describe('initializeElevators', () => {
    it('should create elevators with correct initial state', () => {
      const { result } = renderHook(() => useElevatorStore());

      act(() => {
        result.current.initializeElevators(2, 10, 500);
      });

      const elevators = result.current.elevators;
      expect(Object.keys(elevators)).toHaveLength(2);

      const elevator = elevators['elevator-1'];
      expect(elevator).toBeDefined();
      expect(elevator.currentFloor).toBe(0);
      expect(elevator.targetQueue).toEqual([]);
      expect(elevator.status).toBe('idle');
      expect(elevator.direction).toBe('idle');
    });

    it('should set total floors and speed', () => {
      const { result } = renderHook(() => useElevatorStore());

      act(() => {
        result.current.initializeElevators(1, 15, 600);
      });

      expect(result.current.totalFloors).toBe(15);
      expect(result.current.speedMsPerFloor).toBe(600);
    });
  });

  describe('enqueueFloor', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useElevatorStore());
      act(() => {
        result.current.initializeElevators(1, 10);
      });
    });

    it('should add floor to elevator queue', () => {
      const { result } = renderHook(() => useElevatorStore());

      act(() => {
        result.current.enqueueFloor('elevator-1', 5);
      });

      const elevator = result.current.elevators['elevator-1'];
      expect(elevator.targetQueue).toContain(5);
    });

    it('should not add duplicate floors', () => {
      const { result } = renderHook(() => useElevatorStore());

      act(() => {
        result.current.enqueueFloor('elevator-1', 5);
        result.current.enqueueFloor('elevator-1', 5);
      });

      const elevator = result.current.elevators['elevator-1'];
      expect(elevator.targetQueue).toEqual([5]);
    });

    it('should not add current floor to queue', () => {
      const { result } = renderHook(() => useElevatorStore());

      act(() => {
        result.current.enqueueFloor('elevator-1', 0); // Already at floor 0
      });

      const elevator = result.current.elevators['elevator-1'];
      expect(elevator.targetQueue).toEqual([]);
    });
  });

  describe('removeFromQueue', () => {
    it('should remove and return first floor from queue', () => {
      const { result } = renderHook(() => useElevatorStore());

      act(() => {
        result.current.initializeElevators(1, 10);
        result.current.enqueueFloor('elevator-1', 5);
        result.current.enqueueFloor('elevator-1', 8);
      });

      let removedFloor: number | undefined;
      act(() => {
        removedFloor = result.current.removeFromQueue('elevator-1');
      });

      expect(removedFloor).toBe(5);
      const elevator = result.current.elevators['elevator-1'];
      expect(elevator.targetQueue).toEqual([8]);
    });

    it('should return undefined for empty queue', () => {
      const { result } = renderHook(() => useElevatorStore());

      act(() => {
        result.current.initializeElevators(1, 10);
      });

      let removedFloor: number | undefined;
      act(() => {
        removedFloor = result.current.removeFromQueue('elevator-1');
      });

      expect(removedFloor).toBeUndefined();
    });
  });

  describe('updateElevatorPosition', () => {
    it('should update elevator current floor', () => {
      const { result } = renderHook(() => useElevatorStore());

      act(() => {
        result.current.initializeElevators(1, 10);
        result.current.updateElevatorPosition('elevator-1', 5);
      });

      const elevator = result.current.elevators['elevator-1'];
      expect(elevator.currentFloor).toBe(5);
    });
  });

  describe('updateElevatorStatus', () => {
    it('should update elevator status', () => {
      const { result } = renderHook(() => useElevatorStore());

      act(() => {
        result.current.initializeElevators(1, 10);
        result.current.updateElevatorStatus('elevator-1', 'moving');
      });

      const elevator = result.current.elevators['elevator-1'];
      expect(elevator.status).toBe('moving');
    });
  });

  describe('callElevator', () => {
    it('should assign request to an elevator', () => {
      const { result } = renderHook(() => useElevatorStore());

      act(() => {
        result.current.initializeElevators(2, 10);
        result.current.callElevator(5);
      });

      const elevators = Object.values(result.current.elevators);
      const hasRequest = elevators.some((e) => e.targetQueue.includes(5));
      expect(hasRequest).toBe(true);
    });
  });

  describe('resetAll', () => {
    it('should reset all elevators to initial state', () => {
      const { result } = renderHook(() => useElevatorStore());

      act(() => {
        result.current.initializeElevators(2, 10);
        result.current.enqueueFloor('elevator-1', 5);
        result.current.updateElevatorPosition('elevator-1', 3);
        result.current.resetAll();
      });

      const elevator = result.current.elevators['elevator-1'];
      expect(elevator.currentFloor).toBe(0);
      expect(elevator.targetQueue).toEqual([]);
      expect(elevator.status).toBe('idle');
    });
  });
});

