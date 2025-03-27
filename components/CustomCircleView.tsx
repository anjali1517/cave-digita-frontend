import { Dimensions, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { useAppSelector } from '../redux/Store'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

interface CustomCircleProps {
    circleStyle?: ViewStyle,
    circleStyleContainer?: ViewStyle
}

const CustomCircleView = (props: CustomCircleProps) => {
    const Styles = useStyles()
    return (
            <View style={Styles.circlesContainer}>
                <View style={{...Styles.circle, ...props.circleStyle}} />
                <View style={{...Styles.circle2, ...props.circleStyleContainer}} />
            </View>
    )
}

export default CustomCircleView

const useStyles = () => {
    const { colors } = useAppSelector(state => state.CommonSlice)
    return (
        StyleSheet.create({
            circlesContainer: {
                height: height * 0.25, 
                justifyContent: 'flex-start', 
            },
            circle: {
                position: 'absolute',
                width: width * 0.5,
                height: width * 0.5,
                borderRadius: width * 0.35,
                backgroundColor: colors.SHADOW_COLOR1,
                top: wp(-4),
                left: -width * 0.2,
            },
            circle2: {
                position: 'absolute',
                width: width * 0.4,
                height: width * 0.4,
                borderRadius: width * 0.3,
                backgroundColor: colors.SHADOW_COLOR1,
                top: wp(-14),
                left: width * 0.1,
            },
        })
    )
}