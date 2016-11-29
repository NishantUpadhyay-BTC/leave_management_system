import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function LeaveTypesReducer(state = initialState.leave_types, action) {
  switch (action.type) {
    case types.ADD_LEAVE_TYPE_SUCCESS:
      return [
        Object.assign({}, action.leave_type),
        ...state
      ];
    case types.LOAD_LEAVE_TYPE_SUCCESS:
      return action.leave_types;
    case types.DELETE_LEAVE_TYPE_SUCCESS:
      return [
        ...state.filter(leave_type => parseInt(leave_type.id) != parseInt(action.leave_type_id))
      ];
    default:
      return state
  }
}
