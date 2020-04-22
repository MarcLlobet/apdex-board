import Data from 'data'

// JSPerf
// negative while loop
// using obj access for performance (better than in and hasOwnProperty)
// negative and most probable cases first

const AppsPerHost = 25
class Top extends Array {
  get max()  {return AppsPerHost - 1}
  constructor(app) {
    super()
    this.list = [app]
    this.lowestApdex = app.apdex
  }

  sort() {
    this.list.sort((a, b) => {
      if (a.apdex !== b.apdex) return a.apdex > a.apdex ? 1 : -1
      return 0
    })
  }

  get last() {
    return this.list.length < this.max ? this.list.length : this.max
  }

  get lastIndex() {
    return this.last - 1
  }

  add(app) {
    let i = this.lastIndex
    if (i === this.max && app.apdex <= this.list[i].apdex) return

    for (; app.apdex > this.list[i].apdex; --i){
      this.list[i + 1] = this.list[i]
      if (!i || this.list[i - 1].apdex >= app.apdex) {
        this.list[i] = app
        break;
      }
    }

    this.lowestApdex = this.list[this.lastIndex].apdex
  }


  getTopAppsByHost() {
    return this.list
  }
}


const
  Hosts = {},
  Apps = Data

let a = Data.length

while (--a) {
  let app = Apps[a],
    hosts = app.host,
    h = hosts.length
  while (--h) {
    let host = hosts[h]
    if (!Hosts[host]) {
      Hosts[host] = new Top(app)
      continue
    }
    Hosts[host].add(app)
    continue
  }
}

console.log(Hosts)

const root = document.getElementById('root')

root.innerHTML = 'App'