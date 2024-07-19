// client/src/screens/WelcomeScreen.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const WelcomeScreen = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");

  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  );
};

export default WelcomeScreen;
