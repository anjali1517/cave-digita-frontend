import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { RootStackParamsList } from '../types/RootStackList';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import { store, useAppSelector, USER_LOGOUT } from '../redux/Store';
import EnterVerificationCodeScreen from '../screens/EnterVerificationCodeScreen';
import UpdatePasswordScreen from '../screens/UpdatePasswordScreen';
import { navigationRef } from '../utils/NavigationService';
import { showSessionExpirePopup } from '../redux/slices/authSlice/AuthSlice';
import { AppString } from '../AppString/AppString';
import CustomAlertModal from '../components/CustomAlertModal';
import { getAsyncStorageData } from '../utils/HelperFunctions';
import OnBoardingScreen from '../screens/OnBoardingScreen';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const AppNavigator = () => {

  const { userDetails } = useAppSelector(state => state.AuthSlice)
  const [isFirstTimeOpen, setIsFirstTimeOpen] = useState();
  const [register, setRegister] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAsyncStorageData(AppString.is_first_time_open).then((res) => {
      setIsFirstTimeOpen(res)
      if (userDetails?.result?.name !== '' || userDetails?.result?.email !== '') {
        setRegister(true)
      } else {
        setRegister(false)
      }
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    });
  }, []);
  if (loading) {
    return null
  }

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isFirstTimeOpen ? register ? 'HomeScreen' : 'Login' : 'OnBoardingScreen'}>
        <Stack.Screen name='OnBoardingScreen' component={OnBoardingScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
        <Stack.Screen name='ForgetPasswordScreen' component={ForgetPasswordScreen} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='AddTaskScreen' component={AddTaskScreen} />
        <Stack.Screen name='EnterVerificationCode' component={EnterVerificationCodeScreen} />
        <Stack.Screen name='UpdatePasswordScreen' component={UpdatePasswordScreen} />
      </Stack.Navigator>
      {(store.getState().AuthSlice.isSessionExpire) ?
        <CustomAlertModal isOpen={store.getState().AuthSlice.isSessionExpire} title={AppString.error} subTitle={AppString.your_seesion_has_expired} onPressYes={() => {

          setTimeout(() => {
            store.dispatch({ type: USER_LOGOUT });
            navigationRef?.current?.reset({ index: 0, routes: [{ name: 'AuthStack' }] });
            store.dispatch(showSessionExpirePopup(false))
          }, 200);
        }} /> : null}
    </>
  )
}

export default AppNavigator;

const styles = StyleSheet.create({})