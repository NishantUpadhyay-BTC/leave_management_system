import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function LeaveReducer(state = initialState.active_request, action) {
  switch (action.type) {
    case types.FETCH_LEAVE_DETAILS_SUCCESS:
      return action.leave_details
    default:
      return state
  }
}
