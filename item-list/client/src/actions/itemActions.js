import axios from 'axios';
import {
  ADD_ITEM,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ITEM,
  SET_ERROR,
  GET_ITEMS,
} from './types';
// Get Contacts
export const getItems = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/items');
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: SET_ERROR,
      payload: err.message,
    });
  }
};

//   Add Contact
export const addItem = (contact) => async (dispatch) => {
  try {
    const res = await axios.post('/api/items', contact);
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: 'Please check input data',
    });
  }
};
// Update Contact
export const updateItem = (contact, _id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/items/${_id}`, contact);
    dispatch({
      type: UPDATE_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: 'Please check input data',
    });
  }
};
// Set Current Contact
export const setCurrent = (contact) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT,
    payload: contact,
  });
};
// Clear Current Contact
export const clearCurrent = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT,
  });
};
export const clearError = (data) => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: SET_ERROR,
      payload: '',
    });
  }, 3000);
};
