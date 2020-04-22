import Benchmark from 'benchmark'

import Data from 'data'
import AppsToHosts from './appsToHosts'

const suite = new Benchmark.Suite;

const hosts = new AppsToHosts(Data)

suite.add('Algorithm', function () {
  hosts.topAppsByHost
})