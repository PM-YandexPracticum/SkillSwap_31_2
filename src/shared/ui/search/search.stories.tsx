import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchUI } from './search';
import { SearchUIProps } from './type';


const meta: Meta<typeof SearchUI> = {
  title: 'Components/SearchUI',
  component: SearchUI,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Текущее значение поисковой строки',
    },
    placeholder: {
      control: 'text',
      description: 'Плейсхолдер для поля ввода',
    },
    onChange: {
      action: 'changed',
      description: 'Обработчик изменения значения',
    },
    onClear: {
      action: 'cleared',
      description: 'Обработчик очистки поля',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchUI>;

const InteractiveSearchUI = (props: Omit<SearchUIProps, 'value' | 'onChange' | 'onClear'>) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
  };

  return (
    <SearchUI
      {...props}
      value={value}
      onChange={handleChange}
      onClear={handleClear}
    />
  );
};

export const InteractiveExample: Story = {
  render: (args) => <InteractiveSearchUI {...args} />,
  args: {
    placeholder: 'Введите текст...',
  },
};

export const WithLongText: Story = {
  args: {
    value: 'Очень длинный текст поискового запроса, который не помещается в поле',
    placeholder: 'Искать навык',
  },
};
