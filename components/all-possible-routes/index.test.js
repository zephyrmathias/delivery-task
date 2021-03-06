import React from 'react'
import { shallow } from 'enzyme'
import { render, fireEvent, screen } from '@testing-library/react'
import AllPossibleRoutes from './index'

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
  const component = shallow(<AllPossibleRoutes data={mockData} />)
  expect(component).toMatchSnapshot()
})

test('should show an error message clicking on a button when there is no Town1', () => {
  const { getByText } = render(<AllPossibleRoutes data={mockData} />)
  const town2Input = screen.getByPlaceholderText('Town 2')
  const button = screen.getByText('Find All Routes')
  fireEvent.change(town2Input, { target: { value: 'D' } })
  fireEvent.click(button)
  const error = getByText('ERROR: Incorrect Input Format')
  expect(error).toBeTruthy()
})

test('should show an error message clicking on a button when there is no Town2', () => {
  const { getByText } = render(<AllPossibleRoutes data={mockData} />)
  const town1Input = screen.getByPlaceholderText('Town 1')
  const button = screen.getByText('Find All Routes')
  fireEvent.change(town1Input, { target: { value: 'D' } })
  fireEvent.click(button)
  const error = getByText('ERROR: Incorrect Input Format')
  expect(error).toBeTruthy()
})

test('should return no such route if routes do not pass condition against mock data', () => {
  const { getByText } = render(<AllPossibleRoutes data={mockData} />)
  const town1Input = screen.getByPlaceholderText('Town 1')
  const town2Input = screen.getByPlaceholderText('Town 2')
  const button = screen.getByText('Find All Routes')
  fireEvent.change(town1Input, { target: { value: 'A' } })
  fireEvent.change(town2Input, { target: { value: 'Z' } })
  fireEvent.click(button)
  const error = getByText('No Such Route')
  expect(error).toBeTruthy()
})

test('should return 5 routes if routes start "E" and end "E" with exact 5 stops against mock data', () => {
  const { getByText } = render(<AllPossibleRoutes data={mockData} />)
  const town1Input = screen.getByPlaceholderText('Town 1')
  const town2Input = screen.getByPlaceholderText('Town 2')
  const button = screen.getByText('Find All Routes')
  fireEvent.change(town1Input, { target: { value: 'E' } })
  fireEvent.change(town2Input, { target: { value: 'E' } })
  fireEvent.click(button)
  const error = getByText('Total Routes: 5')
  expect(error).toBeTruthy()
})
