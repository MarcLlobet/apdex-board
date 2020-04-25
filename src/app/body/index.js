import Store from '../store'
import css from './style'
import { div } from 'components'

const Body = div(css.body),
  hosts = Store.getHosts()

Object.entries(hosts).forEach(([host, apps]) => {

  const hostBox = document.createElement('host-box')
  hostBox.host = host
  hostBox.apps = apps
  hostBox.render()
  hostBox.onclick = function () {
    const topAppsByHost = Store.getTopAppsByHost(host)
    this.addRows(topAppsByHost)
  }

  Body.appendChild(hostBox)
})

export default Body