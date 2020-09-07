import React from 'react'
import { render as Component } from './apple-watch-calendar'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Apple Watch Calendar', () => {
  it('Displays event names', () => {
    const mockCommandResult =
      'Work on Apple Watch Calendar Widget For macOS, 16:00 - 17:00'

    const { getByText } = render(<Component output={mockCommandResult} />)

    expect(
      getByText(/work on apple watch calendar widget for macOS/gi)
    ).toBeVisible()
    expect(getByText(/16:00 - 17:00/gi)).toBeVisible()
  })

  it('Displays a list of events', () => {
    const mockCommandResult = `
      Work on Apple Watch Calendar Widget For macOS, 16:00 - 17:00
      Tune my Guitar, 17:20 - 17:40
      Save the World, 20:00 - 20:20`

    const { getByText } = render(<Component output={mockCommandResult} />)

    expect(
      getByText(/work on apple watch calendar widget for macOS/gi)
    ).toBeVisible()
    expect(getByText(/16:00 - 17:00/gi)).toBeVisible()

    expect(getByText(/tune my guitar/gi)).toBeVisible()
    expect(getByText(/Save the World/gi)).toBeVisible()
  })

  it('Hides events biger than 4 hours', () => {
    const mockCommandResult = `
      Publish Apple Watch Calendar Widget For macOS, 16:00 - 17:00
      Work, 10:00 - 20:00`

    const { getByText, queryByText } = render(
      <Component output={mockCommandResult} />
    )

    expect(
      getByText(/publish apple watch calendar widget for macOS/gi)
    ).toBeVisible()
    expect(getByText(/16:00 - 17:00/gi)).toBeVisible()

    expect(queryByText(/Work/giy)).toBeNull()
    expect(queryByText(/10:00 - 20:00/gi)).toBeNull()
  })
})
