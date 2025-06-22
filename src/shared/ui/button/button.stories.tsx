import type { Meta, StoryObj } from '@storybook/react';
import { ButtonUI } from './button';
import { fn } from 'storybook/test';

const meta: Meta<typeof ButtonUI> = {
  title: 'Components/ButtonUI',
  component: ButtonUI,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['Primary', 'Secondary', 'Tertiary'],
    },
    hmtlType: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onClick: { action: 'clicked' },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ButtonUI>;

export const Primary: Story = {
  args: {
    type: 'Primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    type: 'Secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    type: 'Tertiary',
    children: 'Tertiary Button',
  },
};

export const Disabled: Story = {
  args: {
    type: 'Primary',
    children: 'Disabled Button',
    disabled: true,
  },
};

export const SubmitButton: Story = {
  args: {
    type: 'Primary',
    children: 'Submit Button',
    hmtlType: 'submit',
  },
};