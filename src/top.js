const AppsPerHost = 5

class Top extends Array {

  get top5() { return 4 }

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
    const last = this.length < this.top5 ? this.length : this.top5
    return last - 1
  }

  // function selectionSort(arr){
  //   var minIdx, temp, 
  //       len = arr.length;

  //   for(var i = 0; i < len; i++){
  //     minIdx = i;
  //     for(var  j = i+1; j<len; j++){
  //        if(arr[j]<arr[minIdx]){
  //           minIdx = j;
  //        }
  //     }
  //     temp = arr[i];
  //     arr[i] = arr[minIdx];
  //     arr[minIdx] = temp;
  //   }
  //   return arr;
  // }

  add(app) {
    let i = this.#lastIndex
    if (i === this.top5 && app.apdex <= this.lowestApdex) return

    for (++i; this[i - 1] && this[i - 1].apdex < app.apdex;) {
      this[i] = this[--i]
    }

    this[i] = app

    this.lowestApdex = this[this.#lastIndex].apdex
  }
}

export default Top