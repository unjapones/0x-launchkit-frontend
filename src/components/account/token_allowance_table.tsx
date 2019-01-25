import React from 'react'

import { ITokenAccountStatus } from './token_allowance'
import { TokenAllowanceRow } from './token_allowance_row'

interface ITokenAllowanceTableProps {
  allowances: ITokenAccountStatus[]
}

class TokenAllowanceTable extends React.PureComponent<
  ITokenAllowanceTableProps
> {
  public render = () => {
    const { allowances } = this.props

    const rows = allowances.length === 0
      ? <tr><td colSpan={3}>No tokens found</td></tr>
      : allowances.map(
        (tokenAccountStatus: ITokenAccountStatus) =>
        <TokenAllowanceRow tokenAccountStatus={tokenAccountStatus} key={tokenAccountStatus.tokenName}/>
      )

    return (
      <table>
        <thead>
          <tr>
            <td>Token</td>
            <td>Trading Allowed?</td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

export { TokenAllowanceTable }
