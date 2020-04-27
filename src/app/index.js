import Header from './header'
import AdditionForm from './additionForm'
import Body from './body'
import css from './style'


const
  wrapper = $.div(css.wrapper, [Header, AdditionForm, Body]),
  App = $.div(css.app, wrapper)

export default App