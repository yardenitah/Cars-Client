import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  const response = await axios.get('/api/users/profile');
  console.log('loadUser response:', response.data);
  return response.data;
});

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
      console.log('setUser:', action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      console.log('clearUser');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
        console.log('loadUser fulfilled:', action.payload);
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isAuthenticated = false;
        console.log('loadUser rejected:', action.error.message);
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;