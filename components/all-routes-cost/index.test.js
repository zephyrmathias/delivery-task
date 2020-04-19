import React from 'react'
import { shallow } from 'enzyme'
import { render, fireEvent, screen } from '@testing-library/react'
import AllRoutesByCost from './index'

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

test('should match snapshot when there are no result and error', () => {
  const component = shallow(<AllRoutesByCost data={mockData} />)
  expect(component).toMatchSnapshot()
})

test('should show an error message clicking on calculate cost button when there is no Town1', () => {
  const { getByText } = render(<AllRoutesByCost data={mockData} />)
  const town2Input = screen.getByPlaceholderText('Town 2')
  const cost = screen.getByPlaceholderText('Cost')
  const button = screen.getByText('Find All Possible Routes')
  fireEvent.change(town2Input, { target: { value: 'D' } })
  fireEvent.change(cost, { target: { value: '20' } })
  fireEvent.click(button)
  const error = getByText('ERROR: Incorrect Input Format')
  expect(error).toBeTruthy()
})

test('should show an error message clicking on calculate cost button when there is no Town2', () => {
  const { getByText } = render(<AllRoutesByCost data={mockData} />)
  const town1Input = screen.getByPlaceholderText('Town 1')
  const cost = screen.getByPlaceholderText('Cost')
  const button = screen.getByText('Find All Possible Routes')
  fireEvent.change(town1Input, { target: { value: 'D' } })
  fireEvent.change(cost, { target: { value: '20' } })
  fireEvent.click(button)
  const error = getByText('ERROR: Incorrect Input Format')
  expect(error).toBeTruthy()
})

test('should show an error message clicking on calculate cost button when there is no cost', () => {
  const { getByText } = render(<AllRoutesByCost data={mockData} />)
  const town1Input = screen.getByPlaceholderText('Town 1')
  const town2Input = screen.getByPlaceholderText('Town 2')
  const button = screen.getByText('Find All Possible Routes')
  fireEvent.change(town1Input, { target: { value: 'D' } })
  fireEvent.change(town2Input, { target: { value: 'D' } })
  fireEvent.click(button)
  const error = getByText('ERROR: Incorrect Input Format')
  expect(error).toBeTruthy()
})

test('should show an error message clicking on calculate cost button when type of cost is not number', () => {
  const { getByText } = render(<AllRoutesByCost data={mockData} />)
  const town1Input = screen.getByPlaceholderText('Town 1')
  const town2Input = screen.getByPlaceholderText('Town 2')
  const cost = screen.getByPlaceholderText('Cost')
  const button = screen.getByText('Find All Possible Routes')
  fireEvent.change(town1Input, { target: { value: 'D' } })
  fireEvent.change(town2Input, { target: { value: 'D' } })
  fireEvent.change(cost, { target: { value: 'ABC' } })
  fireEvent.click(button)
  const error = getByText('ERROR: Incorrect Input Format')
  expect(error).toBeTruthy()
})

test('should set Town 1 value when typing on Town 1 Input', () => {
  render(<AllRoutesByCost data={mockData} />)
  const town1Input = screen.getByPlaceholderText('Town 1')
  fireEvent.change(town1Input, { target: { value: 'D' } })
  expect(town1Input.value).toBe('D')
})

test('should set Town 2 value when typing on Town 2 Input', () => {
  render(<AllRoutesByCost data={mockData} />)
  const town2Input = screen.getByPlaceholderText('Town 2')
  fireEvent.change(town2Input, { target: { value: 'D' } })
  expect(town2Input.value).toBe('D')
})

test('should set Cost value when typing on Cost Input', () => {
  render(<AllRoutesByCost data={mockData} />)
  const cost = screen.getByPlaceholderText('Cost')
  fireEvent.change(cost, { target: { value: '10' } })
  expect(cost.value).toBe('10')
})

test('should return 29 possible routes when calculating from E to E with cost less than 20 against mock data', () => {
  const { getByText } = render(<AllRoutesByCost data={mockData} />)
  const town1Input = screen.getByPlaceholderText('Town 1')
  const town2Input = screen.getByPlaceholderText('Town 2')
  const cost = screen.getByPlaceholderText('Cost')
  const button = screen.getByText('Find All Possible Routes')
  fireEvent.change(town1Input, { target: { value: 'E' } })
  fireEvent.change(town2Input, { target: { value: 'E' } })
  fireEvent.change(cost, { target: { value: '20' } })
  fireEvent.click(button)
  const error = getByText('Number of Possible Routes: 29')
  expect(error).toBeTruthy()
})

test('should return 0 possible route when calculating routes which do not exist against mock data', () => {
  const { getByText } = render(<AllRoutesByCost data={mockData} />)
  const town1Input = screen.getByPlaceholderText('Town 1')
  const town2Input = screen.getByPlaceholderText('Town 2')
  const cost = screen.getByPlaceholderText('Cost')
  const button = screen.getByText('Find All Possible Routes')
  fireEvent.change(town1Input, { target: { value: 'E' } })
  fireEvent.change(town2Input, { target: { value: 'Q' } })
  fireEvent.change(cost, { target: { value: '20' } })
  fireEvent.click(button)
  const error = getByText('Number of Possible Routes: 0')
  expect(error).toBeTruthy()
})
