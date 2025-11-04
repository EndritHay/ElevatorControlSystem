// Utility helper functions

/**
 * Formats a queue of floor numbers for display
 */
export function formatQueue(queue: number[]): string {
  if (queue.length === 0) return '';
  return queue.join(', ');
}

/**
 * Generates an array of floor numbers
 */
export function generateFloors(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i);
}

/**
 * Clamps a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Waits for a specified duration
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Formats milliseconds to seconds
 */
export function formatTime(ms: number): string {
  const seconds = (ms / 1000).toFixed(1);
  return `${seconds}s`;
}

