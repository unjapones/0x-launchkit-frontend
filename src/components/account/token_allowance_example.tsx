import React from 'react'
import { withWeb3 } from 'react-web3-provider'
import { TokenAllowance } from './token_allowance'

const TokenAllowanceWithWeb3 = withWeb3(TokenAllowance)

const TokenAllowanceExample = () => {
  return <TokenAllowanceWithWeb3 />
}

export { TokenAllowanceExample }
