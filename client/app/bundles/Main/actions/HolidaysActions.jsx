import * as types from './actionTypes';
import HolidaysApi from '../api/HolidaysApi';

export function loadHolidays(){
	return function(dispatch){
		return HolidaysApi.getAllHolidays().then(holidays => {
			dispatch(loadHolidaysSuccess(holidays));
		}).catch(error => {
			throw(error);
		});
	};
}

export function loadHolidaysSuccess(holidays){
	return {
		type: types.LOAD_HOLIDAY_SUCCESS,
		holidays: holidays
	};
}

export function addHolidaySuccess(holiday){
	return {
		type: types.ADD_HOLIDAY_SUCCESS,
		holiday: holiday
	};
}

export function addHoliday(holiday){
	return function(dispatch){
		return HolidaysApi.callAddHoliday(holiday).then(holiday => {
			dispatch(addHolidaySuccess(holiday));
		}).catch(error => {
			throw(error);
		});
	};
}

export function deleteHolidaySuccess(holiday_id){
	return {
		type: types.DELETE_HOLIDAY_SUCCESS,
		holiday_id: holiday_id
	};
}

export function deleteHoliday(holiday_id){
	return function(dispatch){
		return HolidaysApi.callDeleteHoliday(holiday_id).then(holiday_id =>{
			dispatch(deleteHolidaySuccess(holiday_id));
		}).catch(error => {
			throw(error);
		});
	};
}
