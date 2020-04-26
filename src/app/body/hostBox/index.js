import css from './style'

class HostBox extends $.WebComponent {
  constructor() {
    super({ css })

    // this.root.addEventListener('click', (e) => this.handleClick(e))
  }

  // set handleClick(callback) {
  //   this._handleClick = _handleClick
  // }

  // get handleClick(e) {
  //   return this._handleClick
  // }

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
    return this._apps || []
  }

  createRow(app) {
    const
      apdex = $.div('hostBox__apdex', app.apdex),
      name = $.div('hostBox__name', app.name),
      contributors = $.div('hostBox__contributors', app.contributors.join(', ')),
      row = $.div('hostBox__row', [name, contributors])

    return $.div('hostBox__li', [apdex, row])
  }

  createRows(apps) {
    return apps.map(app => this.createRow(app))
  }

  addRows(apps) {
    const ol = this.root.querySelector('.hostBox__ol')

    apps.forEach(app => ol.appendChild(this.createRow(app)))
  }

  render() {

    const lis = this.createRows(this.apps),
      ol = $.div('hostBox__ol', lis),
      title = $.div('hostBox__title', this.host),
      body = $.div('hostBox__body', ol),
      element = $.div('hostBox', [title, body])

    this.root.appendChild(element)
  }
}

customElements.define('host-box', HostBox);