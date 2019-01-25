import React from 'react'
import ReactDOM from 'react-dom'
import Web3Provider from 'react-web3-provider'
import { createBrowserHistory } from 'history'
import { Route, Switch } from 'react-router' // react-router v4
import { ConnectedRouter } from 'connected-react-router'

import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import App from './components/app'
// import 'bulma/css/bulma.css'
import './bulmaswatch-material.min.css'

import { createStore } from 'redux'
import { createRootReducer } from './reducers/index'
import { IStoreState } from './types/index'

export const history = createBrowserHistory()
const rootReducer = createRootReducer(history)

const store = createStore<IStoreState, any, any, any>(rootReducer)

const Web3WrappedApp = (
  <Provider store={store}>
    <Web3Provider>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path='/' render={() => (<App />)} />
          </Switch>
      </ConnectedRouter>
    </Web3Provider>
  </Provider>
)

ReactDOM.render(Web3WrappedApp, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
