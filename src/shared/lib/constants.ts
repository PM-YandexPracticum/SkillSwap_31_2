import { TRadioList } from "../ui/radio-filter/type";

export const saltRounds = 12;

export const skillListTypes = {
  popular: { title: 'Популярное', size: 3 },
  new: { title: 'Новое', size: 3 },
  recommended: { title: 'Рекомендуем', size: 6 },
  favorites: { title: 'Избранное', isFavorites: true },
  appropriate: { title: 'Подходящие предложения: ', isFiltred: true },
};

export const mainFilter: TRadioList = {
    title: '',
    name: 'filter',
    options: [
      { text: 'Всё', value: 'all', id: 'all', defaultChecked: true },
      { text: 'Хочу научиться', value: 'learn', id: 'learn' },
      { text: 'Могу научить', value: 'teach', id: 'teach' },
    ],
  };