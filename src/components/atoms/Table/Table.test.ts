import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Table from './Table.vue';

describe('Table', () => {
  it('should render a table element', () => {
    // Given
    const data = [
      { id: '1', name: 'John', age: 30 },
      { id: '2', name: 'Jane', age: 25 }
    ];

    // When
    const wrapper = mount(Table, {
      props: {
        data
      }
    });

    // Then
    expect(wrapper.find('table').exists()).toBe(true);
  });

  it('should render table headers based on data keys (excluding id)', () => {
    // Given
    const data = [
      { id: '1', name: 'John', age: 30 },
      { id: '2', name: 'Jane', age: 25 }
    ];

    // When
    const wrapper = mount(Table, {
      props: {
        data
      }
    });

    // Then
    const headers = wrapper.findAll('th');
    expect(headers.length).toBe(2);
    expect(headers[0].text()).toBe('name');
    expect(headers[1].text()).toBe('age');
  });

  it('should render table rows based on data items', () => {
    // Given
    const data = [
      { id: '1', name: 'John', age: 30 },
      { id: '2', name: 'Jane', age: 25 }
    ];

    // When
    const wrapper = mount(Table, {
      props: {
        data
      }
    });

    // Then
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);

    const firstRowCells = rows[0].findAll('td');
    expect(firstRowCells.length).toBe(2);
    expect(firstRowCells[0].text()).toBe('John');
    expect(firstRowCells[1].text()).toBe('30');

    const secondRowCells = rows[1].findAll('td');
    expect(secondRowCells.length).toBe(2);
    expect(secondRowCells[0].text()).toBe('Jane');
    expect(secondRowCells[1].text()).toBe('25');
  });

  it('should handle empty data array', () => {
    // Given
    const data: any[] = [];

    // When
    const wrapper = mount(Table, {
      props: {
        data
      }
    });

    // Then
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.findAll('th').length).toBe(0);
    expect(wrapper.findAll('tbody tr').length).toBe(0);
  });

  it('should handle data with different object structures', () => {
    // Given
    const data = [
      { id: '1', name: 'John', role: 'Developer' },
      { id: '2', name: 'Jane', department: 'HR' }
    ];

    // When
    const wrapper = mount(Table, {
      props: {
        data
      }
    });

    // Then
    const headers = wrapper.findAll('th');
    expect(headers.length).toBe(2);
    expect(headers[0].text()).toBe('name');
    expect(headers[1].text()).toBe('role');

    const secondRowCells = wrapper.findAll('tbody tr')[1].findAll('td');
    expect(secondRowCells[1].text()).toBe('');
  });
}); 