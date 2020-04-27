import Store from '../store'
import css from './style'

$.dispatcher.addListener('hosts-update', renderHosts)

const appNameLabel = document.createElement('label')
appNameLabel.setAttribute('for', `appName`)
appNameLabel.setAttribute('class', css.appName__label)
appNameLabel.append('Name')

const appNameInput = document.createElement('input')
appNameInput.setAttribute('class', css.appName__input)
appNameInput.setAttribute('type', 'text')
appNameInput.setAttribute('placeholder', 'Add a name for your app')

const appName = $.div(css.form__input, [appNameLabel, appNameInput])

const appVersionLabel = document.createElement('label')
appVersionLabel.setAttribute('for', `appVersion`)
appVersionLabel.setAttribute('class', css.appVersion__label)
appVersionLabel.append('Version')

const appVersionInput = document.createElement('input')
appVersionInput.setAttribute('class', css.appVersionInput__input)
appVersionInput.setAttribute('placeholder', 0)
appVersionInput.setAttribute('type', 'number')
appVersionInput.setAttribute('value', 'appVersion')

const appVersion = $.div(
  [css.form__input, css['form__input--number']].join(' '),
  [appVersionLabel, appVersionInput]
)

const appApdexLabel = document.createElement('label')
appApdexLabel.setAttribute('for', `appApdex`)
appApdexLabel.setAttribute('class', css.appApdex__label)
appApdexLabel.append('Apdex')

const appApdexInput = document.createElement('input')
appApdexInput.setAttribute('class', css.appApdex__input)
appApdexInput.setAttribute('placeholder', 0)
appApdexInput.setAttribute('type', 'number')
appApdexInput.setAttribute('value', 'appApdex')

const appApdex = $.div(
  [css.form__input, css['form__input--number']].join(' '),
  [appApdexLabel, appApdexInput]
)

const appContributorsLabel = document.createElement('label')
appContributorsLabel.setAttribute('for', `appContributors`)
appContributorsLabel.setAttribute('class', css.appContributors__label)
appContributorsLabel.append('Contributors')

const appContributorsInput = document.createElement('input')
appContributorsInput.setAttribute('class', css.appName__input)
appContributorsInput.setAttribute('type', 'text')
appContributorsInput.setAttribute('placeholder', 'Add some contributors')

const appContributors = $.div(css.form__input, [appContributorsLabel, appContributorsInput])

const button = document.createElement('button')
button.append('Submit your app')

const appButton = $.div(css.form__input, [button])


const appData = $.div(css.form__appData, [appName, appVersion, appApdex, appContributors, appButton]),
  hostsList = $.div(css.form__hostsList),
  hostsListTitle = $.div(css.form__hostsTitle, 'Select hosts for your app'),
  formHosts = $.div(css.form__hosts, [hostsListTitle, hostsList]),
  body = $.div(css.form__body, [appData, formHosts]),
  collapser = $.div(css.form__collapser),
  title = $.div(css.form__title, ['Add a new app', collapser]),
  AdditionForm = $.div([css.form, css['form--collapsed']].join(' '), [title, body])

collapser.onclick = function () {
  AdditionForm.classList.toggle(css['form--collapsed'])
}

function renderHosts() {

  const hosts = Store.getHostsList()

  let input, label
  hostsList.innerHTML = ''

  hosts.forEach((hostName, index) => {
    input = document.createElement('input')
    input.setAttribute('class', css.form__hostElement)
    input.setAttribute('type', 'checkbox')
    input.setAttribute('name', 'hostList')
    input.setAttribute('value', hostName)
    input.setAttribute('id', `check-${index}`)

    label = document.createElement('label')
    label.setAttribute('for', `check-${index}`)
    label.setAttribute('class', css.form__hostElement)
    label.append(hostName)

    let hostLi = $.div(css.form__hostLi, [input, label])
    hostsList.appendChild(hostLi)
  })
}

button.onclick = function () {
  let checkedHosts = []
  document.querySelectorAll('input[type=checkbox]:checked').forEach((checkbox) => {
    checkedHosts.push(checkbox.value)
  })

  if (
    !checkedHosts.length
    || !appNameInput.value
    || !appVersionInput.value
    || !appApdexInput.value
    || !appContributorsInput.value
  ) return alert('Fill all fields in order to add your app')


  Store.addAppToHosts({
    name: appNameInput.value,
    version: Number(appVersionInput.value),
    apdex: Number(appApdexInput.value),
    contributors: [appContributorsInput.value],
    host: checkedHosts
  })

  document.querySelectorAll('input[type=checkbox]:checked').forEach((checkbox) => {
    checkbox.checked = false
  })

  appNameInput.value = ''
  appVersionInput.value = ''
  appApdexInput.value = ''
  appContributorsInput.value = ''

}

export default AdditionForm