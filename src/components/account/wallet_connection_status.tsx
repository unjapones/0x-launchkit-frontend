import React from 'react'
import { connect } from 'react-redux'

import { IStoreState } from '../../types'

interface IPropsFromState {
  ethAccount: string
}

type WalletConnectionStatusProps = IPropsFromState

class WalletConnectionStatus extends React.PureComponent<WalletConnectionStatusProps> {
  public render = () => {
    const { ethAccount } = this.props
    return (
      <div className='wallet-connection-status'>
        <p>{ethAccount ? `Connected with: ${ethAccount}` : 'Not connected'}</p>
      </div>
    )
  }
}

const mapStateToProps = (state: IStoreState): IPropsFromState => {
  const { ethAccount } = state.blockchain
  return { ethAccount }
}

const WalletConnectionStatusContainer = connect(mapStateToProps)(WalletConnectionStatus)

export { WalletConnectionStatus, WalletConnectionStatusContainer }
