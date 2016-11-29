import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function HolidaysReducer(state = initialState.holidays, action) {
  switch (action.type) {
    case types.ADD_HOLIDAY_SUCCESS:
      return [
      Object.assign({}, action.holiday),
        ...state
      ];
    case types.LOAD_HOLIDAY_SUCCESS:
      return action.holidays;
    case types.DELETE_HOLIDAY_SUCCESS:
      return [
        ...state.filter(holiday => parseInt(holiday.id) != parseInt(action.holiday_id))
      ];
    default:
      return state
  }
}
