import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import WalletConnectionStatus from '../WalletConnectionStatus'

configure({ adapter: new Adapter() })

describe('WalletConnectionStatus', () => {
  it('shows "not connected" when web3 prop is falsy', () => {
    const wrapper = mount(<WalletConnectionStatus web3={null} />)
    expect(wrapper.find('span').text()).toEqual('Not connected')
  })

  it('renders correctly when a wallet and account is unlocked', (done) => {
    const wrapper = mount(<WalletConnectionStatus web3={null} />)
    const ethAccount = '0x...'
    const web3 = {
      eth: { getAccounts: () => Promise.resolve([ethAccount]) }
    }
    wrapper.setProps({ web3 })
    wrapper.update()
    // @TODO: fix/improve this re-render based on props change
    setTimeout(() => {
      expect(wrapper.find('span').text()).toEqual(`Connected with: ${ethAccount}`)
      done()
    }, 4000)
  })
})
