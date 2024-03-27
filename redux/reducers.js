import { SET_TRANSACTIONS_DATA } from './actions';

const initialState = {
  transactionsData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRANSACTIONS_DATA:
      return {
        ...state,
        transactionsData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
