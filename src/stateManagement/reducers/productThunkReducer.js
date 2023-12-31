import {
  FETCH_AGES_SUCC,
  FETCH_AGES_START,
  FETCH_AGES_FAIELD,
  ADD_AGE,
  EDIT_AGE,
  DEL_AGES,
} from '../actions/actionTypes';

const initialState = {
  items: [],
  isLoading: true,
  message: '',
};

function productThunkReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_AGES_START:
      return { ...state, message: '', isLoading: true };
    case FETCH_AGES_SUCC:
      return { ...state, items: action.payload, message: '', isLoading: false };
    case FETCH_AGES_FAIELD:
      return { ...state, items: [], message: action.payload, isLoading: false };
    case ADD_AGE:
      return { ...state, items: [], message: action.payload, isLoading: true };
    case EDIT_AGE:
      const updatedIndex = state.items.findIndex(
        (age) => age.id === action.payload.id
      );
      const updatedItems = [...state.items];
      updatedItems[updatedIndex] = action.payload;
      return { ...state, items: updatedItems, message: '', isLoading: true };
    case DEL_AGES:
      // return {
      //   ...state,
      //   items: state.items.filter((age) => age.id !== action.payload),
      //   message: '',
      //   isLoading: true,
      // };
      if (Array.isArray(state.items)) {
        return {
          ...state,
          items: state.items.filter((age) => age.id !== action.payload),
          message: '',
          isLoading: true,
        };
      } else {
        return {
          ...state,
          items: [],
          message: '',
          isLoading: true,
        };
      }
    default:
      return state;
  }
}

export default productThunkReducer;
