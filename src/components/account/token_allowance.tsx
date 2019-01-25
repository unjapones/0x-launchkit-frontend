import React from 'react'
import {
  ContractWrappers,
  ERC20TokenWrapper,
  MetamaskSubprovider,
  RPCSubprovider,
  Web3ProviderEngine
} from '0x.js'
import { SignerSubprovider } from '@0x/subproviders'

import { NETWORK_ID, NETWORK_RPC_URI_BY_ID } from '../../common/constants'
import { tokenDataCollectionsByNetworkId } from '../../common/tokens'
import { log } from '../../etc'

import { TokenAllowanceTable } from './token_allowance_table'

const logger = log.getLogger('token_allowance')

export interface ITokenAccountStatus {
  tokenName: string
  balance: BigNumber
  isTradingAllowed: boolean
}

const getContractWrappers = (): ContractWrappers => {
  const injectedProviderIfExists = (window as any).ethereum
  const signerProvider =
    injectedProviderIfExists.isMetaMask || injectedProviderIfExists.isToshi
      ? new MetamaskSubprovider(injectedProviderIfExists)
      : new SignerSubprovider(injectedProviderIfExists)
  const provider = new Web3ProviderEngine()
  // Why do we need to instantiate Web3ProviderEngine and then
  // set/add "sigerProvider?"
  provider.addProvider(signerProvider)
  provider.addProvider(new RPCSubprovider(NETWORK_RPC_URI_BY_ID[NETWORK_ID]))
  provider.start()
  return new ContractWrappers(provider, { networkId: NETWORK_ID })
}

const getBalanceAndAllowancesOfAllTokens = async (
  erc20TokenWrapper: ERC20TokenWrapper,
  ethAddress: string
): Promise<ITokenAccountStatus[]> => {
  try {
    const tokensData = tokenDataCollectionsByNetworkId[NETWORK_ID]
    logger.debug(ethAddress)
    logger.debug(tokensData)
    const getInfoPromises = tokensData.map(async (tokenData) => {
      const allowance = await erc20TokenWrapper.getProxyAllowanceAsync(
        tokenData.address,
        ethAddress
      )
      const balance = await erc20TokenWrapper.getBalanceAsync(
        tokenData.address, ethAddress
      )
      logger.debug(`allowance: ${allowance.toString()}`)
      return {
        // balance,
        tokenName: tokenData.name,
        // We should probably return allowance, and let the UI represent it as
        // a truthy/falsy thing
        isTradingAllowed: allowance.gt(0)
      }
    })
    return await Promise.all(getInfoPromises)
  } catch (err) {
    logger.error(err)
    return Promise.resolve([])
  }
}

interface ITokenAllowanceProps {
  web3?: any
}

interface ITokenAllowanceState {
  ethAccount: string,
  tokenStatuses: ITokenAccountStatus[]
}

class TokenAllowance extends React.Component<ITokenAllowanceProps, ITokenAllowanceState> {
  public state = {
    ethAccount: '',
    tokenStatuses: []
  }

  public componentDidUpdate = async (prevProps: any) => {
    const { web3 } = this.props
    if (prevProps.web3 !== web3) {
      const { ethAccount } = this.state
      const accounts: string[] = await web3.eth.getAccounts()
      if (accounts && accounts.length > 0 && ethAccount !== accounts[0]) {
        const contractWrappers = getContractWrappers()
        const tokenStatuses = await getBalanceAndAllowancesOfAllTokens(
          contractWrappers.erc20Token,
          accounts[0]
        )
        this.setState({
          tokenStatuses,
          ethAccount: accounts[0]
        })
      }
    }
  }

  public render = () => {
    const { tokenStatuses } = this.state
    return tokenStatuses
      ? < TokenAllowanceTable allowances={tokenStatuses} />
      : <p>No allowances...</p>
  }
}

export { TokenAllowance }
