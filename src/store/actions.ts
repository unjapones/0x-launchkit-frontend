import { Web3Wrapper } from '@0x/web3-wrapper'
import * as constants from './constants'

export interface ISetEthAccount {
  type: constants.SET_ETH_ACCOUNT
  value: string
}

export interface ISetWeb3State {
  type: constants.SET_WEB3_STATE
  value: string
}

export type IBlockchainAction = ISetEthAccount | ISetWeb3State

export const setEthAccount = (ethAccount: string = ''): ISetEthAccount => {
  return {
    type: constants.SET_ETH_ACCOUNT,
    value: ethAccount
  }
}

export const setWeb3State = (web3State: string = 'loading'): ISetWeb3State => {
  return {
    type: constants.SET_WEB3_STATE,
    value: web3State
  }
}

export function initWallet () {
  return async (dispatch: any) => {
    dispatch(setWeb3State('loading'))

    const web3Wrapper = await createEthereumClient()

    if (web3Wrapper) {
      const accounts = await web3Wrapper.getAvailableAddressesAsync()

      dispatch(setEthAccount(accounts[0]))
      dispatch(setWeb3State('done'))
    } else {
      dispatch(setWeb3State('error'))
    }
  }
}

const createEthereumClient = async () => {
  const provider: any = window.ethereum || window.web3

  if (window.ethereum) {
    const web3Wrapper = new Web3Wrapper(provider)

    try {
      // Request account access if needed
      await provider.enable()

      return web3Wrapper
    } catch (error) {
      // TODO: User denied account access
      return null
    }
  } else if (window.web3) {
    return new Web3Wrapper(window.web3.currentProvider)
  }
}
