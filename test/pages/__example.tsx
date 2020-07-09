import React from 'react'
import { render, fireEvent } from '../testUtils'
import Home from '../../pages'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home notes={[]} />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('clicking button triggers alert', () => {
    const { getByText } = render(<Home notes={[]} />, {})
    window.alert = jest.fn()
    fireEvent.click(getByText('Test Button'))
    expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  })
})
