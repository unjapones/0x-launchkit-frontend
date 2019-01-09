import React from 'react'
import * as log from 'loglevel'
import BigNumber from 'bignumber.js'
import { HttpClient } from '@0x/connect'
import { Provider } from '@0x/subproviders'
import getRelayerClient from '../../lib/getRelayerClient'
import { createBasicSignedOrder } from '../../lib/orderUtils'
import { ITokenData, getTokenDataBySymbol } from '../../common/tokens'
import BasicOrderForm from './BasicOrderForm'

const logger = log.getLogger('CreateOrder')

export interface ICreateOrderProps {
  relayerClient: HttpClient
  provider: Provider
  makerAddress: string
  makerAssetSymbol: string
  takerAssetSymbol: string
}

interface ICreateOrderState {
  makerAssetTokenData: ITokenData
  takerAssetTokenData: ITokenData
}

class CreateOrder extends React.Component<ICreateOrderProps, ICreateOrderState> {
  private relayerClient: HttpClient
  private provider: Provider

  constructor (props: any | ICreateOrderProps) {
    super(props)
    this.relayerClient = props.relayerClient
    this.provider = props.provider
    this.createSingedOrderAndSubmit = this.createSingedOrderAndSubmit.bind(this)
    this.state = {
      makerAssetTokenData: getTokenDataBySymbol(this.props.makerAssetSymbol),
      takerAssetTokenData: getTokenDataBySymbol(this.props.takerAssetSymbol)
    }
  }

  public async createSingedOrderAndSubmit (args: {
    makerAssetAmount: BigNumber
    takerAssetAmount: BigNumber
  }) {
    const { makerAddress } = this.props
    const { makerAssetTokenData, takerAssetTokenData } = this.state
    const signedOrder = await createBasicSignedOrder({
      makerAddress,
      makerAssetTokenData,
      takerAssetTokenData,
      makerAssetAmount: args.makerAssetAmount,
      takerAssetAmount: args.takerAssetAmount,
      provider: this.provider
    })

    // @TODO: move into its on file/module in src/lib
    await this.relayerClient.submitOrderAsync(signedOrder, { networkId: 42 })
  }

  public render () {
    const { makerAssetTokenData, takerAssetTokenData } = this.state
    return (
      <BasicOrderForm
        makerAssetLabel={makerAssetTokenData.symbol}
        takerAssetLabel={takerAssetTokenData.symbol}
        onSubmit={this.createSingedOrderAndSubmit}
      />
    )
  }

  public async componentDidMount () {
    try {
      this.relayerClient = this.relayerClient || (await getRelayerClient())
    } catch (error) {
      logger.error(error)
    }
  }
}

export { CreateOrder }
export default CreateOrder
