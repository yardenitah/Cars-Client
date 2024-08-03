import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiBaseUrl from '../constants';

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  const response = await axios.get(`${apiBaseUrl}/api/users/profile`, { withCredentials: true });
  console.log('loadUser response:', response.data);
  return response.data;
});
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await axios.post(`${apiBaseUrl}/api/users/logout`, {}, { withCredentials: true });
});
export const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle', // Add status for loading state
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save user to localStorage
      console.log('setUser:', action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user'); // Clear user from localStorage
      console.log('clearUser');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.status = 'loading'; // Set status to loading when pending
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        console.log('loadUser fulfilled:', action.payload);
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isAuthenticated = false;
        console.log('loadUser rejected:', action.error.message);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        console.log('logoutUser fulfilled');
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;