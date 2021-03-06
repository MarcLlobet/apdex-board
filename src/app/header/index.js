import css from './style'
import './toggleInput'



const
  h1 = $.div(css.header__title, 'Apps by Host'),
  theme = $.div(css.header__theme),
  email = $.div(css.header__email, `for user myemail@gmail.com`),
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

theme.onclick = () => $.darkMode()

const Header = $.div(css.header, [h1, theme, email, layoutToggler])
export default Header