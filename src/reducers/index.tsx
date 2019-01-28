import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { IBlockchainAction } from '../actions'
import { IBlockchainState, IStoreState } from '../types/index'
import { SET_ETH_ACCOUNT, SET_WEB3_STATE } from '../constants/index'

const initialState: IBlockchainState = {
  ethAccount: '',
  web3State: 'loading'
}

export function blockchain (
  state: IBlockchainState = initialState,
  action: IBlockchainAction
): IBlockchainState {
  switch (action.type) {
    case SET_ETH_ACCOUNT:
      return { ...state, ethAccount: action.value }
    case SET_WEB3_STATE:
      return { ...state, web3State: action.value }
  }
  return state
}

export const createRootReducer = (history: History) => combineReducers<IStoreState>({
  router: connectRouter(history),
  blockchain
})
