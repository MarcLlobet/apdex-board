import Service from './service'

class Store {
  constructor() {
    this.appsByHost = Service.getSortedAppsByHosts()
    this.data = {}
    this.getHostsFromService()
  }

  emitUpdate() {
    $.dispatcher.dispatch('update', Promise.resolve(this.data))
  }

  getHosts() {
    return Promise.resolve(this.data)
  }

  getHostsFromService() {

    let response = Promise.all(
      Object.values(this.appsByHost)
        .map(host => host.next().value)
    ).then(values => {
      let hosts = Object.keys(this.appsByHost)
        .reduce((prev, host, index) =>
          ({ ...prev, [host]: values[index] }), {})

      return hosts
    })

    this.data = response
    return response
  }

  getTopAppsByHost(hostName) {
    let response = this.appsByHost[hostName].next().value

    return response
  }

  removeAppFromHosts(app) {
    app.host.forEach(async hostName => {
      let data = await Promise.resolve(this.data[hostName]),
        index = data.findIndex(({ name }) => name === app.name)

      this.data[hostName].splice(index, 1)
    })
    this.emitUpdate()
  }

}

export default new Store()