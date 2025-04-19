import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Finish from './Finish.vue';

describe('Finish', () => {
  it('should render a div with the correct class', () => {
    // Given/When
    const wrapper = mount(Finish);

    // Then
    const finishLine = wrapper.find('div');
    expect(finishLine.exists()).toBe(true);
    expect(finishLine.classes()).toContain('finish-line');
  });

  it('should not accept props', () => {
    // Given/When
    const wrapper = mount(Finish);

    // Then
    expect(wrapper.props()).toEqual({});
  });

  it('should render with the correct structure', () => {
    // Given/When
    const wrapper = mount(Finish);

    // Then
    const divElements = wrapper.findAll('div');
    expect(divElements.length).toBe(1);

    expect(wrapper.findAll('*').length).toBe(1);
  });

  it('should render without any content inside the div', () => {
    // Given/When
    const wrapper = mount(Finish);

    // Then
    expect(wrapper.text()).toBe('');
  });

  it('should apply scoped styling', () => {
    // Given/When
    const wrapper = mount(Finish);

    // Then
    expect(wrapper.find('.finish-line').exists()).toBe(true);
  });
}); 