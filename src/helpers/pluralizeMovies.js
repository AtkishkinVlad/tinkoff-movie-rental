const rules = new Intl.PluralRules('ru-RU');

export const pluralizeMovies = (value) => {
  switch (rules.select(value)) {
    case 'one':
      return 'фильм';
    case 'few':
      return 'фильма';
    case 'many':
    default:
      return 'фильмов';
  }
};
