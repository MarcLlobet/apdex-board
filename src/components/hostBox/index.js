import { div } from '../dom'
import css from './style'
import WebComponent from '../webComponent'

class HostBox extends WebComponent {
  constructor() {
    super({ css })
  }

  set host(host) {
    this._host = host
  }

  get host() {
    return this._host || ''
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