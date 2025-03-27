import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Text, TextInput, useTheme } from 'react-native-paper';
import { FontSize } from '../styles/FontSizes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAppDispatch, useAppSelector } from '../redux/Store';
import CustomButton from '../components/CustomButton';
import CustomContainer from '../components/CustomContainer';
import { AppString } from '../AppString/AppString';
import CustomCircleView from '../components/CustomCircleView';
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../types/RootStackList';
import useCustomNavigation from '../hook/useCustomNavigation';
import * as yup from 'yup';
import { useFormik } from 'formik';
import CommonErrorText from '../components/CommonErrorText';
import { login } from '../redux/slices/authSlice/AuthSlice';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

interface ParamsType {
    email: string,
    password: string,
  }

const LoginScreen = () => {

    const Styles = useStyles()
    const navigation = useCustomNavigation('Login')
    const { loginLoading } = useAppSelector(state => state.AuthSlice)
    const dispatch = useAppDispatch()

    const loginSchema = yup.object().shape({
        email: yup.string().required("please Enter Email").email().trim(),
        password: yup.string().required("Please Enter Eassword").trim().min(6, "Please Enter minimum 6 characters.")
    })

    const { handleChange, touched, errors, values, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            const params:ParamsType = {
                    email: values.email,
                    password: values.password,
                  }
                  dispatch(login(params)).unwrap().then((res) => {
                    console.log("response", res)
                    navigation.navigate('HomeScreen')
                  }).catch((error) => {
                    console.log("screen",error.response.data.message)
                  })
        }
    })
    return (
        <View style={Styles.mainContainer}>
            {loginLoading ? <CustomActivityIndicator /> : <></>}
            <CustomContainer>
                <CustomCircleView />
                <Text style={Styles.hadingText}>{AppString.welcomeback}</Text>
                <Text style={Styles.title}>{AppString.sign_In_access}</Text>
                <View style={{ alignItems: 'center', marginTop: wp(18) }}>
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
                    />
                    {(errors.password && touched.password ? <CommonErrorText title={errors.password} /> : <></>)}
                    <CustomButton title={AppString.sign_in} onPress={() => handleSubmit()} style={{ marginTop: wp(15) }} />

                </View>
                <View style={{ marginTop: wp(3), marginLeft: wp(5) }}>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={Styles.textstyle}>{AppString.forget_password}</Text>
                        <TouchableOpacity style={{ marginLeft: wp(2) }} onPress={() => navigation.navigate('ForgetPasswordScreen')}>
                            <Text style={Styles.subTextstyle}>{AppString.reset_here}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={Styles.textstyle}>{AppString.do_not_have_account}</Text>
                        <TouchableOpacity style={{ marginLeft: wp(2) }} onPress={() => navigation.navigate('SignUpScreen')}>
                            <Text style={[Styles.subTextstyle, { textDecorationLine: 'underline' }]}>{AppString.sing_up}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </CustomContainer>

        </View>

    )
}

export default LoginScreen

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