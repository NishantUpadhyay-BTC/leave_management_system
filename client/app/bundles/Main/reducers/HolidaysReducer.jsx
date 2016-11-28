import initialState from './initialState';

export default function HolidaysReducer(state = initialState.holidays, action) {
  switch (action.type) {
    case 'ADD_HOLIDAY':
      console.log('inside reducers')
      return [
        ...state,
        action.holiday
      ]
    default:
      return state
  }
}
