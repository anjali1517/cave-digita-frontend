import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useAppSelector } from '../redux/Store'

interface CustomBackButtonProps {
    onPress?: () => void,
    icon: string,
    iconStyle?: ViewStyle
}

const CustomBackButton = (props: CustomBackButtonProps) => {

const Styles = useStyles()
const {colors} = useAppSelector(state => state.CommonSlice)

  return (
    <IconButton
    iconColor={colors.PRIMARY_TEXT}
    icon={props.icon}
    size={25}
    onPress={props.onPress}
    style={[Styles.iconContainer, props.iconStyle]}
  />
  )
}

export default CustomBackButton;

const useStyles = () => {
    const {colors} = useAppSelector(state => state.CommonSlice)
    return (
        StyleSheet.create({
            iconContainer: {
                position:'absolute',
                top: wp(15), 
                left: wp(3),
                zIndex:999
            }
        })
    )
}