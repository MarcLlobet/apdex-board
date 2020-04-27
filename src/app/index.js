import Header from './header'
import AdditionForm from './additionForm'
import Body from './body'
import css from './style'

const themes = {
  normal: {
    '--box-bg-color': '#fff',
    '--app-bg-color': '#f5f5f5',
    '--title-text-color': '#000',
    '--list-text-color': '#4a4a4a',
    '--input-bg-color': '#fff',
    '--input-border-color': '#c3c0c0',
    '--input-tick-color': '#7ed320',
    '--remove-bg-color': '#d3205c',
  },
  dark: {
    '--box-bg-color': '#000',
    '--app-bg-color': '#f5f5f5',
    '--title-text-color': '#000',
    '--list-text-color': '#4a4a4a',
    '--input-bg-color': '#fff',
    '--input-border-color': '#c3c0c0',
    '--input-tick-color': '#7ed320',
    '--remove-bg-color': '#d3205c',
  }
}

const
  wrapper = $.div(css.wrapper, [Header, AdditionForm, Body]),
  App = $.div(css.app, wrapper)

export default App