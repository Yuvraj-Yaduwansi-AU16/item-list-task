import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_AUTH_ERROR,
} from './types';
export const loadUser = () => {
  // Set token to global common header
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
};
// Register User
export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'COntent-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/users/register', formData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    loadUser();
  } catch (err) {
    dispatch({
      type: SET_AUTH_ERROR,
      payload: err.response.data.msg,
    });
  }
};
// Login User
export const login = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'COntent-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/users/login', formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    loadUser();
  } catch (err) {
    dispatch({
      type: SET_AUTH_ERROR,
      payload: err.response.data.msg,
    });
  }
};

// Logout
export const logout = () => (dispatch) => dispatch({ type: LOGOUT });

export const clearAuthError = () => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: SET_AUTH_ERROR,
      payload: '',
    });
  }, 3000);
};
