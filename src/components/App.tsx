import React from 'react'
import {
  Container,
  Columns,
  Column,
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarStart,
  NavbarEnd,
  NavbarItem
} from 'bloomer'
import { WalletConnectionStatusWithWeb3 } from './Account'
import { AssetPairsList } from './Assets'
import { CreateBasicOrderExample, BasicMakerOrdersListExample } from './Order'
import { BasicOrderBookListExample } from './OrderBook'
import './App.css'

const APP_CLASSNAME = 'app-container'

const App = () => (
  <React.Fragment>
    <Navbar className='is-dark'>
      <Container isFluid>
        <NavbarBrand>
          <NavbarStart>
            <NavbarItem href='/' isHidden='touch'><strong>0x-launchkit-frontend</strong></NavbarItem>
          </NavbarStart>
        </NavbarBrand>
        <NavbarMenu>
          <NavbarEnd>
            <NavbarItem>
              <WalletConnectionStatusWithWeb3 />
            </NavbarItem>
          </NavbarEnd>
        </NavbarMenu>
      </Container>
    </Navbar>
    <Container className={APP_CLASSNAME} isFluid>
      <Columns>
        <Column>
          <AssetPairsList />
          <CreateBasicOrderExample />
          <BasicMakerOrdersListExample />
          <BasicOrderBookListExample />
        </Column>
      </Columns>
    </Container>
  </React.Fragment>
)

export default App
