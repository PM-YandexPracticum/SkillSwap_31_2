import type { Meta, StoryObj } from '@storybook/react-vite';

import { UserCard } from './UserCard';

const meta: Meta<typeof UserCard> = {
  title: 'Components/UserCard',
  component: UserCard,
};

export default meta;

type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    name: 'Иван',
    city: 'Санкт-Петербург',
    age: 34,
    avatar_url: 'https://i.pravatar.cc/100?u=ivan',
    skills: [{ name: 'Игра на барабанах', color: '#f7e7f2' }],
    wishes: [
      { name: 'Тайм-менеджмент', color: '#e7f2f6' },
      { name: 'Медитация', color: '#e9f7e7' },
      { name: 'Тайм-менеджмент', color: '#e7f2f6' },
      { name: 'Медитация', color: '#e9f7e7' },
    ],
  },
};
