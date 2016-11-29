import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function DashboardReducer(state = initialState.leave_requests, action) {
  switch (action.type) {
    case types.LOAD_ALL_REQUESTS_SUCCESS:
      return action.leave_requests;
    default:
      return state
  }
}
