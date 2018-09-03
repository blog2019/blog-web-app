import { types as commentTypes } from "./comments";
import { types as postTypes } from "./posts";

const initialState = { };

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case commentTypes.FETCH_COMMENTS:
    case postTypes.FETCH_ALL_POSTS:
      return { ...state, ...action.users };
    case postTypes.FETCH_POST:
      return { ...state, [action.user.id]: action.user };
    default:
      return state;  
  }
};

export default reducer;

// selectors
export const getUserById = (state, id) => {
  return state.users[id];
};
