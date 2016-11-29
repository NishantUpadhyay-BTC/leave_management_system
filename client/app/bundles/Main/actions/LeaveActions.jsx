import * as types from './actionTypes';
import LeaveApi from '../api/LeaveApi';

export function fetchLeaveDetails(leave_id){
	return function(dispatch){
		return LeaveApi.getLeaveDetails(leave_id).then(leave_details => {
			dispatch(fetchLeaveDetailsSuccess(leave_details));
		}).catch(error => {
			throw(error);
		});
	};
}

export function fetchLeaveDetailsSuccess(leave_details){
	return {
		type: types.FETCH_LEAVE_DETAILS_SUCCESS,
		leave_details: leave_details
	};
}
