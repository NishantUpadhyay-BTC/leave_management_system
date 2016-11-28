import { combineReducers } from 'redux'
import HolidaysReducer from './HolidaysReducer'
import initialState from './initialState'

const reduxStore = combineReducers({
  holidays: HolidaysReducer, initialState
})

export default reduxStore
