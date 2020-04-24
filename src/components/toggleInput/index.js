import { div } from '../dom'
import './style'

const template = document.createElement('template')
template.innerHTML = `
<style>
* {
  box-sizing: border-box;
}

.toggleInput {
  position: relative;
  padding-left: 20px;
  cursor: pointer;
}

.toggleInput:not(:first-child){
  margin-left: 30px;
}

.toggleInput__input {
  z-index: 5;
  opacity: 0;
}
.toggleInput__label:before,
.toggleInput__label:after,
.toggleInput__input {
  display: block;
  width: 20px;
  height: 20px;
  margin: 0;
  position: absolute;
  top: -5px;
  bottom: 0;
  left: 0px;
  border-radius: 4px;
}

.toggleInput__label:before {
  content: '';
  background: var(--input-bg-color);
  border: 1px solid;
  border-color: var(--input-border-color);
  z-index: 2;
}

.toggleInput__label:after {
  content: '';
  transition: transform ease-out 220ms;
  transform: scale(0);
  background: var(--input-tick-color);
  z-index: 3;
  border: 1px solid transparent;
}

.toggleInput__input:checked + .toggleInput__label:after {
  transform: scale(0.6);
}

.toggleInput__input + .toggleInput__label {
  padding-left: 5px;
}
.toggleInput__label {
  display: block;
}
</style>
`
let i = 0

class ToggleInput extends HTMLElement {
  constructor() {
    super()
    i++
    this.root = this.attachShadow({ mode: 'open' })
    this.root.appendChild(template.content.cloneNode(true))

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