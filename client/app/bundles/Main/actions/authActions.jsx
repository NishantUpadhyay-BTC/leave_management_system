import * as types from './actionTypes';
import authApi from '../api/authApi';

export function doLogin(email, password){
	return function(dispatch){
		return authApi.loginUser(email, password).then(userData => {
			dispatch(doLoginSuccess(userData));
		}).catch(error => {
			throw(error);
		});
	};
}

export function doLoginSuccess(userData){
  console.log(userData)
	return {
		type: types.DO_LOGIN_SUCCESS,
		user_data: userData
	};
}

export function doLoginFailure(errors){
	return {
		type: types.DO_LOGIN_FAILURE,
		errors: errors
	};
}
