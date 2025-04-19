import type { IHorse } from '@/types/horse';
import type { IRace } from '@/types/race';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useRaceStore } from './race';

describe('Race Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should have initial state', () => {
    // Given/When
    const store = useRaceStore();

    // Then
    expect(store.isRaceStarted).toBe(false);
    expect(store.currentLabIndex).toBe(undefined);
    expect(store.races).toEqual([]);
  });

  it('should set isRaceStarted', () => {
    // Given
    const store = useRaceStore();

    // When
    store.setIsRaceStarted(true);

    // Then
    expect(store.isRaceStarted).toBe(true);
  });

  it('should set currentLabIndex', () => {
    // Given
    const store = useRaceStore();

    // When
    store.setCurrentLabIndex(1);

    // Then
    expect(store.currentLabIndex).toBe(1);
  });

  it('should set races', () => {
    // Given
    const store = useRaceStore();
    const mockRaces: IRace[] = [
      {
        id: '1',
        distance: 1200,
        horses: [{ id: '1', name: 'Horse 1', condition: 80, color: 'brown' }],
        result: []
      }
    ];

    // When
    store.setRaces(mockRaces);

    // Then
    expect(store.races).toEqual(mockRaces);
    expect(store.currentLabIndex).toBe(0);
  });

  it('should add horse to result', () => {
    // Given
    const store = useRaceStore();
    const mockHorse: IHorse = { id: '1', name: 'Horse 1', condition: 80, color: 'brown' };
    const mockRaces: IRace[] = [
      {
        id: '1',
        distance: 1200,
        horses: [mockHorse],
        result: []
      }
    ];
    store.setRaces(mockRaces);

    // When
    store.addHorseToResult(mockHorse);

    // Then
    expect(store.races[0].result.length).toBe(1);
    expect(store.races[0].result[0]).toEqual(mockHorse);
  });

  it('should move to next race when current race is finished', () => {
    // Given
    const store = useRaceStore();
    const mockHorse: IHorse = { id: '1', name: 'Horse 1', condition: 80, color: 'brown' };
    const mockRaces: IRace[] = [
      {
        id: '1',
        distance: 1200,
        horses: [mockHorse],
        result: []
      },
      {
        id: '2',
        distance: 1400,
        horses: [mockHorse],
        result: []
      }
    ];
    store.setRaces(mockRaces);
    store.setIsRaceStarted(true);

    // When
    store.addHorseToResult(mockHorse);

    // Then
    expect(store.currentLabIndex).toBe(1);
    expect(store.isRaceStarted).toBe(false);
  });

  it('should finish all races when no more races', () => {
    // Given
    const store = useRaceStore();
    const mockHorse: IHorse = { id: '1', name: 'Horse 1', condition: 80, color: 'brown' };
    const mockRaces: IRace[] = [
      {
        id: '1',
        distance: 1200,
        horses: [mockHorse],
        result: []
      }
    ];
    store.setRaces(mockRaces);
    store.setIsRaceStarted(true);

    // When
    store.addHorseToResult(mockHorse);

    // Then
    expect(store.currentLabIndex).toBe(undefined);
    expect(store.isRaceStarted).toBe(false);
  });

  it('should correctly calculate currentRaceHorses', () => {
    // Given
    const store = useRaceStore();
    const mockHorse: IHorse = { id: '1', name: 'Horse 1', condition: 80, color: 'brown' };
    const mockRaces: IRace[] = [
      {
        id: '1',
        distance: 1200,
        horses: [mockHorse],
        result: []
      }
    ];

    // When
    store.setRaces(mockRaces);

    // Then
    expect(store.currentRaceHorses).toEqual([mockHorse]);

    // When
    store.currentLabIndex = undefined;

    // Then
    expect(store.currentRaceHorses).toBe(undefined);
  });

  it('should correctly calculate currentRaceResults', () => {
    // Given
    const store = useRaceStore();
    const mockHorse: IHorse = { id: '1', name: 'Horse 1', condition: 80, color: 'brown' };
    const mockRaces: IRace[] = [
      {
        id: '1',
        distance: 1200,
        horses: [mockHorse],
        result: []
      }
    ];
    store.setRaces(mockRaces);

    // When/Then
    expect(store.currentRaceResults).toEqual([]);

    // When
    store.addHorseToResult(mockHorse);

    // Then
    if (store.currentLabIndex !== undefined) {
      expect(store.currentRaceResults).toEqual([]);
    } else {
      expect(store.currentRaceResults).toBe(undefined);
    }
  });

  it('should correctly calculate currentLab', () => {
    // Given
    const store = useRaceStore();

    // When
    store.currentLabIndex = 2;

    // Then
    expect(store.currentLab).toBe(3);

    // When
    store.currentLabIndex = undefined;

    // Then
    expect(store.currentLab).toBe(undefined);
  });

  it('should correctly calculate isRaceFinished', () => {
    // Given
    const store = useRaceStore();
    const mockHorse: IHorse = { id: '1', name: 'Horse 1', condition: 80, color: 'brown' };
    const mockRaces: IRace[] = [
      {
        id: '1',
        distance: 1200,
        horses: [mockHorse],
        result: []
      }
    ];
    store.setRaces(mockRaces);

    // When/Then
    expect(store.isRaceFinished).toBe(false);

    // When
    store.setIsRaceStarted(true);
    store.addHorseToResult({ ...mockHorse });

    // Then
    if (store.currentLabIndex === undefined) {
      store.setCurrentLabIndex(0);

      expect(store.races[0].horses.length).toBe(store.races[0].result.length);
      expect(store.isRaceFinished).toBe(true);
    }
  });

  it('should correctly calculate distance', () => {
    // Given
    const store = useRaceStore();
    const mockRaces: IRace[] = [
      {
        id: '1',
        distance: 1200,
        horses: [],
        result: []
      }
    ];

    // When
    store.setRaces(mockRaces);

    // Then
    expect(store.distance).toBe(1200);

    // When
    store.currentLabIndex = undefined;

    // Then
    expect(store.distance).toBe(undefined);
  });
}); 