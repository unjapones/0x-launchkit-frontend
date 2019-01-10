import React from 'react'
import { WalletConnectionStatusWithWeb3 } from './Account'
import { CreateOrderWithWeb3 } from './CreateOrder'
import { AssetPairsList } from './Assets'

import {
  Container,
  Columns,
  Column,
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarStart,
  NavbarEnd,
  NavbarItem,
  Field,
  Control,
  Button
} from 'bloomer'
import './App.css'

const APP_CLASSNAME = 'app-container'

const App = () => (
  <React.Fragment>
    <Navbar className='is-dark'>
      <Container>
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
    <Container className={APP_CLASSNAME}>
      <Columns>
        <Column isSize='1/2'>
          <AssetPairsList />
        </Column>
        <Column isSize='1/2'>
          <CreateOrderWithWeb3 />
        </Column>
      </Columns>
    </Container>
  </React.Fragment>
)

export default App
