import { clearNode } from '../helpers/clearContainer.js';
import { pluralizeMovies } from '../helpers/pluralizeMovies.js';
import { elements } from '../consts/elements.js';

export const createView = () => {
  const {
    resultsContainer,
    resultsHeading,
    searchTags,
    searchForm,
    searchInput,
  } = elements;

  const renderList = (results) => {
    const list = document.createDocumentFragment();

    results.forEach((movieData) => {
      const movie = document.createElement('movie-card');
      const { poster, title, year, link } = movieData;

      movie.poster = poster;
      movie.title = title;
      movie.year = year;
      movie.link = link;

      list.appendChild(movie);
    });

    clearNode(resultsContainer);
    resultsContainer.appendChild(list);
  };

  const renderSearchList = (terms) => {
    const list = document.createDocumentFragment();

    terms.forEach((movie) => {
      const tag = document.createElement('a');

      tag.classList.add('search__tag');
      tag.href = `/?search=${movie}`;
      tag.textContent = movie;
      tag.dataset.movie = movie;

      list.appendChild(tag);
    });

    clearNode(searchTags);
    searchTags.appendChild(list);
  };

  const renderCount = (count) => {
    resultsHeading.textContent = `Нашли ${count} ${pluralizeMovies(count)}`;
  };

  const renderError = (error) => {
    resultsHeading.textContent = error;
  };

  const onSearchSubmit = (_listener) => {
    const listener = (event) => {
      event.preventDefault();
      _listener(searchInput.value);
      searchInput.value = '';
    };

    searchForm.addEventListener('submit', listener);

    return () => searchForm.removeEventListener('submit', listener);
  };

  const onTagClick = (_listener) => {
    const listener = (event) => {
      event.preventDefault();

      if (event.target.classList.contains('search__tag') && !event.altKey) {
        _listener(event.target.dataset.movie);
      }
    };

    searchTags.addEventListener('click', listener);
    return () => searchTags.removeEventListener('click', listener);
  };

  const onTagRemove = (_listener) => {
    const listener = (event) => {
      event.preventDefault();

      if (event.target.classList.contains('search__tag')) {
        _listener(event.target.dataset.movie);
      }
    };

    searchTags.addEventListener('dblclick', listener);
    return () => searchTags.removeEventListener('dblclick', listener);
  };

  return {
    renderList,
    renderCount,
    renderError,
    renderSearchList,
    onSearchSubmit,
    onTagClick,
    onTagRemove,
  };
};
