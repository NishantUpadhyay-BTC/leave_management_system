import * as types from './actionTypes';
import dashboardApi from '../api/dashboardApi';

export function loadAllRequests(){
	return function(dispatch){
		return dashboardApi.getAllRequestByStatus().then(leave_requests => {
			dispatch(loadAllRequestsSuccess(leave_requests));
		}).catch(error => {
			throw(error);
		});
	};
}

export function loadAllRequestsSuccess(leave_requests){
	return {
		type: types.LOAD_ALL_REQUESTS_SUCCESS,
		leave_requests: leave_requests
	};
}
