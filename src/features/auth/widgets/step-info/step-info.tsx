import React, { memo } from 'react';

import { StepInfoProps } from './types';

import { StepInfoUI } from '@features/auth/ui/widgets';
import lightBulb from '@assets/img/light-bulb.svg';
import userInfo from '@assets/img/user-info.svg';
import schoolBoard from '@assets/img/school-board.svg';

export const StepInfo: React.FC<StepInfoProps> = memo(({ step }) => {
  if (!step) {
    return null;
  }
  let image: string;
  let title: string;
  let description: string;
  switch (step) {
    case 1:
      image = lightBulb;
      title = 'Добро пожаловать в SkillSwap!';
      description =
        'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми';
      break;
    case 2:
      image = userInfo;
      title = 'Расскажите немного о себе';
      description =
        'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена';
      break;
    default:
      image = schoolBoard;
      title = 'Укажите, чем вы готовы поделиться';
      description =
        'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!';
  }
  return <StepInfoUI image={image} title={title} description={description} />;
});
