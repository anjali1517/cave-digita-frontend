import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { getAsyncStorageData, setAsyncStorageData } from '../utils/HelperFunctions'
import { AppString } from '../AppString/AppString'
import CustomContainer from '../components/CustomContainer'
import CustomCircleView from '../components/CustomCircleView'
import { useAppSelector } from '../redux/Store'
import { IconsPath } from '../utils/IconsPath'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Text } from 'react-native-paper'
import { FontSize } from '../styles/FontSizes'
import CustomButton from '../components/CustomButton'
import useCustomNavigation from '../hook/useCustomNavigation'

const OnBoardingScreen = () => {

    const focus = useIsFocused()
    const Styles = useStyles()
    const navigation = useCustomNavigation('OnBoardingScreen')

    useEffect(() => {
        if (focus) {
            getAsyncStorageData(AppString.is_first_time_open).then((res) => {
                if (!res) {
                    setAsyncStorageData(AppString.is_first_time_open, false).then((res) => {
                    })
                }
            })
        }
    }, [focus])

    return (
        <View style={Styles.mainContainer}>
            <CustomContainer>
                <CustomCircleView />
                <Image source={IconsPath.ONBOARDING} style={Styles.imageStyle} />
                <Text style={Styles.title}>{AppString.get_tasks_done}</Text>
                <Text style={Styles.subTitle}>{AppString.your_app_organized}</Text>
                <View style={{ alignItems: 'center', marginTop: wp(6) }}>
                    <CustomButton title={AppString.get_started} onPress={() => navigation.navigate('SignUpScreen')} />
                </View>
            </CustomContainer>
        </View>
    )
}

export default OnBoardingScreen;

const useStyles = () => {
    const { colors } = useAppSelector(state => state.CommonSlice)

    return (
        StyleSheet.create({
            mainContainer: {
                flex: 1,
                backgroundColor: colors.PRIMARY,
            },
            imageStyle: {
                width: wp(100),
                height: wp(100),
                resizeMode: 'contain'
            },
            title: {
                color: colors.PRIMARY_TEXT,
                fontSize: FontSize.FONT_SIZE_18,
                fontFamily: "NotoSansKRExtraBold",
                textAlign: 'center'
            },
            subTitle: {
                color: colors.PRIMARY_TEXT,
                fontSize: FontSize.FONT_SIZE_16,
                fontFamily: "NotoSansKRRegular",
                textAlign: 'center'
            }
        })
    )
}