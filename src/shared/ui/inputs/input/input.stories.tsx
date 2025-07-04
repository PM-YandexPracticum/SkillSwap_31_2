import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Components/FormAtoms/Input',
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Input label',
    placeholder: 'Input placeholder',
    isValid: true,
    errorText: 'Неверный ввод',
    onChange: fn(),
  },
};
