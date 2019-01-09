import React from 'react'
import { WalletConnectionStatusWithWeb3 } from './Account'
import { CreateOrderWithWeb3 } from './CreateOrder'

const App = () => (
  <div className='App'>
    <header className='App-header'>
      <WalletConnectionStatusWithWeb3 />
    </header>
    <section>
      <CreateOrderWithWeb3 />
    </section>
  </div>
)

export default App
