import Data from 'data'

class Service {
  constructor() {
    this.data = Data
  }

  getSortedAppsByHosts() {
    return Object.entries(this.groupByHost)
      .reduce((prev, [hostName, apps]) =>
        ({ ...prev, [hostName]: this.decrementSortByApdex(apps) })
        , {})
  }

  get groupByHost() {
    let
      arr = this.data,
      hosts = {},
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
      for (j = count[i].length; count[i].length > 0; j--) {
        orderedApps.push(count[i].pop())

        if (orderedApps.length === 5) {
          yield Promise.resolve(orderedApps)
        }
        if (orderedApps.length === 25) {
          yield Promise.resolve(orderedApps.filter((_, index) => index > 4))
        }
        if (orderedApps.length >= 25) {
          yield Promise.resolve([orderedApps[orderedApps.length - 1]])
        }
      }
    }

    return Promise.resolve(orderedApps);
  }
}

export default new Service()