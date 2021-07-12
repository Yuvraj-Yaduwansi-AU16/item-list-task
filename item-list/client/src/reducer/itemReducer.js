import {
  ADD_ITEM,
  GET_ITEMS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ITEM,
  SET_ERROR,
} from '../actions/types';
const initialstate = {
  items: [],
  current: null,
  error: null,
};
export const itemReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default itemReducer;
