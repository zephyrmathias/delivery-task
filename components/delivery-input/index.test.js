import React from 'react'
import { shallow } from 'enzyme'
import DeliveryData from './index'

const props = {
  town1: '',
  town2: '',
  cost: '',
  onChangeTown1: jest.fn(),
  onChangeTown2: jest.fn(),
  onChangeCost: jest.fn(),
  onSubmitInput: jest.fn(),
}

test('should match snapshot', () => {
  const component = shallow(<DeliveryData {...props} />)
  expect(component).toMatchSnapshot()
})

test('should show an error message when it contains an error', () => {
  const component = shallow(<DeliveryData {...props} error="error" />)
  expect(component).toMatchSnapshot()
})

test('should show a list of routes when it contains the data', () => {
  const data = [{ start: 'A', end: 'B', cost: 2 }]
  const component = shallow(<DeliveryData {...props} data={data} />)
  expect(component).toMatchSnapshot()
})
