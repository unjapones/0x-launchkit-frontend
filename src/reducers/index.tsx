import { combineReducers, Reducer } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { SetEthAccountAction } from '../actions'
import { IBlockchainState, IStoreState } from '../types/index'
import { SET_ETH_ACCOUNT } from '../constants/index'

const initialState: IBlockchainState = {
  ethAccount: ''
}
export function blockchain (
  state: IBlockchainState = initialState,
  action: SetEthAccountAction
): IBlockchainState {
  switch (action.type) {
    case SET_ETH_ACCOUNT:
      return { ...state, ethAccount: action.value }
  }
  return state
}

export const createRootReducer = (history: History) => combineReducers<IStoreState>({
  router: connectRouter(history),
  blockchain
})
