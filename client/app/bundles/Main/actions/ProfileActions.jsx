import * as types from './actionTypes';
import profileApi from '../api/profileApi';

export function fetchProfile(user_id){
	return function(dispatch){
		return profileApi.fetchUserProfile(user_id).then(profile => {
			dispatch(fetchProfileSuccess(profile));
		}).catch(error => {
			throw(error);
		});
	};
}

export function fetchProfileSuccess(profile){
	return {
		type: types.FETCH_PROFILE_SUCCESS,
		profile: profile
	};
}

export function fetchProfileFailure(errors){
	return {
		type: types.FETCH_PROFILE_FAILURE,
		errors: errors
	};
}
