import { useRaceStore } from '@/store/race';
import type { IHorse } from '@/types/horse';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Line from './Line.vue';

vi.mock('@/components/atoms/Start/Start.vue', () => ({
  default: {
    name: 'Start',
    props: ['index'],
    template: '<div data-test="start" :data-index="index">Start</div>'
  }
}));

vi.mock('@/components/atoms/Slider/Slider.vue', () => ({
  default: {
    name: 'Slider',
    props: ['horse', 'max', 'color'],
    template: '<div data-test="slider" :data-horse-id="horse.id" :data-max="max" :data-color="color">Slider</div>'
  }
}));

vi.mock('@/components/atoms/Finish/Finish.vue', () => ({
  default: {
    name: 'Finish',
    template: '<div data-test="finish">Finish</div>'
  }
}));

describe('Line.vue', () => {
  let raceStore: ReturnType<typeof useRaceStore>;
  const mockHorse: IHorse = {
    id: 'horse1',
    name: 'Test Horse',
    condition: 85,
    color: 'blue'
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    raceStore = useRaceStore();
    vi.spyOn(raceStore, 'distance', 'get').mockReturnValue(1000);
  });

  it('should render all components correctly', () => {
    // Given/When
    const wrapper = mount(Line, {
      props: {
        horse: mockHorse,
        index: 3
      }
    });

    // Then
    expect(wrapper.find('[data-test="start"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="slider"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="finish"]').exists()).toBe(true);
  });

  it('should pass correct props to Start component', () => {
    // Given/When
    const wrapper = mount(Line, {
      props: {
        horse: mockHorse,
        index: 3
      }
    });

    // Then
    const startComponent = wrapper.find('[data-test="start"]');
    expect(startComponent.attributes('data-index')).toBe('3');
  });

  it('should pass correct props to Slider component', () => {
    // Given/When
    const wrapper = mount(Line, {
      props: {
        horse: mockHorse,
        index: 3
      }
    });

    // Then
    const sliderComponent = wrapper.find('[data-test="slider"]');
    expect(sliderComponent.attributes('data-horse-id')).toBe('horse1');
    expect(sliderComponent.attributes('data-max')).toBe('1000');
    expect(sliderComponent.attributes('data-color')).toBe('blue');
  });

  it('should use the race distance from store', () => {
    // Given
    vi.spyOn(raceStore, 'distance', 'get').mockReturnValue(2000);

    // When
    const wrapper = mount(Line, {
      props: {
        horse: mockHorse,
        index: 3
      }
    });

    // Then
    const sliderComponent = wrapper.find('[data-test="slider"]');
    expect(sliderComponent.attributes('data-max')).toBe('2000');
  });

  it('should handle fallback when race distance is undefined', () => {
    // Given
    vi.spyOn(raceStore, 'distance', 'get').mockReturnValue(undefined);

    // When
    const wrapper = mount(Line, {
      props: {
        horse: mockHorse,
        index: 3
      }
    });

    // Then
    const sliderComponent = wrapper.find('[data-test="slider"]');
    expect(sliderComponent.attributes('data-max')).toBe('0');
  });
}); 