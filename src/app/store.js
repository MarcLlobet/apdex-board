import Service from './service'

class Store {
  constructor() {
    this.data = {}

    $.dispatcher.addListener('data', data => {
      let areHostsUpdated = Object.keys(this.data).length === Object.keys(data).length

      if (areHostsUpdated)
        this.emitUpdateToHosts()

      this.data = data
      this.emitUpdate()
    })
  }

  emitUpdateToHosts() {
    $.dispatcher.dispatch('hosts-update')
  }

  emitUpdate() {
    $.dispatcher.dispatch('update')
  }

  getHostsList() {
    return Object.keys(this.data)
  }

  getTopAppsByHosts() {
    return Object.entries(this.data).reduce((prev, [host, apps]) => ({
      ...prev,
      [host]: apps.filter((_, index) => index <= 4)
    }), {})
  }

  getTopAppsByHost(hostName, num) {
    return this.data[hostName].filter((_, index) => index <= (num - 1))
  }

  removeAppFromHosts(app) {
    Service.removeAppFromHosts(app)
  }

  addAppToHosts(app) {
    Service.addAppToHosts(app)
  }
}

export default new Store()