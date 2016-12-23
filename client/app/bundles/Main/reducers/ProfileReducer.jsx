import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function ProfileReducer(state = initialState.profile_reducer, action) {
  switch (action.type) {
    case types.FETCH_PROFILE_SUCCESS:
      return action.profile;
    default:
      return state
  }
}
