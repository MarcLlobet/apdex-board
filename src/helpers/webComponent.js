export class WebComponent extends HTMLElement {
  constructor(props) {
    super()

    const template = document.createElement('template')
    template.innerHTML = `<style>${props.css}</style>`

    this.root = this.attachShadow({ mode: 'open' })
    this.root.appendChild(template.content.cloneNode(true))
  }

}
