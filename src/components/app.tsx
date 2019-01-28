import React from 'react'
import { withWeb3 } from 'react-web3-provider'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { setEthAccount, setWeb3State } from '../store/actions'

interface IAppOwnProps {
  web3: any
  web3State: any
  children: React.ReactNode
}

interface IPropsFromDispatch {
  onSetEthAccount: (ethAccount: string) => any
  onSetWeb3State: (web3State: string) => any
}

type AppProps = IAppOwnProps & IPropsFromDispatch

class App extends React.Component<AppProps> {
  public componentDidUpdate = (prevProps: AppProps) => {
    const { web3, web3State, onSetEthAccount, onSetWeb3State } = this.props
    if (prevProps.web3 !== web3) {
      web3.eth
        .getAccounts()
        .then((accounts: string[]) => {
          onSetEthAccount(accounts[0])
          onSetWeb3State('ready')
        })
        .catch(() => {
          // @TODO: log err/do something
          onSetWeb3State('error')
        })
    } else if (web3State.error) {
      onSetWeb3State('error')
    }
  }

  public render = () => this.props.children
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSetEthAccount: (ethAccount: string) => dispatch(setEthAccount(ethAccount)),
    onSetWeb3State: (web3State: string) => dispatch(setWeb3State(web3State))
  }
}

const AppContainer = withWeb3(
  connect(null, mapDispatchToProps)(App)
)

export { App, AppContainer }
