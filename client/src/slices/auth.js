import axios from 'axios';
import { setUser, clearUser } from '../slices/authSlice'; // Adjust the import path as necessary

const loadUser = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/users/profile', { withCredentials: true });
    console.log('loadUser response:', response.data); // Log response
    dispatch(setUser(response.data));
  } catch (error) {
    console.error('loadUser error:', error); // Log error
    dispatch(clearUser());
  }
};

export default loadUser;