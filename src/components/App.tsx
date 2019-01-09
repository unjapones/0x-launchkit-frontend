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
import { CreateBasicOrderExample } from './Order'
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
          <CreateBasicOrderExample />
        </Column>
      </Columns>
    </Container>
  </React.Fragment>
)

export default App
