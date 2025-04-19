import { useRaceStore } from '@/store/race';
import type { IRace } from '@/types/race';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import RankingList from './RankingList.vue';

vi.mock('@/components/atoms/Table/Table.vue', () => ({
  default: {
    name: 'Table',
    props: ['data'],
    template: '<div data-test="mocked-table">{{ JSON.stringify(data) }}</div>'
  }
}));

describe('RankingList.vue', () => {
  let raceStore: ReturnType<typeof useRaceStore>;
  const mockRaces: IRace[] = [
    {
      id: '1',
      distance: 1000,
      horses: [
        { id: 'h1', name: 'Horse 1', condition: 80, color: 'brown' },
        { id: 'h2', name: 'Horse 2', condition: 90, color: 'white' }
      ],
      result: []
    },
    {
      id: '2',
      distance: 1500,
      horses: [
        { id: 'h3', name: 'Horse 3', condition: 85, color: 'black' },
        { id: 'h4', name: 'Horse 4', condition: 75, color: 'gray' }
      ],
      result: [
        { id: 'h3', name: 'Horse 3', condition: 85, color: 'black' },
        { id: 'h4', name: 'Horse 4', condition: 75, color: 'gray' }
      ]
    }
  ];

  beforeEach(() => {
    setActivePinia(createPinia());
    raceStore = useRaceStore();
    raceStore.races = mockRaces;
  });

  it('should render the title correctly', () => {
    // Given
    const wrapper = mount(RankingList, {
      props: {
        title: 'Test Ranking',
        operation: 'List'
      }
    });

    // When/Then
    expect(wrapper.find('.title').text()).toBe('Test Ranking');
  });

  it('should render races with correct distances', () => {
    // Given
    const wrapper = mount(RankingList, {
      props: {
        title: 'Test Ranking',
        operation: 'List'
      }
    });

    // When
    const distances = wrapper.findAll('.distance p');

    // Then
    expect(distances.length).toBe(2);
    expect(distances[0].text()).toBe('1. Lab 1000');
    expect(distances[1].text()).toBe('2. Lab 1500');
  });

  it('should pass correct data to Table component when operation is List', () => {
    // Given
    const wrapper = mount(RankingList, {
      props: {
        title: 'Test Ranking',
        operation: 'List'
      }
    });

    // When
    const tables = wrapper.findAll('[data-test="mocked-table"]');

    // Then
    expect(tables.length).toBe(2);

    const firstTableData = JSON.parse(tables[0].text());
    expect(firstTableData).toEqual([
      { position: 1, name: 'Horse 1' },
      { position: 2, name: 'Horse 2' }
    ]);

    const secondTableData = JSON.parse(tables[1].text());
    expect(secondTableData).toEqual([
      { position: 1, name: 'Horse 3' },
      { position: 2, name: 'Horse 4' }
    ]);
  });

  it('should pass correct data to Table component when operation is Result', () => {
    // Given
    const wrapper = mount(RankingList, {
      props: {
        title: 'Test Results',
        operation: 'Result'
      }
    });

    // When
    const tables = wrapper.findAll('[data-test="mocked-table"]');

    // Then
    expect(tables.length).toBe(2);

    const firstTableData = JSON.parse(tables[0].text());
    expect(firstTableData).toEqual([]);

    const secondTableData = JSON.parse(tables[1].text());
    expect(secondTableData).toEqual([
      { position: 1, name: 'Horse 3' },
      { position: 2, name: 'Horse 4' }
    ]);
  });

  it('should handle empty race data gracefully', () => {
    // Given
    raceStore.races = [];
    const wrapper = mount(RankingList, {
      props: {
        title: 'Empty Ranking',
        operation: 'List'
      }
    });

    // When/Then
    expect(wrapper.findAll('.distance').length).toBe(0);
    expect(wrapper.findAll('[data-test="mocked-table"]').length).toBe(0);
  });
}); 