import { connect } from 'react-redux'

import { IStoreState } from '../../store/types'
import { BasicMakerOrdersList } from './basic_maker_order_list'

interface IPropsFromState {
  ethAccount: string
}

const mapStateToProps = (state: IStoreState): IPropsFromState => {
  const { ethAccount } = state.blockchain
  return {
    ethAccount
  }
}

const BasicMakerOrdersListExample = connect(mapStateToProps)(BasicMakerOrdersList)

export { BasicMakerOrdersListExample }
