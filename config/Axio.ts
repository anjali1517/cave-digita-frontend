import axios, { AxiosRequestHeaders } from 'axios';
import { store } from '../redux/Store';

import { DeviceEventEmitter } from 'react-native';
import { APP_URL } from './Host';
import { ApiConstants } from './ApiConstants';
import { navigationRef } from '../utils/NavigationService';
import { showSessionExpirePopup } from '../redux/slices/authSlice/AuthSlice';

export const axiosClient = axios.create({
	baseURL: APP_URL,
});

const blacklistUrls = [
	ApiConstants.LOGIN,
	ApiConstants.SIGNUP,
    ApiConstants.SEND_VERIFICATION_CODE,
	ApiConstants.VERIFY_VERIFICATION_CODE
];

axiosClient.interceptors.request.use(async (config) => {
	try {
        const token = store.getState().AuthSlice.userDetails.token;
        console.log('token',`Bearer ${token}`)
        if (token && !blacklistUrls.includes(config.url || '')) {
            config.headers = {
                ...config.headers,
                Authorization:`Bearer ${token}`,
            } as AxiosRequestHeaders;
        }
	} catch (e) {
		console.error({ e });
	}
	console.log('AAA config', config)
	return config;
});

axiosClient.interceptors.response.use(
	response => successHandler(response),
	error => errorHandler(error)
)

const errorHandler = (error: any) => {
	console.log('ERROR11-->', error, error && error.response && error.response.status === 401)
	if (error && error.response && error.response.status === 401) {
		if (navigationRef?.current?.getState().routes[0].name !== "Login") {
			store.dispatch(showSessionExpirePopup(true))
		}
		
		DeviceEventEmitter.emit("sessionExpired")
  
	  return Promise.reject({ ...error });
	}
	if(error && error.response && error.response.status === 400){
		// store.dispatch(setShowDeleteAccount(true))
		return Promise.reject({ ...error });
	}
	return Promise.reject(error);
  };
  
  const successHandler = (response: any) => {
	return response;
  };