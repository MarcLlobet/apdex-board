import css from './style'

class HostBox extends $.WebComponent {
  constructor() {
    super({ css })

    const
      hostName = $.div('hostBox__hostName'),
      collapser = $.div('hostBox__collapser'),
      title = $.div('hostBox__title', [hostName, collapser]),
      ol = $.div('hostBox__ol'),
      body = $.div('hostBox__body', ol),
      element = $.div('hostBox hostBox--collapsed', [title, body])
    this.root.appendChild(element)

    let isFirstClick = true

    collapser.addEventListener('click', () => {
      if (isFirstClick) {
        this.getTopApps()
        isFirstClick = false
      }
      this.collapse()
    })

    this.isCollapsed = true
    this._apps = []
    this._store = []
    this.hiddenApps = []
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed
    this.root.querySelector('.hostBox').classList.toggle('hostBox--collapsed')

    const ol = this.root.querySelector('.hostBox__ol')
    if (this.isCollapsed) {
      this.hiddenApps = Array.from(ol.childNodes)
        .filter((_, index) => index >= 5)
        .map(app => ol.removeChild(app))

    } else {
      this.hiddenApps.forEach(app => ol.appendChild(app))
    }
  }


  set store(store) {
    this._store = store
  }

  get store() {
    return this._store
  }

  set apps(apps) {
    this._apps = [...this._store, ...apps]
    this.render()
  }

  get apps() {
    return this._apps
  }

  createRow(app) {
    const
      apdex = $.div('hostBox__apdex', app.apdex),
      name = $.div('hostBox__name', app.name),
      contributors = $.div('hostBox__contributors', app.contributors.join(', ')),
      row = $.div('hostBox__row', [name, contributors])

    return $.div('hostBox__li', [apdex, row])
  }

  render() {
    const ol = this.root.querySelector('.hostBox__ol')

    this.apps.forEach(app => ol.appendChild(this.createRow(app)))


    const hostName = this.root.querySelector('.hostBox__hostName')
    hostName.innerHTML = this.host || ''
  }
}

customElements.define('host-box', HostBox);