import type { Meta, StoryObj } from '@storybook/react';
import { SkillTagUI } from './skillTag';
import { SkillTagUIProps } from './type';

const meta: Meta<typeof SkillTagUI> = {
  title: 'Components/SkillTagUI',
  component: SkillTagUI,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
      description: 'Background color of the tag'
    },
    text: {
      control: 'text',
      description: 'Tag display text'
    }
  }
};

export default meta;

const Template: StoryObj<SkillTagUIProps> = {
  render: (args) => <SkillTagUI {...args} />
};

export const English: StoryObj<SkillTagUIProps> = {
  ...Template,
  args: {
    text: 'Английский язык',
    color: '#EBE5C5'
  }
};

export const TimeManagment: StoryObj<SkillTagUIProps> = {
  args: {
    text: 'Тайм менеджмент',
    color: '#E7F2F6'
  }
};

export const Rest: StoryObj<SkillTagUIProps> = {
  args: {
    text: 'Реставрация мебели',
    color: '#F7EBE5'
  }
};
