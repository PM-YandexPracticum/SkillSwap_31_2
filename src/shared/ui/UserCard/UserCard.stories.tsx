import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import users from '../../../../public/db/users.json';
import skills from '../../../../public/db/skills.json';

import { UserCard } from './UserCard';

interface Skill {
  id: number;
  name: string;
  category_id: number;
}

interface User {
  name: string;
  avatar_url: string;
  city: string;
  age: number;
  skills_ids: number[];
  wishes_ids: number[];
}

const meta: Meta<typeof UserCard> = {
  title: 'shared/UserCard',
  component: UserCard,
};

export default meta;

const user: User = users[11];
const skillList: Skill[] = skills;

const resolveSkills = (ids: number[]) =>
  ids
    .map((id: number) => {
      const skill = skillList.find((s) => s.id === id);
      return skill ? { name: skill.name, categoryId: skill.category_id } : null;
    })
    .filter((s): s is { name: string; categoryId: number } => s !== null);

export const FromJson: StoryObj<typeof UserCard> = {
  render: () => (
    <UserCard
      avatarUrl={user.avatar_url}
      name={user.name}
      city={user.city}
      age={user.age}
      skillsToTeach={resolveSkills(user.skills_ids)}
      wishesIds={user.wishes_ids}
    />
  ),
};
