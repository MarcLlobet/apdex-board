function* MicroPerformace() {
  yield (() => {
    const suite = new Benchmark.Suite;

    const obj = { a: 1 }

    suite
      .add('Obj access', () => obj['a'])
      .add('in', () => 'a' in obj)
      .add('hasOwnProperty', () => obj.hasOwnProperty('a'))
      .on('start', function (event) {
        this.options.name = event.currentTarget.map('name').join(' vs ')
        console.log(this.options.name)
      })
      .on('cycle', event => console.log(String(event.target)))
      .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'))
      })
      .run()

    // Obj access vs in vs hasOwnProperty
    // Obj access x 631,520,891 ops/sec ±0.70% (60 runs sampled)
    // in x 646,069,908 ops/sec ±0.41% (65 runs sampled)
    // hasOwnProperty x 56,478,119 ops/sec ±0.98% (64 runs sampled)
    // Fastest is in
  })()

  yield (() => {
    const suite = new Benchmark.Suite;

    const list = Array(10).fill()

    suite
      .add('negative while', () => {
        let i = list.length
        while (--i) { }
      })
      .add('positive while', () => {
        let i = 0
        while (i <= list.length) { i++ }
      })
      .on('start', function (event) {
        this.options.name = event.currentTarget.map('name').join(' vs ')
        console.log(this.options.name)
      })
      .on('cycle', event => console.log(String(event.target)))
      .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'))
      })
      .run()

    // negative while vs positive while
    // negative while x 90,186,192 ops/sec ±1.06% (58 runs sampled)
    // positive while x 122,177,764 ops/sec ±0.82% (63 runs sampled)
    // Fastest is positive while
  })()
}

const microPerformace = MicroPerformace()