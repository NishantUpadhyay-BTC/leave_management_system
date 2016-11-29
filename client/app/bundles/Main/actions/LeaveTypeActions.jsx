import * as types from './actionTypes';
import LeaveTypesApi from '../api/LeaveTypesApi';

export function loadLeaveTypes(){
	return function(dispatch){
		return LeaveTypesApi.getAllLeaveTypes().then(leave_types => {
			dispatch(loadLeaveTypeSuccess(leave_types));
		}).catch(error => {
			throw(error);
		});
	};
}

export function loadLeaveTypeSuccess(leave_types){
	console.log(leave_types)
	return {
		type: types.LOAD_LEAVE_TYPE_SUCCESS,
		leave_types: leave_types
	};
}

export function addLeaveTypeSuccess(leave_type){
	return {
		type: types.ADD_LEAVE_TYPE_SUCCESS,
		leave_type: leave_type
	};
}

export function addSignOffType(leave_type){
	return function(dispatch){
		return LeaveTypesApi.callAddLeaveType(leave_type).then(leave_type => {
			dispatch(addLeaveTypeSuccess(leave_type));
		}).catch(error => {
			throw(error);
		});
	};
}

export function deleteLeaveTypeSuccess(leave_type_id){
	return {
		type: types.DELETE_LEAVE_TYPE_SUCCESS,
		leave_type_id: leave_type_id
	};
}

export function deleteLeavetype(leave_type_id){
	return function(dispatch){
		return LeaveTypesApi.callDeleteLeaveType(leave_type_id).then(leave_type_id =>{
			dispatch(deleteLeaveTypeSuccess(leave_type_id));
		}).catch(error => {
			throw(error);
		});
	};
}
