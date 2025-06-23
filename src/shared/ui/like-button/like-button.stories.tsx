import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { LikeButtonUI } from './like-button';

const meta: Meta<typeof LikeButtonUI> = {
  title: 'Components/LikeButtonUI',
  component: LikeButtonUI,
  tags: ['autodocs'],
  argTypes: {
    initialLiked: {
      control: { type: 'boolean' },
      description: 'Начальное состояние кнопки (лайкнута/не лайкнута)',
    },
    onLikeToggle: {
      action: 'likeToggled',
      description: 'Callback, вызываемый при изменении состояния лайка',
    },
  },
  args: {
    initialLiked: false,
    onLikeToggle: fn(),
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof LikeButtonUI>;

export const Default: Story = {
  args: {
    initialLiked: false,
  },
};
