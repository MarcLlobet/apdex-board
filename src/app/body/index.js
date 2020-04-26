import Store from '../store'
import css from './style'
import './hostBox'

const Body = $.div(css.body)
renderBody()


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
    hostBox.selectRow = async function (app) {
      Store.removeAppFromHosts(app)
      let otherTopAppsByHost = await Store.getTopAppsByHost(host)
      hostBox.apps = otherTopAppsByHost
    }

    Body.appendChild(hostBox)
  })
}

$.dispatcher.addListener('update', async data => {
  let values = await data
  renderBody()
});


export default Body