import { movieTemplate } from './movie.template';
import { movieParams, mirror } from './movie.utils';

class MovieCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const template = movieTemplate.content.cloneNode(true);

    shadow.appendChild(template);
    mirror(movieParams, this);
  }

  static get observedAttributes() {
    return movieParams;
  }

  attributeChangedCallback(param, _, newValue) {
    switch (param) {
      case 'title':
        this.shadowRoot.querySelector('.movie-title').textContent = newValue;
        break;

      case 'poster':
        if (newValue === 'N/A') {
          this.shadowRoot
            .querySelector('.movie')
            .classList.add('movie--no-image');
        } else {
          this.shadowRoot
            .querySelector('.movie')
            .classList.remove('movie--no-image');
        }
        this.shadowRoot.querySelector('.movie-image').src = newValue;
        break;

      case 'link':
        return (this.shadowRoot.querySelector('.movie-link').href = newValue);

      case 'year':
        return (this.shadowRoot.querySelector(
          '.movie-year'
        ).textContent = newValue);

      case 'rating':
        return (this.shadowRoot.querySelector(
          '.movie-rating'
        ).textContent = newValue);

      case 'genre':
        return (this.shadowRoot.querySelector(
          '.movie-genre'
        ).textContent = newValue);
    }
  }
}

customElements.define('movie-card', MovieCard);
