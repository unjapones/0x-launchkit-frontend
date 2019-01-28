import React from 'react'
import ReactDOM from 'react-dom'
import Web3Provider from 'react-web3-provider'
import { createBrowserHistory } from 'history'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker'
import { AppContainer } from './components/app'
import { Marketplace } from './pages/marketplace'
import { MyWallet } from './pages/my_wallet'
import { createRootReducer } from './store/reducers'
import './bulmaswatch-material.min.css'

export const history = createBrowserHistory()
const rootReducer = createRootReducer(history)

const store = createStore(rootReducer)

const Web3WrappedApp = (
  <Provider store={store}>
    <Web3Provider>
      <ConnectedRouter history={history}>
        <AppContainer>
          <Switch>
            <Route exact path='/' render={() => (<Marketplace />)} />
            <Route exact path='/my-wallet' render={() => (<MyWallet />)} />
          </Switch>
        </AppContainer>
      </ConnectedRouter>
    </Web3Provider>
  </Provider>
)

ReactDOM.render(Web3WrappedApp, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
