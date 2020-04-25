import Store from '../store'
import css from './style'
import { div } from 'components'

const Body = div(css.body)

Object.entries(Store.getHosts()).forEach(([host, apps]) => {

  const hostBox = document.createElement('host-box')
  hostBox.host = host
  hostBox.apps = apps

  Body.appendChild(hostBox)
})

export default Body