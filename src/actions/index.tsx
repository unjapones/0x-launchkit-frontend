import * as constants from '../constants'

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
