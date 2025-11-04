import {
  formatQueue,
  generateFloors,
  clamp,
  formatTime,
} from '../helpers';

describe('Helpers', () => {
  describe('formatQueue', () => {
    it('should format queue as comma-separated string', () => {
      expect(formatQueue([1, 3, 5])).toBe('1, 3, 5');
    });

    it('should return empty string for empty queue', () => {
      expect(formatQueue([])).toBe('');
    });

    it('should handle single item', () => {
      expect(formatQueue([5])).toBe('5');
    });
  });

  describe('generateFloors', () => {
    it('should generate array of floor numbers', () => {
      expect(generateFloors(5)).toEqual([0, 1, 2, 3, 4]);
    });

    it('should handle zero floors', () => {
      expect(generateFloors(0)).toEqual([]);
    });

    it('should handle single floor', () => {
      expect(generateFloors(1)).toEqual([0]);
    });
  });

  describe('clamp', () => {
    it('should clamp value within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('should handle edge cases', () => {
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(10, 0, 10)).toBe(10);
    });
  });

  describe('formatTime', () => {
    it('should format milliseconds to seconds', () => {
      expect(formatTime(1000)).toBe('1.0s');
      expect(formatTime(2500)).toBe('2.5s');
      expect(formatTime(500)).toBe('0.5s');
    });

    it('should handle zero', () => {
      expect(formatTime(0)).toBe('0.0s');
    });
  });
});

