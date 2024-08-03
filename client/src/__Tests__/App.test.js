import React from 'react';
import { render, screen } from './test-utils';
import App from '../App';

jest.mock('../components/Header', () => () => <div>Header</div>);
jest.mock('../components/Footer', () => () => <div>Footer</div>);
jest.mock('../screens/LoginScreen', () => () => <div>Login Screen</div>);

test('renders Header and Footer', () => {
  render(<App />);
  expect(screen.getByText('Header')).toBeInTheDocument();
  expect(screen.getByText('Footer')).toBeInTheDocument();
});

test('renders LoginScreen on default route', () => {
  render(<App />);
  expect(screen.getByText('Login Screen')).toBeInTheDocument();
});