import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.authUser, action) {
  switch (action.type) {
    case types.DO_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: true,
        userData: action.user_data
      });
    default:
      return state
  }
}
