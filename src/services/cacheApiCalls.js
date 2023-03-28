import { mapMovie } from '../helpers/mapMovie';
import { setCurrentResult } from './browserStorage';

const OMDBCacheMap = new Map();

const loader = document.querySelector('loader-component');

export const getFilmInfo = async (searchPattern) => {
  const normalizeSearchPattern = searchPattern.toLowerCase();

  if (OMDBCacheMap.has(normalizeSearchPattern)) {
    return OMDBCacheMap.get(normalizeSearchPattern);
  }

  try {
    loader.classList.remove('hidden');

    const data = await fetch(
      `http://www.omdbapi.com/?type=movie&apikey=${
        process.env.API_KEY
      }&s=${searchPattern}`
    ).then((r) => r.json());

    const { Response, Search, Error, totalResults } = data;

    loader.classList.add('hidden');

    const response =
      Response === 'True'
        ? {
            count: totalResults,
            results: Search.map(mapMovie),
          }
        : { error: Error };

    setCurrentResult(JSON.stringify(response));
    OMDBCacheMap.set(normalizeSearchPattern, response);

    return response;
  } catch (error) {
    loader.classList.add('hidden');
    OMDBCacheMap.set(normalizeSearchPattern, error);

    return { error };
  }
};
