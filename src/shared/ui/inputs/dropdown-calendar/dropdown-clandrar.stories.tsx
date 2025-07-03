import type { Meta, StoryObj } from '@storybook/react-vite';

import { DropdownCalendar } from './dropdown-calendar';

const meta: Meta<typeof DropdownCalendar> = {
  title: 'Components/FormAtoms/DropdownCalendar',
  component: DropdownCalendar,
};

export default meta;

type Story = StoryObj<typeof DropdownCalendar>;

export const Default: Story = {
  args: {
    label: 'Дата рождения',
    isValid: true,
    errorText: 'Не выбрана дата',
  },
};
