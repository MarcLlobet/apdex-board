import Service from './service'

class Store {
  constructor() {
    this.appsByHost = Service.getSortedAppsByHosts()
    this.data = {}
  }


  getHosts() {

    let response = Promise.all(
      Object.values(this.appsByHost)
        .map(host => host.next().value)
    ).then(values => {
      let hosts = Object.keys(this.appsByHost)
        .reduce((prev, host, index) =>
          ({ ...prev, [host]: values[index] }), {})

      this.data = hosts

      return hosts
    })

    this.data = response
    return response
  }

  getTopAppsByHost(hostName) {
    let response = this.appsByHost[hostName].next().value
    console.log(this.data, response)

    return response
  }

  // addAppToHosts() {
  //   Object.values(this.appsByHost).forEach(host => host.next().value)
  // }

  removeAppFromHosts(app) {
    app.host.forEach(hostName => {
      this.appsByHost[hostName].find(({ name: appName }) => appName === app.name).pop()
    })
  }

}

export default new Store()