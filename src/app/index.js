import Data from 'data'
import Hosts from './hosts'
import '../components'
import "@marcius-capital/fonts"
import css from './style'


const hosts = new Hosts(Data)
console.log(hosts.topAppsByHost)


const App = document.createElement('div')
App.setAttribute('class', css.app)

const Wrapper = document.createElement('div')
Wrapper.setAttribute('class', css.wrapper)


Object.entries(hosts.topAppsByHost).forEach(([host, apps]) => {

  const hostBox = document.createElement('host-box')
  hostBox.host = host
  hostBox.apps = apps

  Wrapper.appendChild(hostBox)
})

App.appendChild(Wrapper)

export default App