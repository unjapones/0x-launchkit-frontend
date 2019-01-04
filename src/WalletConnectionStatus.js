import React from 'react';
import { withWeb3 } from 'react-web3-provider';

class WalletConnectionStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ethAccount: null
    };
  }

  componentDidUpdate(prevProps) {
    const { web3 } = this.props;
    if (prevProps.web3 !== web3) {
      const { ethAccount } = this.state;
      web3.eth.getAccounts().then(accounts => {
        if (ethAccount !== accounts[0]) {
          this.setState({ ethAccount: accounts[0] });
        }
      });
    }
  }

  render() {
    const { ethAccount } = this.state;
    return (
      <div className="wallet-connection-status">
        <span>{ethAccount || 'Not connected'}</span>
      </div>
    );
  }
}

export const WalletConnectionStatusWithWeb3 = withWeb3(WalletConnectionStatus);
export default WalletConnectionStatus;
