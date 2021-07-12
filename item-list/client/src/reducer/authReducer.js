import {
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_AUTH_ERROR,
} from '../actions/types';
const initialstate = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  autherror: null,
};
export const authReducer = (state = initialstate, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.role,
        isAuthenticated: true,
      };
    case SET_AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        autherror: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};
export default authReducer;
