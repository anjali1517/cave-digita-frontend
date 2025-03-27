import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import CustomCircleView from '../components/CustomCircleView'
import CustomButton from '../components/CustomButton'
import { AppString } from '../AppString/AppString'
import CommonErrorText from '../components/CommonErrorText'
import CustomBackButton from '../components/CustomBackButton'
import CustomTextInput from '../components/CustomTextInput'
import { useFormik } from 'formik'
import *  as yup from 'yup';
import useCustomNavigation from '../hook/useCustomNavigation'
import { IconsPath } from '../utils/IconsPath'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize } from '../styles/FontSizes'
import { useAppDispatch, useAppSelector } from '../redux/Store'
import { RootStackParamsList } from '../types/RootStackList'
import { RouteProp, useRoute } from '@react-navigation/native'
import { verifyVerificationCode } from '../redux/slices/authSlice/AuthSlice'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

const UpdatePasswordScreen = () => {
    const Styles = useStyles()
    const navigation = useCustomNavigation('UpdatePasswordScreen')
    type NestedScreenRouteProp = RouteProp<RootStackParamsList, 'UpdatePasswordScreen'>;
    const route = useRoute<NestedScreenRouteProp>();
    const code = route.params?.code
    const { userEmail , loginLoading} = useAppSelector(state => state.AuthSlice)
    const dispatch = useAppDispatch()
    
    const updatePasswordSchema = yup.object().shape({
        password: yup.string().required("please Enter Verification Code.").trim().min(6, "Please Enter minimum 6 characters.")
    })

    const { handleChange, touched, errors, values, handleSubmit } = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: updatePasswordSchema,
        onSubmit: (values) => {
            if (values.password !== '') {
                if(values.password !== '') {
                    const params = {
                        email: userEmail?.email,
                        providedCode: code,
                        newPassword: values.password
                    }
                    dispatch(verifyVerificationCode(params)).unwrap().then((res) =>{
                        if(res){
                            navigation.navigate('Login')
                        }
                    })
                }
            }
        }
    })

    return (
        <View style={Styles.mainContainer}>
            {loginLoading ? <CustomActivityIndicator /> : <></>}
            <CustomCircleView />
            <CustomBackButton icon={IconsPath.BACK_ICON} onPress={() => navigation.goBack()} />
            <Text style={Styles.hadingText}>{AppString.enter_verification_code}</Text>
            <View style={{ flex: 1, alignItems: 'center', marginTop: wp(6) }}>
                <CustomTextInput
                    returnKeyType='done'
                    placeholder={AppString.enter_new_password}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    isError={errors.password && touched.password ? true : false}
                />
                {(errors.password && touched.password ? <CommonErrorText title={errors.password} /> : <></>)}
                <CustomButton title={AppString.update_password} onPress={() => handleSubmit()} style={{ marginTop: wp(6), alignItems: 'center' }} />
            </View>
        </View>
    )
}

export default UpdatePasswordScreen

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
        })
    )
}