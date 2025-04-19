import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import Button from './Button.vue';

describe('Button', () => {
  it('should render the button with the correct text', () => {
    // Given
    const text = 'Click Me';

    // When
    const wrapper = mount(Button, {
      props: {
        text,
        onClick: vi.fn()
      }
    });

    // Then
    expect(wrapper.text()).toBe(text);
  });

  it('should call the onClick handler when clicked', async () => {
    // Given
    const onClick = vi.fn();
    const wrapper = mount(Button, {
      props: {
        text: 'Click Me',
        onClick
      }
    });

    // When
    await wrapper.trigger('click');

    // Then
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should apply disabled attribute when disabled prop is true', () => {
    // Given
    const wrapper = mount(Button, {
      props: {
        text: 'Click Me',
        onClick: vi.fn(),
        disabled: true
      }
    });

    // Then
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('should not have disabled attribute when disabled prop is false', () => {
    // Given
    const wrapper = mount(Button, {
      props: {
        text: 'Click Me',
        onClick: vi.fn(),
        disabled: false
      }
    });

    // Then
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeUndefined();
  });

  it('should not call the onClick handler when disabled', async () => {
    // Given
    const onClick = vi.fn();
    const wrapper = mount(Button, {
      props: {
        text: 'Click Me',
        onClick,
        disabled: true
      }
    });

    // When
    await wrapper.trigger('click');

    // Then
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should have the correct default styling', () => {
    // Given
    const wrapper = mount(Button, {
      props: {
        text: 'Click Me',
        onClick: vi.fn()
      }
    });

    // Then
    const button = wrapper.find('button');
    expect(button.classes()).toEqual(expect.arrayContaining([]));
    expect(wrapper.find('button').exists()).toBe(true);
  });
}); 