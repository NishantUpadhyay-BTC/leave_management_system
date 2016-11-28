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
		type: "LOAD_HOLIDAY_SUCCESS",
		thoughts: holidays
	};
}

export function addHolidaySuccess(holiday){
	console.log('>>>>>>>>>>>>>>>>>>>>>>.' + holiday.holiday)
	return {
		type: 'ADD_HOLIDAY_SUCCES',
		thought: holiday
	};
}

export function addHoliday(holiday){
	console.log(holiday)
	return function(dispatch){
		return HolidaysApi.CallAddHoliday(holiday).then(holiday => {
			dispatch(addHolidaySuccess(holiday));
		}).catch(error => {
			throw(error);
		});
	};
}
