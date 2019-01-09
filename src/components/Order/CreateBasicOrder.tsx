import React from 'react'
import BigNumber from 'bignumber.js'
import getRelayerClient from '../../lib/getRelayerClient'
import { Title } from 'bloomer'
import { log } from '../../etc'
import { createBasicSignedOrder } from '../../lib/orderUtils'
import { ITokenData, getTokenDataBySymbol } from '../../common/tokens'
import BasicOrderForm from './BasicOrderForm'

const logger = log.getLogger('CreateBasicOrder')

export interface ICreateBasicOrderProps {
  makerAssetSymbol: string
  takerAssetSymbol: string
  web3?: any
}

interface ICreateBasicOrderState {
  makerAssetTokenData: ITokenData
  takerAssetTokenData: ITokenData
  ethAccount: string
}

class CreateBasicOrder extends React.Component<ICreateBasicOrderProps, ICreateBasicOrderState> {
  public state = {
    makerAssetTokenData: getTokenDataBySymbol(this.props.makerAssetSymbol),
    takerAssetTokenData: getTokenDataBySymbol(this.props.takerAssetSymbol),
    ethAccount: ''
  }

  public componentDidUpdate = async (prevProps: any) => {
    const { web3 } = this.props
    if (prevProps.web3 !== web3) {
      const { ethAccount } = this.state
      logger.info('web3 detected')
      // @TODO: ethAccount is used to check & render "no web3", but using it will be a common thing
      // generalize and ease its fetch/access for future UI components
      const accounts: string[] = await web3.eth.getAccounts()
      if (accounts && accounts.length > 0 && ethAccount !== accounts[0]) {
        logger.info(`web3 accounts[0]: ${accounts[0]}`)
        this.setState({ ethAccount: accounts[0] })
      }
    }
  }

  public createSingedOrderAndSubmit = async (args: {
    makerAssetAmount: BigNumber
    takerAssetAmount: BigNumber
  }): Promise<boolean> => {
    let success = false
    try {
      const { web3 } = this.props
      const { makerAssetTokenData, takerAssetTokenData, ethAccount } = this.state
      const signedOrder = await createBasicSignedOrder({
        makerAddress: ethAccount,
        makerAssetTokenData,
        takerAssetTokenData,
        makerAssetAmount: args.makerAssetAmount,
        takerAssetAmount: args.takerAssetAmount,
        provider: web3.currentProvider
      })
      logger.info('signedOrder', signedOrder)
      // @TODO: move into its own file/module in src/lib (networkId should be auto-configured)
      await getRelayerClient().submitOrderAsync(signedOrder, { networkId: 42 })
      logger.info('signedOrder successfully submitted')
      success = true
    } catch (error) {
      logger.error(error)
    }
    return success
  }

  private renderBasicForm = () => {
    const { makerAssetTokenData, takerAssetTokenData } = this.state
    return (
      <BasicOrderForm
        makerAssetLabel={makerAssetTokenData.symbol}
        takerAssetLabel={takerAssetTokenData.symbol}
        onSubmit={this.createSingedOrderAndSubmit}
      />
    )
  }

  private renderNoWeb3 = () => {
    return <p>Web3 not found.</p>
  }

  public render = () => {
    const { ethAccount } = this.state
    const { web3 } = this.props
    return (
      <React.Fragment>
        <Title isSize={2}>Create Basic Order</Title>
        {(web3 && ethAccount) ? this.renderBasicForm() : this.renderNoWeb3()}
      </React.Fragment>
    )
  }
}

export { CreateBasicOrder }
