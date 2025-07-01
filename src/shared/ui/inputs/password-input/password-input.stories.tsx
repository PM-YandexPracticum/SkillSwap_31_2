import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { PasswordInput } from './password-input';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/FormAtoms/PasswordInput',
  component: PasswordInput,
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    label: 'Input label',
    placeholder: 'Input placeholder',
    isValid: true,
    errorText: 'Неверный пароль',
    onChange: fn(),
  },
};
