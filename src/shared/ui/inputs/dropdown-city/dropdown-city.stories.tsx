import type { Meta, StoryObj } from '@storybook/react-vite';

import { DropdownCity } from './dropdown-city';

const meta: Meta<typeof DropdownCity> = {
  title: 'Components/FormAtoms/DropdownCity',
  component: DropdownCity,
};

export default meta;

type Story = StoryObj<typeof DropdownCity>;

export const Default: Story = {
  args: {
    options: [
      { id: 1, name: 'Moscow' },
      { id: 2, name: 'Saint Petersburg' },
      { id: 3, name: 'Novosibirsk' },
      { id: 4, name: 'Yekaterinbur' },
      { id: 5, name: 'Nizhny Novgorod' },
      { id: 6, name: 'Kazan' },
      { id: 7, name: 'Chelyabinsk' },
      { id: 8, name: 'Omsk' },
    ],
    label: 'Input label',
    isValid: true,
    errorText: 'Неверный город',
  },
};
