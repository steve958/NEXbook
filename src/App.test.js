import React from 'react'
import {
  fireEvent,
  getByTestId,
  getByText,
  render,
  screen,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import App from './App'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Register from './components/Register'

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

describe('check if forms are being rendered when clicked', () => {
  it('login form is rendered when clicked', () => {
    const app = render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    const form = app.getByTestId('login-form')
    expect(form).toHaveAttribute('id', 'form-wrapper')
  })

  it('register form is rendered when clicked', () => {
    const app = render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /register/i }))
    const form = app.getByTestId('register-form')
    expect(form).toHaveAttribute('id', 'form-wrapper')
  })
})

describe('form has input fields', () => {
  it('login form has all the right input fields', () => {
    const loginForm = render(<Login />)
    expect(loginForm.getByRole('textbox')).toBeDefined()
    expect(loginForm.getByPlaceholderText(/password/i)).toBeDefined()
    expect(loginForm.getByRole('button', { name: /login/i })).toBeDefined()
  })

  it('register form has all the right input fields', () => {
    const registerForm = render(<Register />)
    expect(registerForm.getByRole('spinbutton')).toBeDefined()
    expect(
      registerForm.getByRole('button', { name: /register/i }),
    ).toBeDefined()
  })
})

it('login and register forms are being toggled', () => {
  const app = render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /login/i }))
  const loginForm = app.getByTestId('login-form')
  expect(loginForm).toBeDefined()
  fireEvent.click(screen.getByRole('button', { name: /register/i }))
  const registerForm = app.getByTestId('register-form')
  expect(registerForm).toBeVisible()
  expect(loginForm).not.toBeVisible()
})
