import React from 'react'
import { withWeb3 } from 'react-web3-provider'
import { HttpClient } from '@0x/connect'
import getRelayerClient from '../../lib/getRelayerClient'
import { CreateOrder } from './CreateOrder'

interface ICreateOrderWithClientProps {
  web3?: any
}
interface ICreateOrderWithClientState {
  ethAccount: string
}

class CreateOrderWithClient extends React.Component<ICreateOrderWithClientProps, ICreateOrderWithClientState> {
  private relayerClient: HttpClient

  constructor (props: any) {
    super(props)
    this.relayerClient = getRelayerClient()
    this.state = { ethAccount: '' }
  }

  public componentDidUpdate (prevProps: any) {
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
    const { web3 } = this.props
    if (web3 && ethAccount !== '') {
      return (
        <div className='CreateOrderWithClient'>
          <CreateOrder
            relayerClient={this.relayerClient}
            provider={web3.currentProvider}
            makerAddress={ethAccount}
            makerAssetSymbol='WETH'
            takerAssetSymbol='ZRX'
          />
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

const CreateOrderWithWeb3 = withWeb3(CreateOrderWithClient)
export { CreateOrderWithWeb3 }
export default CreateOrderWithClient
