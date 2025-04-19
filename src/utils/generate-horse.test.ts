import { faker } from '@faker-js/faker';
import { describe, expect, it, vi } from 'vitest';
import GenerateHorseName from './generate-horse';

vi.mock('@faker-js/faker', () => {
  return {
    faker: {
      string: {
        uuid: vi.fn().mockReturnValue('mocked-uuid')
      },
      animal: {
        horse: vi.fn().mockReturnValue('Mocked Horse')
      },
      number: {
        int: vi.fn().mockReturnValue(75)
      },
      color: {
        human: vi.fn().mockReturnValue('mocked-color')
      },
      helpers: {
        uniqueArray: vi.fn().mockImplementation((fn, count) => {
          const results = [];
          for (let i = 0; i < count; i++) {
            results.push(fn());
          }
          return results;
        })
      }
    }
  };
});

describe('GenerateHorseName', () => {
  it('should generate the specified number of horses', () => {
    // Given
    const count = 3;

    // When
    const result = GenerateHorseName(count);

    // Then
    expect(result).toHaveLength(count);
  });

  it('should generate horses with the expected properties', () => {
    // Given
    const count = 1;

    // When
    const result = GenerateHorseName(count);

    // Then
    const horse = result[0];
    expect(horse).toHaveProperty('id', 'mocked-uuid');
    expect(horse).toHaveProperty('name', 'Mocked Horse');
    expect(horse).toHaveProperty('condition', 75);
    expect(horse).toHaveProperty('color', 'mocked-color');
  });

  it('should call faker.helpers.uniqueArray for names and colors', () => {
    // Given
    const count = 5;

    // When
    GenerateHorseName(count);

    // Then
    expect(faker.helpers.uniqueArray).toHaveBeenCalledWith(
      faker.animal.horse,
      count
    );
    expect(faker.helpers.uniqueArray).toHaveBeenCalledWith(
      faker.color.human,
      count
    );
  });

  it('should generate unique horses even with the same input count', () => {
    // Given
    const mockUuid = vi.fn()
      .mockReturnValueOnce('uuid-1')
      .mockReturnValueOnce('uuid-2')
      .mockReturnValueOnce('uuid-3');

    const mockHorseName = vi.fn()
      .mockReturnValueOnce('Horse A')
      .mockReturnValueOnce('Horse B')
      .mockReturnValueOnce('Horse C');

    vi.mocked(faker.string.uuid).mockImplementation(mockUuid);
    vi.mocked(faker.animal.horse).mockImplementation(mockHorseName);

    // When
    const result = GenerateHorseName(3);

    // Then
    expect(result[0].id).toBe('uuid-1');
    expect(result[0].name).toBe('Horse A');
    expect(result[1].id).toBe('uuid-2');
    expect(result[1].name).toBe('Horse B');
    expect(result[2].id).toBe('uuid-3');
    expect(result[2].name).toBe('Horse C');
  });
}); 