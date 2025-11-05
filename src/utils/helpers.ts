// Utility helper functions


export function formatQueue(queue: number[]): string {
  if (queue.length === 0) return '';
  return queue.join(', ');
}

/*
 array i kateve
 */
export function generateFloors(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i);
}


export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}


export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 formatimi prej sekonds ne minisekond
 */
export function formatTime(ms: number): string {
  const seconds = (ms / 1000).toFixed(1);
  return `${seconds}s`;
}

