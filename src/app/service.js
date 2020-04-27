import Data from 'data'

class Service {
  constructor() {
    this.data = Data
    this.storedData = {}
    this.storedTimes = 1
    this.sortByHosts()
  }

  getAppsByHost() {
    return this.storedData
  }

  sortByHosts() {
    let appsByHost = this.getGroupByHost(this.data)
    this.getSortedAppsByHosts(appsByHost)
  }

  clearData() {
    this.storedData = {}
    this.storedTimes = 1
  }

  removeAppFromHosts(app) {
    this.clearData()
    let appIndex = this.data.findIndex(row => row.name === app.name)
    this.data.splice(appIndex, 1)
    this.sortByHosts()
  }

  emitUpdate() {
    $.dispatcher.dispatch('data', this.storedData)
  }

  storeData(host, apps, yielded) {
    this.storedData[host] = apps
    if (this.storedTimes === yielded) {
      this.emitUpdate()
      this.storedTimes++
      console.log(this.storedData)
    }

  }

  getSortedAppsByHosts(appsByHost = {}) {
    Object.entries(appsByHost).forEach(([host, generator]) => {
      (async () => {
        let yielded = 0
        for await (let apps of this.decrementSortByApdex(generator)) {
          ++yielded
          this.storeData(host, apps, yielded)
        }
      })()
    })
  }

  getGroupByHost(arr) {
    let
      hosts = {},
      len = arr.length,
      i = 0,
      h
    for (i; i < len; i++) {
      let hLen = arr[i].host.length
      for (h = 0; h < hLen; h++) {
        arr[i].key = i
        try {
          hosts[arr[i].host[h]].push(arr[i])
        } catch {
          hosts[arr[i].host[h]] = [arr[i]]
        }
      }
    }
    return hosts
  }

  async * decrementSortByApdex(arr, min = 0, max = 100) {
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
          yield Promise.resolve(orderedApps)
        }
      }
    }

    yield Promise.resolve(orderedApps);
  }
}

export default new Service()