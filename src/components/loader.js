class Loader extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `<svg viewBox="0 0 500 500">
      <rect y="0" width="13" height="50" fill="#f0e130">
          <animate attributeName="height" values="50;10;50" begin="0s" dur="1s" repeatCount="indefinite" />
      </rect>
      <rect x="19" y="0" width="13" height="50" fill="#12d8fa">
          <animate attributeName="height" values="50;10;50" begin="0.2s" dur="1s" repeatCount="indefinite" />
      </rect>
      <rect x="38" y="0" width="13" height="50" fill="#f0e130">
          <animate attributeName="height" values="50;10;50" begin="0.4s" dur="1s" repeatCount="indefinite" />
      </rect>
  </svg>`;
  }
}

customElements.define('loader-component', Loader);
