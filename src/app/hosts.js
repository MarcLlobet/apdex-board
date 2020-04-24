import Top from '../top'

class Hosts {
  constructor(data) {
    this.data = data
  }

  get topAppsByHost() {
    const Hosts = {}
    let appIndex = this.data.length

    while (--appIndex) {
      let app = this.data[appIndex],
        hosts = app.host,
        hostIndex = hosts.length
      while (--hostIndex) {
        let host = hosts[hostIndex]
        if (Hosts[host]) {
          Hosts[host].add(app)
          continue
        }
        Hosts[host] = new Top(app)
      }
    }

    return Hosts
  }

  addAppToHosts(app) {
    this.data[app].host.add(app)
  }
  removeAppFromHosts() {
    this.data[app].host.pop(app)
  }
}

export default Hosts