import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useAppSelector } from '../redux/Store';
import { FontSize } from '../styles/FontSizes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface CustomButtonProps {
    title: string,
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle
}

const CustomButton = (props: CustomButtonProps) => {

    const { colors } = useAppSelector(state => state.CommonSlice)
    const Styles = useStyles()

    return (
        <Button mode='contained'
            onPress={props.onPress}
            buttonColor={colors.SECONDARY}
            style={[Styles.container, props.style]}
            labelStyle={[Styles.labelStyle, props.textStyle]}
        >{props.title}</Button>
    )
}

export default CustomButton

const useStyles = () => {
    const { colors } = useAppSelector(state => state.CommonSlice)
    return (
        StyleSheet.create({
            container:{
                width: '90%', 
                justifyContent: 'center', 
                alignItems:'center',
                borderRadius: wp(3) ,
                paddingVertical: wp(2)
            },
            labelStyle: {
                color: colors.SECONDARY_TEXT, 
                fontFamily: "NotoSansKRBold", 
                fontSize: FontSize.FONT_SIZE_18,
            }
        })
    )
}