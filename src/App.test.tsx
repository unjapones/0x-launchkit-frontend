import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'

configure({ adapter: new Adapter() })

it('shallow renders without crashing', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('.App')).toHaveLength(1)
})
