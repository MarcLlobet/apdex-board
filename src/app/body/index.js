import Store from '../store'
import css from './style'
import './hostBox'

const Body = $.div(css.body)

async function renderBody() {
  let hosts = await Store.getHosts()

  Object.entries(hosts).forEach(async ([host, apps]) => {

    const hostBox = document.createElement('host-box')
    let row = await apps
    hostBox.host = host
    hostBox.apps = row
    hostBox.getTopApps = async function () {
      let topAppsByHost = await Store.getTopAppsByHost(host)
      hostBox.apps = topAppsByHost
    }

    Body.appendChild(hostBox)
  })
}

renderBody()



export default Body