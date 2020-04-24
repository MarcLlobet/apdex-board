const AppsPerHost = 25

class Top extends Array {
  get max() { return AppsPerHost - 1 }
  constructor(app) {
    super()
    this.push(app)
    Object.defineProperty(this, 'lowestApdex', {
      value: app.apdex,
      writable: true
    })
  }

  sort() {
    this.sort((a, b) => {
      if (a.apdex !== b.apdex) return a.apdex > a.apdex ? 1 : -1
      return 0
    })
  }



  get #lastIndex() {
    const last = this.length < this.max ? this.length : this.max
    return last - 1
  }

  add(app) {
    let i = this.#lastIndex
    if (i === this.max && app.apdex <= this[i].apdex) return

    do {
      this[i + 1] = this[i]
      if (!i || this[i - 1].apdex >= app.apdex) {
        this[i] = app
        break
      }
      --i
    } while (app.apdex > this[i].apdex)

    this.lowestApdex = this[this.#lastIndex].apdex
  }
}

export default Top