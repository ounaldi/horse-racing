import type { IHorse } from '@/types/horse';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useBenchStore } from './bench';

describe('Bench Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should have initial state', () => {
    // Given/When
    const store = useBenchStore();

    // Then
    expect(store.bench).toEqual([]);
  });

  it('should set horses', () => {
    // Given
    const store = useBenchStore();
    const mockHorses: IHorse[] = [
      { id: '1', name: 'Horse 1', condition: 80, color: 'brown' },
      { id: '2', name: 'Horse 2', condition: 75, color: 'black' }
    ];

    // When
    store.setHorses(mockHorses);

    // Then
    expect(store.bench).toEqual(mockHorses);
  });

  it('should get benched horses through getter', () => {
    // Given
    const store = useBenchStore();
    const mockHorses: IHorse[] = [
      { id: '1', name: 'Horse 1', condition: 80, color: 'brown' },
      { id: '2', name: 'Horse 2', condition: 75, color: 'black' }
    ];
    store.setHorses(mockHorses);

    // When
    const result = store.getBenchs;

    // Then
    expect(result).toEqual(mockHorses);
  });

  it('should handle empty horse array', () => {
    // Given
    const store = useBenchStore();

    // When
    store.setHorses([]);

    // Then
    expect(store.bench).toEqual([]);

    // When
    const emptyResult = store.getBenchs;

    // Then
    expect(emptyResult).toEqual([]);
  });
}); 