import type { IHorse } from '@/types/horse';
import { describe, expect, it } from 'vitest';
import GetRandomHorses from './get-random-horses';

describe('GetRandomHorses', () => {
  it('should return a subset of horses with the specified count', () => {
    // Given
    const horses: Array<IHorse> = [
      { id: '1', name: 'Horse 1', condition: 80, color: 'brown' },
      { id: '2', name: 'Horse 2', condition: 85, color: 'black' },
      { id: '3', name: 'Horse 3', condition: 90, color: 'white' },
      { id: '4', name: 'Horse 4', condition: 95, color: 'grey' },
    ];
    const count = 2;

    // When
    const result = GetRandomHorses(horses, count);

    // Then
    expect(result).toHaveLength(count);
    expect(result.every(horse => horses.some(h => h.id === horse.id))).toBeTruthy();
  });

  it('should return all horses if count is greater than or equal to the number of horses', () => {
    // Given
    const horses: Array<IHorse> = [
      { id: '1', name: 'Horse 1', condition: 80, color: 'brown' },
      { id: '2', name: 'Horse 2', condition: 85, color: 'black' },
    ];
    const count = 3;

    // When
    const result = GetRandomHorses(horses, count);

    // Then
    expect(result).toHaveLength(horses.length);
    expect(result).toEqual(expect.arrayContaining(horses));
  });

  it('should return an empty array if the input array is empty', () => {
    // Given
    const horses: Array<IHorse> = [];
    const count = 2;

    // When
    const result = GetRandomHorses(horses, count);

    // Then
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should return a randomized subset of horses', () => {
    // Given
    const horses: Array<IHorse> = Array.from({ length: 20 }, (_, i) => ({
      id: i.toString(),
      name: `Horse ${i}`,
      condition: 80 + i,
      color: 'brown',
    }));
    const count = 5;

    // When
    const result1 = GetRandomHorses([...horses], count);
    const result2 = GetRandomHorses([...horses], count);

    // Then
    const allSameOrder = result1.every((horse, index) => horse.id === result2[index]?.id);
    expect(allSameOrder).toBe(false);
  });
}); 