// src/__Tests__/test-utils.js
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store'; // Adjust the path to your store

const renderWithProviders = (ui, { ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { renderWithProviders as render };