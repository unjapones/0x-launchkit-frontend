import * as constants from '../constants'

export interface ISetEthAccount {
  type: constants.SET_ETH_ACCOUNT
  value: string
}

export type SetEthAccountAction = ISetEthAccount

export const setEthAccount = (ethAccount: string = ''): ISetEthAccount => {
  return {
    type: constants.SET_ETH_ACCOUNT,
    value: ethAccount
  }
}
