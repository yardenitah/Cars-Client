// src/__Tests__/test-utils.js
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store'; // Adjust the path to your store

const renderWithProviders = (ui, { ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { renderWithProviders as render };