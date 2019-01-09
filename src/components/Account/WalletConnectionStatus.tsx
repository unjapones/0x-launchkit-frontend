import React from 'react'
import { withWeb3 } from 'react-web3-provider'

interface IWalletConnectionStatusProps {
  web3: any
}
interface IWalletConnectionStatusState {
  ethAccount: string
}

class WalletConnectionStatus extends React.Component<IWalletConnectionStatusProps, IWalletConnectionStatusState> {
  constructor (props: any) {
    super(props)
    this.state = {
      ethAccount: ''
    }
  }

  public componentDidUpdate (prevProps: IWalletConnectionStatusProps) {
    const { web3 } = this.props
    if (prevProps.web3 !== web3) {
      const { ethAccount } = this.state
      web3.eth.getAccounts().then((accounts: string[]) => {
        if (ethAccount !== accounts[0]) {
          this.setState({ ethAccount: accounts[0] })
        }
      })
    }
  }

  public render () {
    const { ethAccount } = this.state
    return (
      <div className='wallet-connection-status'>
        <span>{ethAccount ? `Connected with: ${ethAccount}` : 'Not connected'}</span>
      </div>
    )
  }
}

const WalletConnectionStatusWithWeb3 = withWeb3(WalletConnectionStatus)

export {
  WalletConnectionStatusWithWeb3,
  WalletConnectionStatus
}
export default WalletConnectionStatus
