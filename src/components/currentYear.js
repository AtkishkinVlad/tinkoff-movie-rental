class CurrentYear extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const currentYear = new Date().getFullYear();

    shadow.textContent = `${currentYear}`;
  }
}

customElements.define('current-year', CurrentYear);
