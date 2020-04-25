import { div } from '../dom'
import css from './style'
import WebComponent from '../webComponent'

let i = 0

class ToggleInput extends WebComponent {
  constructor() {
    super({ css })
    i++

    const id = `checkbox-${i}`
    this.input = document.createElement('input')
    this.input.type = 'checkbox'
    this.input.id = id
    this.input.setAttribute('class', 'toggleInput__input')
    this.input.onclick = () => this.toggle()

    this.label = document.createElement('label')
    this.label.htmlFor = id
    this.label.setAttribute('class', 'toggleInput__label')

    this.toggler = div('toggleInput', [this.input, this.label])
    this.toggler.addEventListener('click', () => this.toggle.bind(this))
  }

  set toggle(callback) {
    this.callback = callback
  }

  get toggle() {
    return this.callback
  }

  set checked(boolean) {
    this.boolean = boolean
    this.render()
  }

  get checked() {
    return this.boolean || false
  }

  set options(options) {
    this.booleanOptions = options
    this.render()
  }

  get options() {
    return this.booleanOptions || {}
  }

  render() {
    this.label.innerHTML = this.options[this.checked]

    this.root.appendChild(this.toggler)
  }
}

customElements.define('toggle-input', ToggleInput);