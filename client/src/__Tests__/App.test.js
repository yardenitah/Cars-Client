import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock components that are imported in App
jest.mock('../components/Header', () => () => <div>Header</div>);
jest.mock('../components/Footer', () => () => <div>Footer</div>);
jest.mock('../screens/LoginScreen', () => () => <div>Login Screen</div>);
jest.mock('../screens/AboutScreen', () => () => <div>About Screen</div>);
jest.mock('../screens/WelcomeScreen', () => () => <div>Welcome Screen</div>);

test('renders Header and Footer', () => {
  render(<App />);
  
  // Check if Header and Footer are rendered
  expect(screen.getByText('Header')).toBeInTheDocument();
  expect(screen.getByText('Footer')).toBeInTheDocument();
});

test('renders LoginScreen on default route', () => {
  render(<App />);
  
  // Check if LoginScreen is rendered
  expect(screen.getByText('Login Screen')).toBeInTheDocument();
});
