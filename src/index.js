import Data from 'data'
import Apdex from './models/apdex'


const apdex = new Apdex(Data)

apdex.sortedData

const root = document.getElementById('root')

root.innerHTML = 'App'