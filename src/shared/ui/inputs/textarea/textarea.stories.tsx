import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/FormAtoms/textarea',
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: 'Input label',
    placeholder: 'Input placeholder',
    isValid: true,
    errorText: 'Неверный ввод',
    onChange: fn(),
  },
};
