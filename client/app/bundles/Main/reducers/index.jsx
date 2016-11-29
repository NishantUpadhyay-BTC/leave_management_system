import { combineReducers } from 'redux'
import HolidaysReducer from './HolidaysReducer'
import initialState from './initialState'
import LeaveTypesReducer from './LeaveTypesReducer'
import DashboardReducer from './DashboardReducer'
import LeaveReducer from './LeaveReducer'

const reduxStore = combineReducers({
  holidays: HolidaysReducer,
  leave_types: LeaveTypesReducer,
  leave_requests: DashboardReducer,
  active_request: LeaveReducer,
  initialState
})

export default reduxStore
