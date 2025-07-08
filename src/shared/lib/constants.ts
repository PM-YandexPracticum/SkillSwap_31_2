import { TRadioList } from '../ui/radio-filter/type';

export const saltRounds = 12;

export const skillListTypes = {
  popular: { title: 'Популярное', size: 3 },
  new: { title: 'Новое', size: 3 },
  recommended: { title: 'Рекомендуем', size: 6 },
  favorites: { title: 'Избранное', isFavorites: true },
  appropriate: { title: 'Подходящие предложения: ', isFiltred: true },
};

// Сопоставление категории навыка с темой для отображения.
export const tagThemes = {
  'Бизнес и карьера': 'themeCareer',
  'Творчество и искусство': 'themeArt',
  'Иностранные языки': 'themeLanguages',
  'Образование и развитие': 'themeEducation',
  'Дом и уют': 'themeHome',
  'Здоровье и лайфстайл': 'themeHealth',
} as const;

export type TagTheme = keyof typeof tagThemes;
export type ThemeValue = (typeof tagThemes)[TagTheme];

export const mainFilter: TRadioList = {
  name: 'main',
  options: [
    {
      text: 'Всё',
      value: 'all',
      id: '1',
      defaultChecked: true,
    },
    {
      text: 'Хочу научиться',
      value: 'wish',
      id: '2',
    },
    {
      text: 'Могу научить',
      value: 'skills',
      id: '3',
    },
  ],
};
