import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import CustomButton from '../components/CustomButton'
import CustomCircleView from '../components/CustomCircleView'
import CustomBackButton from '../components/CustomBackButton'
import { IconsPath } from '../utils/IconsPath'
import useCustomNavigation from '../hook/useCustomNavigation'
import { AppString } from '../AppString/AppString'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as yup from 'yup';
import { useFormik } from 'formik'
import CommonErrorText from '../components/CommonErrorText'
import { useAppSelector } from '../redux/Store'
import { FontSize } from '../styles/FontSizes'
import { OtpInput, OtpInputRef } from 'react-native-otp-entry'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

const EnterVerificationCodeScreen = () => {
    const Styles = useStyles()
    const navigation = useCustomNavigation('EnterVerificationCode')
    const otpTextInputRef = useRef<OtpInputRef>(null)
    const { colors } = useAppSelector(state => state.CommonSlice)
    const {loginLoading} = useAppSelector(state => state.AuthSlice)

    const enterCodeSchema = yup.object().shape({
        code: yup.string().required("please Enter Verification Code.").trim()
    })

    const { handleChange, touched, errors, values, handleSubmit } = useFormik({
        initialValues: {
            code: '',
        },
        validationSchema: enterCodeSchema,
        onSubmit: (values) => {
            if(values.code !== ''){
                navigation.navigate('UpdatePasswordScreen', {code: values.code})
            }
        }
    })

    return (
        <View style={Styles.mainContainer}>
            {loginLoading ? <CustomActivityIndicator /> : <></>}
            <CustomCircleView />
            <CustomBackButton icon={IconsPath.BACK_ICON} onPress={() => navigation.goBack()} />
            <Text style={Styles.hadingText}>{AppString.enter_verification_code}</Text>
            <View style={{  alignItems: 'center', marginTop: wp(6), marginHorizontal:wp(4) }}>
                <OtpInput
                    ref={otpTextInputRef}
                    numberOfDigits={6}
                    focusColor={colors.PRIMARY}
                    focusStickBlinkingDuration={500}
                    onTextChange={handleChange('code')}
                    onFilled={(text) => console.log(`OTP is ${text}`)}
                    secureTextEntry
                    textInputProps={{
                        accessibilityLabel: "sms-otp",
                        returnKeyType: 'done',
                        keyboardType: 'number-pad'
                    }}
                    theme={{
                        containerStyle: Styles.otpInputStyle,
                        pinCodeContainerStyle: Styles.otpContainerStyle,
                        pinCodeTextStyle: Styles.textStyle
                    }}
                />
                {(errors.code && touched.code ? <CommonErrorText title={errors.code} /> : <></>)}
                <CustomButton title={AppString.continue} onPress={() => handleSubmit()} style={{ marginTop: wp(6), alignItems: 'center' }} />
            </View>
           
        </View>
    )
}

export default EnterVerificationCodeScreen

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
            otpInputStyle: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: wp(5)
            },
            otpContainerStyle: {
                height: wp(13),
                width: wp(13),
                backgroundColor: colors.SECONDARY_TEXT,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: wp(2),
                fontFamily: "NotoSansKRMedium",
                fontSize: FontSize.FONT_SIZE_24,
                color: colors.PRIMARY_TEXT,
                textAlign: 'center',
                padding: 0,
            }, 
            textStyle: {
                color: colors.PRIMARY_TEXT
            }
        })
    )
}