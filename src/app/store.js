import Data from 'data'

class Store {
  constructor() {
    const appsByHosts = this.groupByHost(Data)

    this.sortedAppsByHosts = Object.entries(appsByHosts)
      .reduce((prev, [hostName, apps]) => {
        return ({ ...prev, [hostName]: this.decrementSortByApdex(apps) })
      }, {})
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

  * decrementSortByApdex(arr, max = 100, min = 0) {
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
        if (orderedApps.length === 25) yield orderedApps
        if (orderedApps.length < 25) continue
        yield orderedApps
      }
    }

    return orderedApps;
  }

  getHosts() {
    return Object.entries(this.sortedAppsByHosts).reduce((prev, [hostName, apps]) => ({ ...prev, [hostName]: apps.next().value }), {})
  }

  getTopAppsByHost(hostName) {
    return this.sortedAppsByHosts[hostName].next().value
  }

  // addAppToHosts() {
  //   Object.values(this.sortedAppsByHosts).forEach(host => host.next().value)
  // }

  // removeAppFromHosts() {}
}

export default new Store()