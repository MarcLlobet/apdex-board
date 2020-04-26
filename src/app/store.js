import Data from 'data'


class Store {
  constructor() {
    const appsByHosts = this.groupByHost(Data)

    this.sortedAppsByHosts = Object.entries(appsByHosts)
      .reduce((prev, [hostName, apps]) =>
        ({ ...prev, [hostName]: this.decrementSortByApdex(apps) })
        , {})
  }

  groupByHost(arr) {
    let hosts = {},
      len = arr.length,
      i = 0,
      h
    for (i; i < len; i++) {
      let hLen = arr[i].host.length
      for (h = 0; h < hLen; h++) {
        try {
          hosts[arr[i].host[h]].push(arr[i])
        } catch {
          let list = [arr[i]]
          list.indexes = []
          hosts[arr[i].host[h]] = list
        }
      }
    }
    return hosts
  }

  * decrementSortByApdex(arr, min = 0, max = 100) {
    let i = min,
      j = 0,
      len = arr.length,
      count = [],
      orderedApps = []

    for (i; i <= max; i++) {
      count[i] = [];
    }
    for (i = 0; i < len; i++) {
      try {
        count[arr[i].apdex].push(arr[i]);
      } catch{
        count[arr[i].apdex] = [arr[i]]
      }
    }
    for (i = max; i >= min; i--) {
      for (j = 0; count[i].length > 0; j++) {
        orderedApps[j] = count[i].pop();

        if (orderedApps.length === 5) yield orderedApps
        if (orderedApps.length === 25) yield orderedApps.filter((_, index) => index > 4)
        if (orderedApps.length <= 25) continue
        yield [orderedApps[j]]
      }
    }

    return orderedApps;
  }

  getHosts() {
    return Object.entries(this.sortedAppsByHosts).reduce((prev, [hostName, apps]) => ({ ...prev, [hostName]: apps.next().value }), {})
  }

  getTopAppsByHost(hostName) {
    console.log(hostName)
    return this.sortedAppsByHosts[hostName].next().value
  }

  // addAppToHosts() {
  //   Object.values(this.sortedAppsByHosts).forEach(host => host.next().value)
  // }

  removeAppFromHosts(app) {
    app.host.forEach(hostName => {
      this.sortedAppsByHosts[hostName].find(({ name: appName }) => appName === app.name).pop()
    })
  }
}

export default new Store()