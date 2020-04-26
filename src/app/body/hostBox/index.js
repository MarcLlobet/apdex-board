import css from './style'

class HostBox extends $.WebComponent {
  constructor() {
    super({ css })

    // this.root.addEventListener('click', (e) => this.handleClick(e))

    const
      hostName = $.div('hostBox__hostName'),
      collapser = $.div('hostBox__collapser'),
      title = $.div('hostBox__title', [hostName, collapser]),
      ol = $.div('hostBox__ol'),
      body = $.div('hostBox__body', ol),
      element = $.div('hostBox hostBox--collapsed', [title, body])
    this.root.appendChild(element)

    let isFirstClick = true

    title.addEventListener('click', e => {

      if (isFirstClick) {
        this.clickOnTitle(e)
        isFirstClick = false
      }

      this.collapse()
    })

    this.isCollapsed = true
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed
    this.root.querySelector('.hostBox').classList.toggle('hostBox--collapsed')
    this.render()
  }

  set host(host) {
    this._host = host
  }

  get host() {
    return this._host || ''
  }

  set apps(apps) {
    this._apps = apps
  }

  get apps() {
    if (this.isCollapsed) {
      this._shownApps = this._apps.filter((_, index) => index <= 4)
      const ol = this.root.querySelector('.hostBox__ol')
      ol.innerHTML = null
    } else {
      this._shownApps = this._apps
    }
    return this._shownApps || []
  }

  createRow(app) {
    const
      apdex = $.div('hostBox__apdex', app.apdex),
      name = $.div('hostBox__name', app.name),
      contributors = $.div('hostBox__contributors', app.contributors.join(', ')),
      row = $.div('hostBox__row', [name, contributors])

    return $.div('hostBox__li', [apdex, row])
  }

  addRows(apps) {
    const ol = this.root.querySelector('.hostBox__ol')

    apps.forEach(app => ol.appendChild(this.createRow(app)))
  }

  render() {
    const ol = this.root.querySelector('.hostBox__ol')

    this.apps.forEach(app => ol.appendChild(this.createRow(app)))


    const hostName = this.root.querySelector('.hostBox__hostName')
    hostName.innerHTML = this.host
  }
}

customElements.define('host-box', HostBox);