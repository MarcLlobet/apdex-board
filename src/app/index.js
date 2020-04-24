import Data from 'data'
import Hosts from './hosts'
import '../components'
import "@marcius-capital/fonts"
import css from './style'
import { div } from '../components'


const hosts = new Hosts(Data)
console.log(hosts.topAppsByHost)



const
  h1 = div(css.header__title, 'Apps by Host'),
  email = div(css.header__email, `for user myemail@gmail.com`),
  layoutToggler = document.createElement('toggle-input')

layoutToggler.options = {
  false: 'Show as an awesome grid',
  true: 'Show as list'
}

layoutToggler.toggle = function () {
  this.checked = !this.checked
  if (this.checked) {
    document.documentElement.style.setProperty('--grid-columns', 2)
  } else {
    document.documentElement.style.setProperty('--grid-columns', 1)
  }
}

const header = div(css.header, [h1, email, layoutToggler]),
  body = div(css.body)

Object.entries(hosts.topAppsByHost).forEach(([host, apps]) => {

  const hostBox = document.createElement('host-box')
  hostBox.host = host
  hostBox.apps = apps

  body.appendChild(hostBox)
})

const
  wrapper = div(css.wrapper, [header, body]),
  App = div(css.app, wrapper)

export default App