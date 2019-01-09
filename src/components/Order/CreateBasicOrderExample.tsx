import React from 'react'
import { withWeb3 } from 'react-web3-provider'
import { CreateBasicOrder } from './CreateBasicOrder'

const CreateBasicOrderWithWeb3 = withWeb3(CreateBasicOrder)

const CreateBasicOrderExample = () => {
  return <CreateBasicOrderWithWeb3 makerAssetSymbol='WETH' takerAssetSymbol='ZRX' />
}

export { CreateBasicOrderExample }
