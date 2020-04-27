import Service from './service'

class Store {
  constructor() {
    this.data = {}

    $.dispatcher.addListener('data', data => {
      this.data = data
      this.emitUpdate()
    })
  }

  emitUpdate() {
    $.dispatcher.dispatch('update')
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
}

export default new Store()