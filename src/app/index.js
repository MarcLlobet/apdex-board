import { div } from 'components'
import Header from './header'
import Body from './body'
import css from './style'


const
  wrapper = div(css.wrapper, [Header, Body]),
  App = div(css.app, wrapper)

export default App