import React from 'react';

import { SkillCard as SkillCardUI } from '@ui/SkillCard';
import { TSkill } from '@app/entities/skills';
import type { SkillTagUIProps } from '@ui/skillTag/type';

interface SkillCardProps {
  name: string | undefined;
  city: string | undefined;
  age: number | undefined;
  avatar_url: string | undefined;
  skills: TSkill[];
  wishes: TSkill[];
}

export const SkillCard: React.FC<SkillCardProps> = ({
  name,
  city,
  age,
  avatar_url,
  skills,
  wishes,
}) => {
  const wishList: SkillTagUIProps[] = [];
  const skillList: SkillTagUIProps[] = [];

  // TODO: Change skills to categories.
  skills.forEach((skill) => {
    skillList.push({
      text: skill.name,
      color: '',
    });
  });
  wishes.forEach((skill) => {
    wishList.push({
      text: skill.name,
      color: '',
    });
  });

  return (
    <SkillCardUI
      name={name}
      city={city}
      age={age}
      avatar_url={avatar_url}
      skills={skillList}
      wishes={wishList}
    />
  );
};
