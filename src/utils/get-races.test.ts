import type { IHorse } from '@/types/horse';
import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import GetRaces from './get-races';
import GetRandomHorses from './get-random-horses';

vi.mock('./get-random-horses', () => ({
  default: vi.fn().mockImplementation((horses, count) => {
    return horses.slice(0, count);
  })
}));

vi.mock('@faker-js/faker', () => ({
  faker: {
    string: {
      uuid: vi.fn().mockImplementation(() => 'mocked-race-uuid')
    }
  }
}));

describe('GetRaces', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate races with predefined distances', () => {
    // Given
    const horses: Array<IHorse> = [
      { id: '1', name: 'Horse 1', condition: 80, color: 'brown' },
      { id: '2', name: 'Horse 2', condition: 85, color: 'black' },
      { id: '3', name: 'Horse 3', condition: 90, color: 'white' }
    ];
    const count = 2;
    const expectedDistances = [1200, 1400, 1600, 1800, 2000, 2200];

    // When
    const races = GetRaces(horses, count);

    // Then
    expect(races).toHaveLength(expectedDistances.length);
    races.forEach((race, index) => {
      expect(race.distance).toBe(expectedDistances[index]);
    });
  });

  it('should call GetRandomHorses for each race with correct parameters', () => {
    // Given
    const horses: Array<IHorse> = [
      { id: '1', name: 'Horse 1', condition: 80, color: 'brown' },
      { id: '2', name: 'Horse 2', condition: 85, color: 'black' }
    ];
    const count = 2;

    // When
    GetRaces(horses, count);

    // Then
    expect(GetRandomHorses).toHaveBeenCalledTimes(6);
    expect(GetRandomHorses).toHaveBeenCalledWith(horses, count);
  });

  it('should generate unique race IDs using faker', () => {
    // Given
    const horses: Array<IHorse> = [
      { id: '1', name: 'Horse 1', condition: 80, color: 'brown' }
    ];
    const count = 1;

    vi.mocked(faker.string.uuid)
      .mockReturnValueOnce('race-id-1')
      .mockReturnValueOnce('race-id-2')
      .mockReturnValueOnce('race-id-3')
      .mockReturnValueOnce('race-id-4')
      .mockReturnValueOnce('race-id-5')
      .mockReturnValueOnce('race-id-6');

    // When
    const races = GetRaces(horses, count);

    // Then
    expect(faker.string.uuid).toHaveBeenCalledTimes(6);
    expect(races[0].id).toBe('race-id-1');
    expect(races[1].id).toBe('race-id-2');
    expect(races[5].id).toBe('race-id-6');
  });

  it('should initialize races with empty result arrays', () => {
    // Given
    const horses: Array<IHorse> = [
      { id: '1', name: 'Horse 1', condition: 80, color: 'brown' }
    ];
    const count = 1;

    // When
    const races = GetRaces(horses, count);

    // Then
    races.forEach(race => {
      expect(race.result).toEqual([]);
    });
  });

  it('should create the correct race structure', () => {
    // Given
    const horses: Array<IHorse> = [
      { id: '1', name: 'Horse 1', condition: 80, color: 'brown' }
    ];
    const count = 1;
    vi.mocked(faker.string.uuid).mockReturnValue('test-race-id');

    // When
    const races = GetRaces(horses, count);

    // Then
    expect(races[0]).toEqual({
      id: 'test-race-id',
      distance: 1200,
      horses: horses.slice(0, count),
      result: []
    });
  });
}); 