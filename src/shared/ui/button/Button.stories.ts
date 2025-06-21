import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'SkillSwap/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    mode: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Primary Default',
    mode: 'primary',
  },
};
export const Secondary: Story = {
  args: {
    label: 'Button',
    mode: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    label: 'Button',
    mode: 'tertiary',
  },
};
