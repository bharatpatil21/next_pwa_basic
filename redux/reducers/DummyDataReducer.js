import { GET_DUMMY_DATA, ADD_DUMMY_NAME } from "../actions/types";

const INITIAL_STATE = {
  names : [
      'Amol Patil',
      'Bharat',
      'Vishal',
      'Sachin Sarse',
      'Abhijeet',
      'Purushottam'
    ]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DUMMY_DATA:
      return { ...state};

    case ADD_DUMMY_NAME:
      let names = [...state.names];
      names.push(action.payload);
      state.names = names;
      return { ...state,names}

    default:
      return { ...state };
  }
};
