import React from 'react'
import ReactDOM from 'react-dom'
import Web3Provider from 'react-web3-provider'
import * as serviceWorker from './serviceWorker'
import App from './components/app'
// import 'bulma/css/bulma.css'
import './bulmaswatch-material.min.css'

const Web3WrappedApp = (
  <Web3Provider>
    <App />
  </Web3Provider>
)

ReactDOM.render(Web3WrappedApp, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
