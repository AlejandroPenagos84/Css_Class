import templateHtml from './footer-module.html?raw'

class FooterModule extends HTMLElement {
  connectedCallback() {
    if (this._loaded) return
    this._loaded = true

    const doc = new DOMParser().parseFromString(templateHtml, 'text/html')
    const template = doc.querySelector('template')
    if (!template) return
    this.appendChild(template.content.cloneNode(true))

    this.syncNavigationButtons()
  }

  syncNavigationButtons() {
    const moduleNode = this.closest('.module')
    if (!moduleNode) return

    const modules = Array.from(document.querySelectorAll('.module'))
    const navButtons = Array.from(document.querySelectorAll('.nav-btn'))
    const currentIndex = modules.indexOf(moduleNode)

    if (currentIndex < 0) return

    const prevButton = this.querySelector('.footer-prev')
    const nextButton = this.querySelector('.footer-next')

    if (!prevButton || !nextButton) return

    const prevIndex = currentIndex - 1
    const nextIndex = currentIndex + 1

    if (prevIndex >= 0) {
      prevButton.disabled = false
      prevButton.dataset.prev = String(prevIndex)
      const prevLabel = navButtons[prevIndex]?.textContent?.trim() || 'Anterior'
      prevButton.textContent = `← ${prevLabel}`
    } else {
      prevButton.disabled = true
      delete prevButton.dataset.prev
      prevButton.textContent = '← Anterior'
    }

    if (nextIndex < modules.length) {
      nextButton.disabled = false
      nextButton.dataset.next = String(nextIndex)
      const nextLabel = navButtons[nextIndex]?.textContent?.trim() || 'Siguiente'
      nextButton.textContent = `Siguiente: ${nextLabel} →`
    } else {
      nextButton.disabled = true
      delete nextButton.dataset.next
      nextButton.textContent = 'Modulo final por ahora'
    }
  }
}

customElements.define('footer-module', FooterModule)
