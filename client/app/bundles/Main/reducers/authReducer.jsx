import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.authUser, action) {
  switch (action.type) {
    case types.DO_LOGIN_SUCCESS:
      localStorage.setItem( 'isLoggedIn', true );
      localStorage.setItem('accessToken', action.user_data.access_token)
      localStorage.setItem('user_id', action.user_data.id)
      return Object.assign({}, state, {
        isLoggedIn: true,
        userData: action.user_data
      });
    case types.DO_LOGOUT_SUCCESS:
      return Object.assign({}, initialState.authUser);
    default:
      return state
  }
}
