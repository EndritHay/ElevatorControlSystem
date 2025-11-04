// Zustand store for elevator state management
import { create } from 'zustand';
import type { Elevator, ElevatorId, FloorNumber } from '../types';
import {
  pickBestElevator,
  addFloorToQueue,
  isFloorInQueue,
} from './scheduler';

interface ElevatorStore {
  elevators: Record<ElevatorId, Elevator>;
  speedMsPerFloor: number;
  doorOpenMs: number;
  totalFloors: number;

  // Actions
  initializeElevators: (
    count: number,
    floors: number,
    speedMsPerFloor?: number
  ) => void;
  enqueueFloor: (elevatorId: ElevatorId, floor: FloorNumber) => void;
  callElevator: (floor: FloorNumber) => void;
  updateElevatorPosition: (
    elevatorId: ElevatorId,
    currentFloor: FloorNumber
  ) => void;
  updateElevatorStatus: (
    elevatorId: ElevatorId,
    status: Elevator['status']
  ) => void;
  removeFromQueue: (elevatorId: ElevatorId) => FloorNumber | undefined;
  setElevatorDirection: (
    elevatorId: ElevatorId,
    direction: Elevator['direction']
  ) => void;
  resetAll: () => void;
}

export const useElevatorStore = create<ElevatorStore>((set, get) => ({
  elevators: {},
  speedMsPerFloor: 500,
  doorOpenMs: 800,
  totalFloors: 10,

  initializeElevators: (
    count: number,
    floors: number,
    speedMsPerFloor: number = 500
  ) => {
    const elevators: Record<ElevatorId, Elevator> = {};

    for (let i = 0; i < count; i++) {
      const id = `elevator-${i + 1}`;
      elevators[id] = {
        id,
        currentFloor: 0, // Start at ground floor
        targetQueue: [],
        status: 'idle',
        direction: 'idle',
        speedMsPerFloor,
      };
    }

    set({
      elevators,
      totalFloors: floors,
      speedMsPerFloor,
    });
  },

  enqueueFloor: (elevatorId: ElevatorId, floor: FloorNumber) => {
    set((state) => {
      const elevator = state.elevators[elevatorId];
      if (!elevator) return state;

      // Don't add if already in queue or is current floor
      if (
        isFloorInQueue(elevator, floor) ||
        elevator.currentFloor === floor
      ) {
        return state;
      }

      return {
        elevators: {
          ...state.elevators,
          [elevatorId]: {
            ...elevator,
            targetQueue: addFloorToQueue(elevator.targetQueue, floor),
          },
        },
      };
    });
  },

  callElevator: (floor: FloorNumber) => {
    const state = get();
    const elevatorsList = Object.values(state.elevators);

    // Use scheduler to pick best elevator
    const bestElevator = pickBestElevator(
      elevatorsList,
      floor,
      state.speedMsPerFloor,
      state.doorOpenMs
    );

    if (bestElevator) {
      get().enqueueFloor(bestElevator.id, floor);
    }
  },

  updateElevatorPosition: (
    elevatorId: ElevatorId,
    currentFloor: FloorNumber
  ) => {
    set((state) => {
      const elevator = state.elevators[elevatorId];
      if (!elevator) return state;

      return {
        elevators: {
          ...state.elevators,
          [elevatorId]: {
            ...elevator,
            currentFloor,
          },
        },
      };
    });
  },

  updateElevatorStatus: (
    elevatorId: ElevatorId,
    status: Elevator['status']
  ) => {
    set((state) => {
      const elevator = state.elevators[elevatorId];
      if (!elevator) return state;

      return {
        elevators: {
          ...state.elevators,
          [elevatorId]: {
            ...elevator,
            status,
          },
        },
      };
    });
  },

  removeFromQueue: (elevatorId: ElevatorId): FloorNumber | undefined => {
    let removedFloor: FloorNumber | undefined;

    set((state) => {
      const elevator = state.elevators[elevatorId];
      if (!elevator || elevator.targetQueue.length === 0) return state;

      const [nextFloor, ...remainingQueue] = elevator.targetQueue;
      removedFloor = nextFloor;

      return {
        elevators: {
          ...state.elevators,
          [elevatorId]: {
            ...elevator,
            targetQueue: remainingQueue,
          },
        },
      };
    });

    return removedFloor;
  },

  setElevatorDirection: (
    elevatorId: ElevatorId,
    direction: Elevator['direction']
  ) => {
    set((state) => {
      const elevator = state.elevators[elevatorId];
      if (!elevator) return state;

      return {
        elevators: {
          ...state.elevators,
          [elevatorId]: {
            ...elevator,
            direction,
          },
        },
      };
    });
  },

  resetAll: () => {
    const state = get();
    const count = Object.keys(state.elevators).length;
    get().initializeElevators(count, state.totalFloors, state.speedMsPerFloor);
  },
}));

