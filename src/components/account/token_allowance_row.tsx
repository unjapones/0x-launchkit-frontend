import React from 'react'
import { ITokenAccountStatus } from './token_allowance'

interface ITokenAllowanceRowProps {
  tokenAccountStatus: ITokenAccountStatus
}

const TokenAllowanceRow: React.FunctionComponent<ITokenAllowanceRowProps> = (props) => {
  const { tokenName, isTradingAllowed } = props.tokenAccountStatus
  return (
    <tr>
      <td>{tokenName}</td>
      <td>{isTradingAllowed ? 'true' : 'false'}</td>
    </tr>
  )
}

export { TokenAllowanceRow }
