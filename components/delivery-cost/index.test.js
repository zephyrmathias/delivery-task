import React from 'react'
import { shallow } from 'enzyme'
import { render, fireEvent, screen } from '@testing-library/react'
import DeliveryCost from './index'

const mockData = [
  { start: 'A', end: 'B', cost: 1 },
  { start: 'A', end: 'C', cost: 4 },
  { start: 'A', end: 'D', cost: 10 },
  { start: 'B', end: 'E', cost: 3 },
  { start: 'C', end: 'D', cost: 4 },
  { start: 'C', end: 'F', cost: 2 },
  { start: 'D', end: 'E', cost: 1 },
  { start: 'E', end: 'B', cost: 3 },
  { start: 'E', end: 'A', cost: 2 },
  { start: 'F', end: 'D', cost: 1 },
]

test('should match snapshot', () => {
  const component = shallow(<DeliveryCost data={mockData} />)
  expect(component).toMatchSnapshot()
})

test('should set Routes value when typing on Routes Input', () => {
  render(<DeliveryCost data={mockData} />)
  const routes = screen.getByPlaceholderText('Delivery Routes')
  fireEvent.change(routes, { target: { value: 'A' } })
  expect(routes.value).toBe('A')
})

test('should show an error message clicking on calculate cost button when there is no routes', () => {
  const { getByText } = render(<DeliveryCost data={mockData} />)
  const button = screen.getByText('Calculate Delivery Cost')
  fireEvent.click(button)
  const error = getByText('ERROR: Incorrect Input Format')
  expect(error).toBeTruthy()
})

test('should show an error message clicking on calculate cost button when routes contain when string', () => {
  const { getByText } = render(<DeliveryCost data={mockData} />)
  const routes = screen.getByPlaceholderText('Delivery Routes')
  fireEvent.change(routes, { target: { value: 'A' } })
  const button = screen.getByText('Calculate Delivery Cost')
  fireEvent.click(button)
  const error = getByText('ERROR: Incorrect Input Format')
  expect(error).toBeTruthy()
})

test('should return total cost 4 when type routes as A-B-E against mock data', () => {
  const { getByText } = render(<DeliveryCost data={mockData} />)
  const routes = screen.getByPlaceholderText('Delivery Routes')
  fireEvent.change(routes, { target: { value: 'A-B-E' } })
  const button = screen.getByText('Calculate Delivery Cost')
  fireEvent.click(button)
  const error = getByText('Delivery Cost = 4')
  expect(error).toBeTruthy()
})

test('should return No Such Route when type routes that does not exist against mock data', () => {
  const { getByText } = render(<DeliveryCost data={mockData} />)
  const routes = screen.getByPlaceholderText('Delivery Routes')
  fireEvent.change(routes, { target: { value: 'A-B-Q' } })
  const button = screen.getByText('Calculate Delivery Cost')
  fireEvent.click(button)
  const error = getByText('Delivery Cost = No Such Route')
  expect(error).toBeTruthy()
})
