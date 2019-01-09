import React from 'react'
import { HttpClient } from '@0x/connect'
import { AssetPairsResponse, AssetPairsItem, ERC20AssetData } from '@0x/types'
import { assetDataUtils } from '0x.js'
import { log } from '../../etc'
import getRelayerClient from '../../lib/getRelayerClient'
import { ITokenData, getTokenDataByAddress } from '../../common/tokens'
import { Title, Table } from 'bloomer'

const logger = log.getLogger('AssetPairs')

interface IAssetPairsListState {
  assetPairs: AssetPairsItem[]
}

interface ITokenDataPair {
  [key: string]: ITokenData
}

class AssetPairsList extends React.Component<{}, IAssetPairsListState> {
  private relayerClient: HttpClient | null = null
  public state = {
    assetPairs: []
  }

  public componentDidMount = async () => {
    try {
      this.relayerClient = await getRelayerClient()
      const response: AssetPairsResponse = await this.relayerClient.getAssetPairsAsync()
      this.setState({
        assetPairs: response.records
      })
    } catch (error) {
      logger.error(error)
    }
  }

  public render = () => {
    const assetPairs: AssetPairsItem[] = this.state.assetPairs
    const tokenDataPairs = this.mapAssetPairsToTokenDataPairs(assetPairs)
    const tokenDataPairsAsTableRows = tokenDataPairs.map((tokenDataPair: ITokenDataPair) => {
      const symbols = Object.keys(tokenDataPair)
      const tokenA = tokenDataPair[symbols[0]]
      const tokenB = tokenDataPair[symbols[1]]
      const symbolsString = `${symbols[0]} / ${symbols[1]}`
      return (
        <tr key={symbolsString}>
          <td>
            {symbolsString}
          </td>
          <td>
            {`${tokenA.name} / ${tokenB.name}`}
          </td>
        </tr>
      )
    })
    const assetPairsUnorderedListContent = (
      <Table isBordered isStriped>
        <thead>
          <tr>
            <td>
              Symbols
            </td>
            <td>
              Names
            </td>
          </tr>
        </thead>
        <tbody>
          {tokenDataPairsAsTableRows}
        </tbody>
      </Table>
    )
    const noAssetPairsContent = (
      <p>No asset pairs found.</p>
    )

    const content = tokenDataPairsAsTableRows.length > 0 ? assetPairsUnorderedListContent : noAssetPairsContent
    return (
      <React.Fragment>
        <Title isSize={2}>Available Asset Pairs</Title>
        {content}
      </React.Fragment>
    )
  }

  private mapAssetPairsToTokenDataPairs = (assetPairs: AssetPairsItem[]): ITokenDataPair[] => {
    return assetPairs.map((ap: AssetPairsItem) => {
      const assetDataA = assetDataUtils.decodeAssetDataOrThrow(ap.assetDataA.assetData) as ERC20AssetData
      const assetDataB = assetDataUtils.decodeAssetDataOrThrow(ap.assetDataB.assetData) as ERC20AssetData
      const tokenDataA = getTokenDataByAddress(assetDataA.tokenAddress)
      const tokenDataB = getTokenDataByAddress(assetDataB.tokenAddress)
      return { [tokenDataA.symbol]: tokenDataA, [tokenDataB.symbol]: tokenDataB }
    })
  }
}

export { AssetPairsList }
