// Core type definitions for the Elevator Control System

export type ElevatorId = string;
export type FloorNumber = number;
export type ElevatorStatus = 'idle' | 'moving' | 'stopped' | 'doorOpen';
export type Direction = 'up' | 'down' | 'idle';

export interface Elevator {
  id: ElevatorId;
  currentFloor: FloorNumber;
  targetQueue: FloorNumber[]; // FIFO queue of stops
  status: ElevatorStatus;
  direction: Direction;
  speedMsPerFloor?: number; // configurable speed
}

export interface BuildingConfig {
  id: string;
  floors: number;
  elevators: Elevator[];
}

export interface CallRequest {
  floor: FloorNumber;
  direction?: Direction;
  timestamp: number;
}

export interface ElevatorState {
  elevators: Record<ElevatorId, Elevator>;
  pendingCalls: CallRequest[];
}

