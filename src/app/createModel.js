import { createStore } from '../helpers/createStore.js';
import {
  getFilmInfo,
  getCurrentResult,
  setSearches,
  getSearches,
} from '../services/browserStorage.js';
import { getFilmInfo } from '../services/cacheApiCalls.js';

const initialState = {
  count: JSON.parse(getCurrentResult())?.count ?? 0,
  results: JSON.parse(getCurrentResult())?.results ?? [],
  error: false,
  searches: JSON.parse(getSearches()) ?? [
    'Star Wars',
    'Kung Fury',
    'Back to the Future',
    'Matrix',
    'Terminator',
  ],
};

export const createModel = () =>
  createStore(initialState, (store) => ({
    search: async (currentState, searchTerm) => {
      const searches = [searchTerm].concat(
        currentState.searches.filter((term) => term !== searchTerm)
      );

      setSearches(JSON.stringify(searches));

      const { count, results, error } = await getFilmInfo(searchTerm);

      store.setState({
        count,
        results,
        error,
        searches,
      });
    },
    removeTag: (currentState, searchTerm) => {
      const searches = currentState.searches.filter(
        (term) => term !== searchTerm
      );

      setSearches(JSON.stringify(searches));

      return {
        searches,
      };
    },
  }));
