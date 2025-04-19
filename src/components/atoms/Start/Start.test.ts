import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import Start from './Start.vue';

describe('Start', () => {
  it('should render a div with the correct class', () => {
    // Given/When
    const wrapper = mount(Start, {
      props: {
        index: 1
      }
    });

    // Then
    const startLine = wrapper.find('div');
    expect(startLine.exists()).toBe(true);
    expect(startLine.classes()).toContain('start-line');
  });

  it('should display the provided index prop', () => {
    // Given
    const index = 3;

    // When
    const wrapper = mount(Start, {
      props: {
        index
      }
    });

    // Then
    expect(wrapper.text()).toBe(index.toString());
    expect(wrapper.find('p').text()).toBe(index.toString());
  });

  it('should have a required index prop', () => {
    // Given
    const originalConsoleError = console.error;
    console.error = vi.fn();

    // When
    const wrapper = mount(Start, {
      props: {
        index: 1
      }
    });

    // Then
    const propDef = wrapper.vm.$options.props.index;
    expect(propDef).toBeDefined();
    expect(propDef.required).toBe(true);

    console.error = originalConsoleError;
  });

  it('should render with the correct structure', () => {
    // Given/When
    const wrapper = mount(Start, {
      props: {
        index: 1
      }
    });

    // Then
    const div = wrapper.find('div');
    expect(div.exists()).toBe(true);

    const paragraph = wrapper.find('p');
    expect(paragraph.exists()).toBe(true);

    expect(div.find('p').exists()).toBe(true);
  });

  it('should accept a numeric index prop', () => {
    // Given/When
    const wrapper = mount(Start, {
      props: {
        index: 5
      }
    });

    // Then
    expect(wrapper.props().index).toBe(5);
    expect(typeof wrapper.props().index).toBe('number');
  });
}); 