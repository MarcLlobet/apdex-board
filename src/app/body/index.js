import Store from '../store'
import css from './style'
import './hostBox'

const Body = $.div(css.body)


function renderBody() {
  Body.innerHTML = ''
  let hosts = Store.getTopAppsByHosts()

  Object.entries(hosts).forEach(([host, apps]) => {

    const hostBox = document.createElement('host-box')
    hostBox.host = host
    hostBox.apps = apps
    hostBox.getTopApps = hostName => {
      let topAppsByHost
      if (!hostBox.isCollapsed) {
        topAppsByHost = Store.getTopAppsByHost(hostName, 25)
      } else {
        topAppsByHost = Store.getTopAppsByHost(hostName, 5)
      }

      hostBox.apps = topAppsByHost
    }

    hostBox.selectRow = function (app) {
      Store.removeAppFromHosts(app)
    }

    Body.appendChild(hostBox)
  })
}

$.dispatcher.addListener('update', () => renderBody())


export default Body