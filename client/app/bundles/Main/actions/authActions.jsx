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

export function doLogout(){
	return function(dispatch){
		localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accessToken');
		localStorage.removeItem('user_id');
		dispatch(doLogoutSuccess());
	}
}

export function doLogoutSuccess(){
	return{
		type: types.DO_LOGOUT_SUCCESS,
		success: true
	}
}
