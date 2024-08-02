// client/src/context/AuthContext.js
import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../slices/authSlice";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    console.log('User state has changed:', user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;