import type { Meta, StoryObj } from '@storybook/react-vite';

import { DropdownSkill } from './dropdown-skill';

const meta: Meta<typeof DropdownSkill> = {
  title: 'Components/FormAtoms/DropdownSkill',
  component: DropdownSkill,
};

export default meta;

type Story = StoryObj<typeof DropdownSkill>;

export const Default: Story = {
  args: {
    options: [
      { id: '1', name: 'DIY' },
      { id: '2', name: 'Дом и сад' },
      { id: '3', name: 'Кулинария' },
      { id: '4', name: 'Искусство и ремесло' },
      { id: '5', name: 'Музыка' },
      { id: '6', name: 'Языки' },
      { id: '7', name: 'Программирование' },
      { id: '8', name: 'Фотография' },
    ],
    label: 'Input label',
    isValid: true,
    errorText: 'Не выбрана категория',
    placeholder: 'Выберите категорию',
  },
};
