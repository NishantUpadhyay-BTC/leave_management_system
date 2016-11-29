import { combineReducers } from 'redux'
import HolidaysReducer from './HolidaysReducer'
import initialState from './initialState'
import LeaveTypesReducer from './LeaveTypesReducer'

const reduxStore = combineReducers({
  holidays: HolidaysReducer, leave_types: LeaveTypesReducer, initialState
})

export default reduxStore
