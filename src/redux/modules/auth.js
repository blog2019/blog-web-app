import { actions as appActions } from './app';
import { post } from '../../utils/request';
import url from "../../utils/url";

const initialState = {
  userId: null,
  username: null
}

export const types = {
  LOGIN: 'AUTH/LOGIN',
  LOGOUT: 'AUTH/LOGOUT',
}

export const actions = {
  setLoginInfo: (userId, username) => ({
    type: types.LOGIN,
    userId: userId,
    username: username
  }),
  login: (username, password) => {
    return dispatch => {
      dispatch(appActions.startRequest());
      const params = { username, password };
      post(url.login(), params).then(data => {
        dispatch(appActions.finishRequest());
        if (!data.error) {
          dispatch(actions.setLoginInfo(data.userId, username));
        } else {
          dispatch(appActions.setError(data.error));
        }
      });
    }
  },
  logout: () => ({
    type: types.LOGOUT
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, userId: action.userId, username: action.username };
    case types.LOGOUT:
      return { ...state, userId: null, username: null };
    default:
      return state;
  }
}

export default reducer;

// selectors

export const getLoggedUser = state => state.auth;