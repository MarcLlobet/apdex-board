import App from './app'

const sort = data => data.sort((a, b) => {
  if (a.apdex > b.apdex) return 1
  else if (a.apdex < b.apdex) return -1
  else 0
})

class Apdex {


  constuctor(data) {
    const sortedData = sort(data)
    this.sortedData = sortedData
    this.apps = sortedData.map(app => new App(app))
  }

  // addAppToHosts(app, hosts) {
  //   // Hosts.addApp(app)
  //   // this.updateEvent()
  // }

  // removeAppFromHosts(app, hosts) {
  //   // Hosts.removeApp(app)
  //   // this.updateEvent()
  // }

  // get topAppsByHost() {
  //   return this.apps.hosts
  // }
}

export default Apdex