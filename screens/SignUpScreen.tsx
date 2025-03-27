import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Text, useTheme } from 'react-native-paper';
import { FontSize } from '../styles/FontSizes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAppDispatch, useAppSelector } from '../redux/Store';
import CustomButton from '../components/CustomButton';
import CustomContainer from '../components/CustomContainer';
import { AppString } from '../AppString/AppString';
import CustomCircleView from '../components/CustomCircleView';
import CustomTextInput from '../components/CustomTextInput';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../types/RootStackList';
import useCustomNavigation from '../hook/useCustomNavigation';
import CustomBackButton from '../components/CustomBackButton';
import { IconsPath } from '../utils/IconsPath';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CommonErrorText from '../components/CommonErrorText';
import { signUp } from '../redux/slices/authSlice/AuthSlice';
import { AppAlert } from '../utils/AppAlert';
import { getAsyncStorageData, setAsyncStorageData } from '../utils/HelperFunctions';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface ParamsType {
  email: string,
  password: string,
  name: string
}

const SignUpScreen = () => {

  const Styles = useStyles()
  const navigation = useCustomNavigation('SignUpScreen')
  const { userDetails, signupLoading } = useAppSelector(state => state.AuthSlice)
  const dispatch = useAppDispatch()
  const focus = useIsFocused()

  const signUpSchema = yup.object().shape({
    name: yup.string().trim().required("Please Enter Name"),
    email: yup.string().required("please Enter Email").email().trim(),
    password: yup.string().required("Please Enter Eassword").trim().min(6, "Please Enter minimum 6 characters."),
    confirmPassword: yup
      .string()
      .required('Please Confirm Password')
      .oneOf([yup.ref('password')], 'Passwords must be matched')
      .trim(),
  })

  const { handleChange, touched, errors, values, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      const params: ParamsType = {
        email: values.email,
        password: values.password,
        name: values.name,
      }
      dispatch(signUp(params)).unwrap().then((res) => {
        console.log("response", res)
        navigation.navigate('HomeScreen')
      }).catch((error) => {
        console.log("screen", error.response.data.message)
      })

    }
  })

  useEffect(() => {
    if (focus) {
      getAsyncStorageData(AppString.is_first_time_open).then((res) => {
        if (!res) {
          setAsyncStorageData(AppString.is_first_time_open, true).then((res) => {
          })
        }
      })
    }
  }, [focus]);

  return (
    <View style={Styles.mainContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[{ paddingBottom: wp(5) }]}>
        {signupLoading ? <CustomActivityIndicator /> : <></>}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <CustomContainer>
            <CustomCircleView />
            <CustomBackButton icon={IconsPath.BACK_ICON} onPress={() => navigation.goBack()} />
            <Text style={Styles.hadingText}>{AppString.create_account}</Text>
            <Text style={Styles.title}>{AppString.join_us}</Text>
            <View style={{ alignItems: 'center', marginTop: wp(8) }}>
              <CustomTextInput
                returnKeyType='done'
                placeholder={AppString.enter_name}
                value={values.name}
                onChangeText={handleChange("name")}
                isError={errors.name && touched.name ? true : false}

              />
              {(errors.name && touched.name ? <CommonErrorText title={errors.name} /> : <></>)}
              <CustomTextInput
                returnKeyType='done'
                keyboardType='email-address'
                placeholder={AppString.enter_email}
                value={values.email}
                onChangeText={handleChange("email")}
                isError={errors.email && touched.email ? true : false}

              />
              {(errors.email && touched.email ? <CommonErrorText title={errors.email} /> : <></>)}
              <CustomTextInput
                returnKeyType='done'
                placeholder={AppString.enter_password}
                value={values.password}
                onChangeText={handleChange("password")}
                isError={errors.password && touched.password ? true : false}
                secureTextEntry
              />
              {(errors.password && touched.password ? <CommonErrorText title={errors.password} /> : <></>)}
              <CustomTextInput
                returnKeyType='done'
                placeholder={AppString.enter_confirm_password}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                isError={errors.confirmPassword && touched.confirmPassword ? true : false}
                secureTextEntry
              />
              {(errors.confirmPassword && touched.confirmPassword ? <CommonErrorText title={errors.confirmPassword} /> : <></>)}
              <CustomButton title={AppString.sing_up} onPress={() => handleSubmit()} style={{ marginTop: wp(15) }} />

            </View>
            <View style={{ marginTop: wp(3), marginLeft: wp(5) }}>

              <View style={{ flexDirection: 'row' }}>
                <Text style={Styles.textstyle}>{AppString.already_account}</Text>
                <TouchableOpacity style={{ marginLeft: wp(2) }} onPress={() => navigation.navigate('Login')}>
                  <Text style={[Styles.subTextstyle, { textDecorationLine: 'underline' }]}>{AppString.sign_in}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </CustomContainer>
        </ScrollView>

      </KeyboardAwareScrollView>
    </View>
  )
}

export default SignUpScreen;

const useStyles = () => {
  const { colors } = useAppSelector(state => state.CommonSlice)
  return (
    StyleSheet.create({
      mainContainer: {
        flex: 1,
        backgroundColor: colors.PRIMARY,
      },
      hadingText: {
        color: colors.PRIMARY_TEXT,
        fontFamily: 'NotoSansKRExtraBold',
        fontSize: FontSize.FONT_SIZE_24,
        textAlign: 'center'
      },
      title: {
        fontFamily: 'NotoSansKRRegular',
        color: colors.PRIMARY_TEXT,
        fontSize: FontSize.FONT_SIZE_16,
        marginTop: wp(-6),
        textAlign: 'center'
      },
      textstyle: {
        fontFamily: "NotoSansKRRegular",
        color: colors.PRIMARY_TEXT,
        fontSize: FontSize.FONT_SIZE_14
      },
      subTextstyle: {
        fontFamily: "NotoSansKRMedium",
        color: colors.SECONDARY_SHADOW,
        fontSize: FontSize.FONT_SIZE_14
      }
    })
  )
}