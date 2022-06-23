import React from 'react'
import {
  fireEvent,
  getByTestId,
  getByText,
  render,
  screen,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import Welcome from './components/Welcome'
import Login from './components/Login'

describe('welcome screen renders all the right heading text and image', () => {
  const component = render(<Welcome />)
  const headerEl = component.getByTestId('header-text')
  const appName = component.getByTestId('app-name')
  const appBackgrroundImage = component.getByTestId('app-logo-background')

  it('welcome to is rendered', () => {
    expect(headerEl.textContent).toBe('welcome to')
  })
  it('app-name is rendered', () => {
    expect(appName.textContent).toBe('NEXbook')
  })
  it('application logo is rendered as the background image', () => {
    expect(appBackgrroundImage).toBeDefined()
  })
})

describe('check if login and register form are not rendered', () => {
  const appComponent = render(<App />)
  it('login form is not visible', () => {
    expect(appComponent.textContent).not.toBe('LOGIN')
  })
  it('register form is not visible', () => {
    expect(appComponent.textContent).not.toBe('REGISTER')
  })
})

it('login form is rendered when clicked', async () => {
  const app = render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /click to login/i }))
})
