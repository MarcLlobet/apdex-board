import Hosts from './hosts'

class App {
  constructor(app) {
    const { name, version, apdex, contributors, host } = app

    this.hosts = {}

    const props = {
      app,
      name,
      version,
      apdex,
      contributors,
      host: {
        get: host,
        set: appToHosts
      }
    }

    Object.defineProperties(this, props)
  }

  appToHosts(hosts) {
    hosts.forEach(host => {
      if (host in Hosts) Hosts[host].push(this.app)
      else Hosts[host] = [this.app]
    })
  }
}

export default App