import Store from '../store'
import css from './style'
import './hostBox'
import Modal from './modal'

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

    hostBox.openDialog = function (app) {
      Modal(app)
    }

    hostBox.selectRow = function (app) {
      Store.removeAppFromHosts(app)
    }

    Body.appendChild(hostBox)
  })
}

$.dispatcher.addListener('update', () => renderBody())


export default Body