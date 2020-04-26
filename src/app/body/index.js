import Store from '../store'
import css from './style'
import './hostBox'

const Body = $.div(css.body),
  hosts = Store.getHosts()

Object.entries(hosts).forEach(([host, apps]) => {

  const hostBox = document.createElement('host-box')
  hostBox.host = host
  hostBox.apps = apps
  hostBox.render()
  hostBox.clickOnTitle = function () {
    const topAppsByHost = Store.getTopAppsByHost(host)
    this.addRows(topAppsByHost)
  }



  Body.appendChild(hostBox)
})

export default Body