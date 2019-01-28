import React from 'react'
import { connect } from 'react-redux'

import { IStoreState } from '../../types'

interface IPropsFromState {
  ethAccount: string
}

type WallecConnectionStatusProps = IPropsFromState

class WalletConnectionStatus extends React.PureComponent<WallecConnectionStatusProps> {
  public render = () => {
    const { ethAccount } = this.props
    return (
      <div className='wallet-connection-status'>
        <span>{ethAccount ? `Connected with: ${ethAccount}` : 'Not connected'}</span>
      </div>
    )
  }
}

const mapStateToProps = (state: IStoreState): IPropsFromState => {
  const { ethAccount } = state.blockchain
  return {
    ethAccount
  }
}

const WalletConnectionStatusContainer = connect(mapStateToProps)(WalletConnectionStatus)

export { WalletConnectionStatus, WalletConnectionStatusContainer }
