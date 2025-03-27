import logger from 'redux-logger';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import CommonSlice from './CommonSlice';
import AuthSlice from './slices/authSlice/AuthSlice';
import HomeSlice from './slices/HomeSlice/homeSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const reducers = combineReducers({
    CommonSlice: CommonSlice,
    AuthSlice: AuthSlice,
    HomeSlice: HomeSlice
});

export const USER_LOGOUT = 'USER_LOGOUT'
const rootReducer = (state: any, action: any) => {
    if (action.type == USER_LOGOUT) {
        AsyncStorage.removeItem('persist:root')
        return reducers(undefined, action)
    }
    return reducers(state, action)
}
const persistedReducer = persistReducer({ ...persistConfig, blacklist: ['CommonSlice'] }, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => __DEV__ ?
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(logger) : getDefaultMiddleware()
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;