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

    this.isCollapsed = true
    this._apps = []

    collapser.addEventListener('click', () => this.collapse())
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed
    this.getTopApps(this.host)
    this.root.querySelector('.hostBox').classList.toggle('hostBox--collapsed')
  }

  set apps(apps) {
    this._apps = apps
    this.render()
  }

  get apps() {
    return this._apps
  }

  render() {
    const ol = this.root.querySelector('.hostBox__ol')
    ol.innerHTML = ''

    this.apps.forEach(app => {
      const
        apdex = $.div('hostBox__apdex', app.apdex),
        name = $.div('hostBox__name', app.name),
        contributors = $.div('hostBox__contributors', app.contributors.join(', ')),
        row = $.div('hostBox__row', [name, contributors]),
        remove = $.div('hostBox__remove'),
        li = $.div('hostBox__li', [apdex, remove, row])

      li.setAttribute('key', app.key)
      row.setAttribute('title', `Version: ${app.version}`)
      remove.querySelector('.hostBox__apdex')

      remove.addEventListener('click', () => {
        let boxes = document.querySelectorAll('host-box')
        Array.from(boxes).forEach(box => {
          let li = box.shadowRoot.querySelector(`[key="${app.key}"]`)
          if (li) li.classList.toggle('hostBox__li--removed')
          setTimeout(() => {
            this.selectRow(app)
          }, 1000)
        })
      })

      ol.appendChild(li)
    })


    const hostName = this.root.querySelector('.hostBox__hostName')
    hostName.innerHTML = this.host || ''
  }
}

customElements.define('host-box', HostBox);