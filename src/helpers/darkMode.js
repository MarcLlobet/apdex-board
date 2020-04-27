const darkThemes = {
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
    '--box-bg-color': '#212121',
    '--app-bg-color': '#282828',
    '--title-text-color': '#e1e1e1',
    '--list-text-color': '#cecece',
    '--input-bg-color': '#eee',
    '--input-border-color': '#ddd',
    '--input-tick-color': '#c7c70e',
    '--remove-bg-color': '#d3205c',
  }
}

let darkTheme = true, theme

export const darkMode = function () {
  if (darkTheme) theme = 'dark'
  else theme = 'normal'

  darkTheme = !darkTheme

  Object.entries(darkThemes[theme]).forEach(([prop, value]) => {
    document.documentElement.style.setProperty(prop, value);
  })
}