import { describe, test, expect } from '@jest/globals';
import { render, fireEvent, waitFor } from '@testing-library/react';
import React, { useState } from 'react';

import { useDebounce } from '@hooks/useDebounce';

const initialValue = 'initial';
const nextValue = 'next';

const ParamSearch = () => {
  const [value, setValue] = useState(initialValue);
  const debounceValue = useDebounce(value, 1000);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <>
      <input data-testid="search" value={value} onChange={handleSearch} />
      <div data-testid="value">{debounceValue}</div>
    </>
  );
};
describe('Проверка работы useDebounce', () => {
  test('Проверка изменения значения через 1000ms', async () => {
    // Включим работу таймера
    jest.useFakeTimers();

    // Отрендерим компонент и получим DOM-элементы.
    const { getByTestId } = render(<ParamSearch />);
    const input = getByTestId('search');
    const value = getByTestId('value');

    // Изменим значение инпута и проверим, что debounce значение не изменилось.
    fireEvent.change(input, { target: { value: nextValue } });
    expect(value.textContent).toBe(initialValue);

    // Подождем 1000ms и проверим, что debounce значение изменилось.
    await waitFor(
      () => {
        expect(value.textContent).toBe(nextValue);
      },
      { timeout: 1001 }
    );
  });
});
