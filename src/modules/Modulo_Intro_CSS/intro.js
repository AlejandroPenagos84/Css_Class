import templateHtml from './intro.html?raw'

class IntroCSS extends HTMLElement {
  connectedCallback() {
    if (this._loaded) return;
    this._loaded = true;

    const doc = new DOMParser().parseFromString(templateHtml, 'text/html');
    const template = doc.querySelector('template');
    if (!template) return;

    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('intro-css', IntroCSS);
