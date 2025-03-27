import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/Store'
import CustomCircleView from '../components/CustomCircleView'
import { FontSize } from '../styles/FontSizes'
import { AppString } from '../AppString/AppString'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'
import CustomBackButton from '../components/CustomBackButton'
import useCustomNavigation from '../hook/useCustomNavigation'
import { IconsPath } from '../utils/IconsPath'
import * as yup from 'yup';
import { useFormik } from 'formik'
import CommonErrorText from '../components/CommonErrorText'
import { sendVerificationCode } from '../redux/slices/authSlice/AuthSlice'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

const ForgetPasswordScreen = () => {
    const Styles = useStyles()
    const [email, setemail] = useState('')
    const navigation = useCustomNavigation('ForgetPasswordScreen')
    const dispatch = useAppDispatch()
    const {loginLoading} = useAppSelector(state => state.AuthSlice)

    const forgetPasswordSchema = yup.object().shape({
            email: yup.string().required("please Enter Email").email().trim()
        })
    
        const { handleChange, touched, errors, values, handleSubmit } = useFormik({
            initialValues: {
                email: '',
            },
            validationSchema: forgetPasswordSchema,
            onSubmit: (values) => {
                if(values.email !== ''){
                    const params = {
                        email: values.email
                    }
                    dispatch(sendVerificationCode(params)).unwrap().then((res) => {
                        if(res){
                            navigation.navigate('EnterVerificationCode')
                        }
                    })
                }
            }
        })

    return (
        <View style={Styles.mainContainer}>
             {loginLoading ? <CustomActivityIndicator /> : <></>}
            <CustomCircleView />
            <CustomBackButton icon={IconsPath.BACK_ICON} onPress={() => navigation.goBack()} />
            <Text style={Styles.hadingText}>{AppString.password_recovery}</Text>
            <Text style={Styles.title}>{AppString.fill_register_email}</Text>
            <View style={{ flex: 1, alignItems: 'center', marginTop: wp(6) }}>
                <CustomTextInput
                    returnKeyType='done'
                    keyboardType='email-address'
                    placeholder={AppString.enter_email}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    isError={errors.email && touched.email ? true : false}
                    />
                    {(errors.email && touched.email ? <CommonErrorText title={errors.email} /> : <></>)}
            </View>
            <View style={{ alignItems: 'center' }}>
                <CustomButton title={AppString.continue} onPress={() => handleSubmit()} style={{ marginBottom: wp(6), alignItems: 'center' }} />
            </View>
        </View>
    )
}

export default ForgetPasswordScreen

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
                fontSize: FontSize.FONT_SIZE_14,
                marginTop: wp(-4),
                textAlign: 'center'
            },
        })
    )
}