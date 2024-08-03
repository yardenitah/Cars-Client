// client/src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/style/bootstrap.custom.css";
import "./assets/style/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import store from './store';
import { setUser } from "./slices/authSlice";
import AuthProvider from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const user = localStorage.getItem('user');

if (user) {
  try {
    const parsedUser = JSON.parse(user);
    store.dispatch(setUser(parsedUser));
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    localStorage.removeItem('user'); // Remove invalid data
  }
}
root.render(
  
  <React.StrictMode>
    <Provider store = {store}> {/* Wrap the App with AuthProvider */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
