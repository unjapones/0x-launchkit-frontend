import React from 'react'
import { HttpClient } from '@0x/connect'
import { Web3Wrapper } from '@0x/web3-wrapper'
import { APIOrder, PaginatedCollection, ERC20AssetData } from '@0x/types'
import { BigNumber, assetDataUtils } from '0x.js'
import { log } from '../../etc'
import { getTokenDataByAddress } from '../../common/tokens'
import getRelayerClient from '../../lib/getRelayerClient'
import { Title, Table, Control, Select } from 'bloomer'

const logger = log.getLogger('AssetPairs')
const DEFAULT_PER_PAGE = 5
const DEFAULT_UNIT_AMOUNT_DECIMALS = 4

interface IBasicMakerOrdersListProps {
  relayerClient?: HttpClient
  perPage?: number
  web3?: any
}

interface IBasicMakerOrdersListState {
  loading: boolean
  paginatedCollection: PaginatedCollection<APIOrder>
  relayerClient: HttpClient
  ethAccount: string
}

class BasicMakerOrdersList extends React.Component<IBasicMakerOrdersListProps, IBasicMakerOrdersListState> {
  public state = {
    loading: true,
    paginatedCollection: {
      total: 0,
      page: 0,
      perPage: 0,
      records: []
    },
    relayerClient: this.props.relayerClient || getRelayerClient(),
    ethAccount: ''
  }

  public componentDidUpdate = async (prevProps: any) => {
    const { web3 } = this.props
    if (prevProps.web3 !== web3) {
      const { ethAccount } = this.state
      // @TODO: ethAccount is used to check & render "no web3", but using it will be a common thing
      // generalize and ease its fetch/access for future UI components
      const accounts: string[] = await web3.eth.getAccounts()
      if (accounts && accounts.length > 0 && ethAccount !== accounts[0]) {
        this.setState({ ethAccount: accounts[0] })
        this.getOrders()
      }
    }
  }

  public getOrders = async (page: number = 0) => {
    try {
      const { relayerClient, ethAccount } = this.state
      const perPage = this.props.perPage || DEFAULT_PER_PAGE
      const paginatedCollection: PaginatedCollection<APIOrder> = await relayerClient
        .getOrdersAsync({
          page,
          perPage,
          makerAddress: ethAccount.toLowerCase(),
          networkId: 42
        })
      this.setState({
        loading: false,
        paginatedCollection
      })
    } catch (error) {
      logger.error(error)
    }
  }

  public render = () => {
    const { loading, paginatedCollection } = this.state

    if (loading || !paginatedCollection === null) {
      return this.renderLoading()
    }

    const content = paginatedCollection.records.length > 0 ? this.renderTable() : this.renderNoResults
    return (
      <React.Fragment>
        <Title isSize={2}>Available Asset Pairs</Title>
        {content}
      </React.Fragment>
    )
  }

  private renderLoading = () => {
    return <p>Loading...</p>
  }

  private renderNoResults = () => {
    return <p>No asset pairs found.</p>
  }

  private renderTable = () => {
    const { paginatedCollection } = this.state
    const orderRows = paginatedCollection.records.map((record: APIOrder) => {
      const { order } = record
      const makerAssetData = assetDataUtils.decodeAssetDataOrThrow(order.makerAssetData) as ERC20AssetData
      const takerAssetData = assetDataUtils.decodeAssetDataOrThrow(order.takerAssetData) as ERC20AssetData
      const makerToken = getTokenDataByAddress(makerAssetData.tokenAddress)
      const takerToken = getTokenDataByAddress(takerAssetData.tokenAddress)
      const makerAssetAmount = Web3Wrapper.toUnitAmount(
          new BigNumber(order.makerAssetAmount),
          makerToken.decimals
        ).toFixed(DEFAULT_UNIT_AMOUNT_DECIMALS)
      const takerAssetAmount = Web3Wrapper.toUnitAmount(
          new BigNumber(order.takerAssetAmount),
          takerToken.decimals
        ).toFixed(DEFAULT_UNIT_AMOUNT_DECIMALS)
      return (
        <tr key={order.salt.toString()}>
          <td>
            {order.makerAddress}
            <br/>
            {makerToken.symbol}
            <br/>
            {makerAssetAmount}
          </td>
          <td>
            {order.takerAddress}
            <br/>
            {takerToken.symbol}
            <br/>
            {takerAssetAmount}
          </td>
        </tr>
      )
    })
    const table = (
      <Table isBordered isStriped>
        <thead>
          <tr>
            <td>
              (Maker)
              <br/>
              Address
              <br/>
              Asset
              <br/>
              Amount
            </td>
            <td>
              (Taker)
              <br/>
              Address
              <br/>
              Asset
              <br/>
              Amount
            </td>
          </tr>
        </thead>
        <tbody>
          {orderRows}
        </tbody>
      </Table>
    )
    return (
      <React.Fragment>
        {this.renderTablePagination()}
        <br />
        {table}
      </React.Fragment>
    )
  }

  private renderTablePagination = () => {
    const { paginatedCollection } = this.state
    const pages = Math.ceil(paginatedCollection.total / paginatedCollection.perPage)
    if (pages <= 1) {
      return null
    }
    const options = []
    for (let i = 0; i < pages; i++) {
      options.push(
        <option key={i} value={i}>Page {i + 1}</option>
      )
    }

    return (
      <Control>
        <Select onChange={this.onTablePageSelect} value={paginatedCollection.page}>
          {options}
        </Select>
      </Control>
    )
  }

  private onTablePageSelect = (evt: React.BaseSyntheticEvent) => {
    this.getOrders(evt.target.options.selectedIndex)
  }
}

export { BasicMakerOrdersList }
