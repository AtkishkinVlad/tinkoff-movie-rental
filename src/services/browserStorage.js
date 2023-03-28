export const getSearches = () => localStorage.getItem('searches');
export const setSearches = (newSearches) =>
  localStorage.setItem('searches', newSearches);

export const setCurrentResult = (result) =>
  localStorage.setItem('result', result);
export const getCurrentResult = () => localStorage.getItem('result');
