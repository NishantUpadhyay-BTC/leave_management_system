import { combineReducers } from 'redux'
import HolidaysReducer from './HolidaysReducer'
import initialState from './initialState'
import LeaveTypesReducer from './LeaveTypesReducer'
import DashboardReducer from './DashboardReducer'

const reduxStore = combineReducers({
  holidays: HolidaysReducer, leave_types: LeaveTypesReducer, leave_requests: DashboardReducer, initialState
})

export default reduxStore
