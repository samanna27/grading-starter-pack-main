export enum AppRoute {
  Main = '/',
  Quest = '/quests/:id',
  Contacts = '/contacts',
  Other = '#'
}

export enum APIRoute {
  Quests = '/quests',
  Quest = 'GET/quests/:id',
}

export const LEVELS: {[key in string]: string} = {
  hard: 'сложный',
  medium: 'средний',
  easy: 'легкий',
};

export const TYPES: {[key in string]:  string} = {
  'Все квесты': 'Все квесты',
  adventures: 'Приключения',
  horror: 'Ужасы',
  mystic: 'Мистика',
  detective: 'Детектив',
  'sci-fi': 'Sci-fi',
};

export const OK_CODE = 200 | 201;

export const NAVIGATION_ITEMS = [
  ['Квесты', AppRoute.Main],
  ['Новичкам', AppRoute.Other],
  ['Отзывы', AppRoute.Other],
  ['Акции', AppRoute.Other],
  ['Контакты', AppRoute.Contacts],
];
