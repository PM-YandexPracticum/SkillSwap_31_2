import type { Meta, StoryObj } from '@storybook/react-vite';

import { SkillCard } from './SkillCard';

const meta: Meta<typeof SkillCard> = {
  title: 'Components/SkillCard',
  component: SkillCard,
};

export default meta;

type Story = StoryObj<typeof SkillCard>;

export const Default: Story = {
  args: {
    name: 'Иван',
    city: 'Санкт-Петербург',
    age: 34,
    avatar_url: 'https://i.pravatar.cc/100?u=ivan',
    skills: [{ text: 'Игра на барабанах', color: '#f7e7f2' }],
    wishes: [
      { text: 'Тайм-менеджмент', color: '#e7f2f6' },
      { text: 'Медитация', color: '#e9f7e7' },
      { text: 'Тайм-менеджмент', color: '#e7f2f6' },
      { text: 'Медитация', color: '#e9f7e7' },
    ],
  },
};
