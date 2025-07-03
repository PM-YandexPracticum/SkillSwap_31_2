import type { Meta, StoryObj } from '@storybook/react-vite';

import { DropdownGender } from './dropdown-gender';

const meta: Meta<typeof DropdownGender> = {
  title: 'Components/FormAtoms/DropdownGender',
  component: DropdownGender,
};

export default meta;

type Story = StoryObj<typeof DropdownGender>;

export const Default: Story = {
  args: {
    label: 'Input label',
    isValid: true,
    errorText: 'Не выбран пол',
  },
};
