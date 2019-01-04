import React from 'react';
import './App.css';
import { WalletConnectionStatusWithWeb3 } from './WalletConnectionStatus';

const App = () => (
  <div className="App">
    <header className="App-header">
      <WalletConnectionStatusWithWeb3 />
    </header>
  </div>
);

export default App;
