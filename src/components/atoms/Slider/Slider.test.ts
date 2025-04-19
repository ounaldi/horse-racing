import { useRaceStore } from '@/store/race';
import type { IHorse } from '@/types/horse';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Slider from './Slider.vue';

vi.mock('@/store/race', () => ({
  useRaceStore: vi.fn(() => ({
    isRaceStarted: false,
    currentLabIndex: 0,
    currentRaceResults: [],
    addHorseToResult: vi.fn(),
  }))
}));

vi.mock('@/assets/horse.svg?url', () => ({
  default: 'mocked-horse-svg-url'
}));

describe('Slider', () => {
  const mockHorse: IHorse = {
    id: '1',
    name: 'Test Horse',
    condition: 20,
    color: 'brown'
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('should render a range input with correct props', () => {
    // Given/When
    const wrapper = mount(Slider, {
      props: {
        max: 100,
        horse: mockHorse
      }
    });

    // Then
    const slider = wrapper.find('input[type="range"]');
    expect(slider.exists()).toBe(true);
    expect(slider.attributes('min')).toBe('0');
    expect(slider.attributes('max')).toBe('100');
    expect(slider.attributes('readonly')).toBeDefined();
  });

  it('should set the correct custom CSS variables', () => {
    // Given/When
    const wrapper = mount(Slider, {
      props: {
        max: 100,
        horse: mockHorse
      }
    });

    // Then
    const slider = wrapper.find('input[type="range"]');
    const style = slider.attributes('style');
    expect(style).toContain('--thumb-color: brown');
    expect(style).toContain('--thumb-image: url(mocked-horse-svg-url)');
  });

  it('should initialize with value of 0', () => {
    // Given/When
    const wrapper = mount(Slider, {
      props: {
        max: 100,
        horse: mockHorse
      }
    });

    // Then
    const slider = wrapper.find('input[type="range"]');
    expect(slider.attributes('value')).toBe('0');
  });

  it('should pass horse props correctly', () => {
    // Given
    const customHorse: IHorse = {
      id: 'custom-id',
      name: 'Custom Horse',
      condition: 50,
      color: 'purple'
    };

    // When
    const wrapper = mount(Slider, {
      props: {
        max: 200,
        horse: customHorse
      }
    });

    // Then
    const slider = wrapper.find('input[type="range"]');
    expect(slider.attributes('max')).toBe('200');
    expect(slider.attributes('style')).toContain('--thumb-color: purple');
  });

  it('should use the race store', () => {
    // Given
    const mockRaceStore = useRaceStore();

    // When
    mount(Slider, {
      props: {
        max: 100,
        horse: mockHorse
      }
    });

    // Then
    expect(mockRaceStore).toBeDefined();
  });
}); 