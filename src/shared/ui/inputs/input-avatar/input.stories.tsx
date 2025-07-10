import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { InputAvatar } from './input-avatar';

const meta: Meta<typeof InputAvatar> = {
  title: 'Components/FormAtoms/AvatarInput',
  component: InputAvatar,
};

export default meta;

type Story = StoryObj<typeof InputAvatar>;

export const Default: Story = {
  args: {
    isValid: true,
    onChange: fn(),
  },
};
