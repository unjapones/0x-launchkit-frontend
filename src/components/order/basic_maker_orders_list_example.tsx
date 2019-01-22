import React from 'react'
import { withWeb3 } from 'react-web3-provider'
import { BasicMakerOrdersList } from './basic_maker_order_list'

const BasicMakerOrdersListWithWeb3 = withWeb3(BasicMakerOrdersList)

const BasicMakerOrdersListExample = () => {
  return <BasicMakerOrdersListWithWeb3 />
}

export { BasicMakerOrdersListExample }
