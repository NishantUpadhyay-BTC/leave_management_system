import initialState from './initialState';

export default function HolidaysReducer(state = initialState.holidays, action) {
  switch (action.type) {
    case 'ADD_HOLIDAY_SUCCESS':
      return [
      Object.assign({}, action.holiday),
        ...state
      ];
    case 'LOAD_HOLIDAY_SUCCESS':
      return action.holidays;
    default:
      return state
  }
}
