import { div } from '../dom'
import './style'

const template = document.createElement('template')
template.innerHTML = `
<style>
*{
  box-sizing: border-box;
}
.hostBox__apdex {
  font-size: 13px;
  opacity: 0.62;
  font-weight: bold;
  flex-basis: 40px;
  flex-shrink: 0;
  padding-right: 5px;
}
.hostBox__name,
.hostBox__contributors {
  display: inline;
}
.hostBox__name + .hostBox__contributors:before {
  content: '-';
  margin: 0 5px;
}
.hostBox__row {
  font-size: 16px;
}
.hostBox__li + .hostBox__li {
  padding-top: 23px;
}
.hostBox__li {
  color: var(--list-text-color);
  display: flex;
  flex-direction: row;

}
.hostBox__ol {

}
.hostBox__title {
  color: var(--title-text-color);
  font-weight: bold;
  font-size: 16px;
}
.hostBox__title + .hostBox__body{
  padding-top: 23px;
}

.hostBox {
  padding: 30px;
  line-height: 19px;
  font-family: "HelveticaNeueCyr", sans-serif;
  background: var(--box-bg-color);
}
</style>
`

class HostBox extends HTMLElement {
  constructor() {
    super()

    this.root = this.attachShadow({ mode: 'open' })
    this.root.appendChild(template.content.cloneNode(true))
  }

  set host(host) {
    this.title = host
  }

  get host() {
    return this.title || ''
  }

  set apps(apps) {
    this.list = apps
    this.render()
  }

  get apps() {
    return this.list || []
  }

  render() {
    const lis = this.apps.map(app => {
      const
        apdex = div('hostBox__apdex', app.apdex),
        name = div('hostBox__name', app.name),
        contributors = div('hostBox__contributors', app.contributors.join(', ')),
        row = div('hostBox__row', [name, contributors])

      return div('hostBox__li', [apdex, row])
    }),

      ol = div('hostBox__ol', lis),
      title = div('hostBox__title', this.host),
      body = div('hostBox__body', ol),
      element = div('hostBox', [title, body])

    this.root.appendChild(element)
  }
}

customElements.define('host-box', HostBox);