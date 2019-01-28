import React from 'react'
import { withWeb3 } from 'react-web3-provider'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
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
import { setEthAccount } from '../actions'
import { WalletConnectionStatusContainer } from './account'
import { AssetPairsList } from './assets'
import { CreateBasicOrderExample, BasicMakerOrdersListExample } from './order'
import { BasicOrderBookListExample } from './orderbook'
import './app.css'

const APP_CLASSNAME = 'app-container'

interface IAppOwnProps {
  web3: any
}

interface IPropsFromDispatch {
  onSetEthAccount: (ethAccount: string) => any
}

type AppProps = IAppOwnProps & IPropsFromDispatch

class App extends React.Component<AppProps> {
  public componentDidUpdate = (prevProps: AppProps) => {
    const { web3, onSetEthAccount } = this.props
    if (prevProps.web3 !== web3) {
      web3.eth
        .getAccounts()
        .then((accounts: string[]) => onSetEthAccount(accounts[0]))
    }
  }

  public render = () => (
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
                <WalletConnectionStatusContainer />
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
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSetEthAccount: (ethAccount: string) => dispatch(setEthAccount(ethAccount))
  }
}

const AppContainer = withWeb3(
  connect(null, mapDispatchToProps)(App)
)

export { App, AppContainer }
