import { useBenchStore } from '@/store/bench';
import { useRaceStore } from '@/store/race';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Header from './Header.vue';

vi.mock('@/utils/generate-horse.ts', () => ({
  default: vi.fn().mockImplementation((count) =>
    Array.from({ length: count }, (_, i) => ({
      id: `horse-${i}`,
      name: `Test Horse ${i}`,
      condition: 50,
      color: 'brown'
    }))
  )
}));

vi.mock('@/utils/get-races', () => ({
  default: vi.fn().mockImplementation((bench, count) =>
    Array.from({ length: 6 }, (_, i) => ({
      id: `race-${i}`,
      distance: 1000 + (i * 200),
      horses: bench.slice(0, count),
      result: []
    }))
  )
}));

vi.mock('@/components/atoms/Button/Button.vue', () => ({
  default: {
    name: 'Button',
    props: ['text'],
    template: '<button :data-test="text">{{ text }}</button>'
  }
}));

describe('Header.vue', () => {
  let benchStore: ReturnType<typeof useBenchStore>;
  let raceStore: ReturnType<typeof useRaceStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    benchStore = useBenchStore();
    raceStore = useRaceStore();

    vi.spyOn(benchStore, 'setHorses');
    vi.spyOn(raceStore, 'setRaces');
    vi.spyOn(raceStore, 'setCurrentLabIndex');
    vi.spyOn(raceStore, 'setIsRaceStarted');
  });

  it('should render the component with two buttons', () => {
    // Given/When
    const wrapper = mount(Header);

    // Then
    const generateButton = wrapper.find('[data-test="Generate Random"]');
    const startPauseButton = wrapper.find('[data-test="Start / Pause"]');

    expect(generateButton.exists()).toBe(true);
    expect(startPauseButton.exists()).toBe(true);
  });

  it('should generate random horses and races when Generate Random button is clicked', async () => {
    // Given
    const wrapper = mount(Header);
    const generateButton = wrapper.find('[data-test="Generate Random"]');

    // When
    await generateButton.trigger('click');

    // Then
    expect(benchStore.setHorses).toHaveBeenCalled();
    expect(raceStore.setRaces).toHaveBeenCalled();
    expect(raceStore.setCurrentLabIndex).toHaveBeenCalledWith(0);

    expect(benchStore.setHorses).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        condition: expect.any(Number),
        color: expect.any(String)
      })
    ]));
  });

  it('should toggle race state when Start / Pause button is clicked', async () => {
    // Given
    raceStore.isRaceStarted = false;

    const wrapper = mount(Header);
    const startPauseButton = wrapper.find('[data-test="Start / Pause"]');

    // When
    await startPauseButton.trigger('click');

    // Then
    expect(raceStore.setIsRaceStarted).toHaveBeenCalledWith(true);

    // Given
    raceStore.isRaceStarted = true;

    // When
    await startPauseButton.trigger('click');

    // Then
    expect(raceStore.setIsRaceStarted).toHaveBeenCalledWith(false);
  });
}); 