import { combineReducers } from 'redux';
import HolidaysReducer from './HolidaysReducer';
import initialState from './initialState';
import LeaveTypesReducer from './LeaveTypesReducer';
import DashboardReducer from './DashboardReducer';
import LeaveReducer from './LeaveReducer';
import authReducer from './authReducer';
import ProfileReducer from './ProfileReducer';

const reduxStore = combineReducers({
  holidays: HolidaysReducer,
  leave_types: LeaveTypesReducer,
  leave_requests: DashboardReducer,
  active_request: LeaveReducer,
  auth_reducer: authReducer,
  profile_reducer: ProfileReducer,
  initialState
})

export default reduxStore
