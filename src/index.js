import Data from 'data'
import AppsToHosts from './appsToHosts'


const hosts = new AppsToHosts(Data)


console.log(hosts.topAppsByHost)

const root = document.getElementById('root')

root.innerHTML = 'App'