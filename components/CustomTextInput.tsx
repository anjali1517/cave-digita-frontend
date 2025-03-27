import { Dimensions, Platform, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { TextInput, TextInputProps, useTheme } from 'react-native-paper'
import { useAppSelector } from '../redux/Store'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize } from '../styles/FontSizes'

interface CustomTextInputProps {
    label?: string,
    value: string,
    containerStyles?: ViewStyle,
    mainContainerStyle?: ViewStyle,
    isError?: boolean
}

const { width } = Dimensions.get('window');

const CustomTextInput = (props: CustomTextInputProps & TextInputProps) => {
    const { colors } = useAppSelector(state => state.CommonSlice)
    const Styles = useStyles()
    const theme = useTheme();

    return (
        <View style={[Styles.containerStyle, props.mainContainerStyle,{borderColor: props.isError ? colors.ERROR_TEXT : colors.SECONDARY_TEXT}]}>
            <TextInput
                {...props}
                placeholderTextColor={colors.PLACEHOLDER_TEXT}
                label={props.label}
                value={props.value}
                underlineColor={colors.SECONDARY_TEXT}
                textColor={colors.PRIMARY_TEXT}
                style={[Styles.textInputContainerStyle, props.containerStyles]}
                outlineStyle={{ borderRadius: width * 0.06 }} 
                theme={{
                    fonts: { displayMedium: {...theme.fonts.displayMedium, fontFamily: "NotoSansKRMedium"} },
                    colors: {
                      text: colors.PRIMARY, 
                      primary: colors.PRIMARY, 
                    },
                  }}
            />
        </View>
    )
}

export default CustomTextInput

const useStyles = () => {
    const { colors } = useAppSelector(state => state.CommonSlice)
    return (
        StyleSheet.create({
            containerStyle :{
                borderRadius: wp(8),
                flexDirection: 'row',
                borderWidth: wp(0.3),
                alignItems: 'center',
                paddingHorizontal: wp(4),
                paddingVertical:wp(0.4),
                backgroundColor: colors.SECONDARY_TEXT,
                width: '94%',
                marginVertical:wp(3)
            },
            textInputContainerStyle: {
                flex: 1,
                fontSize: FontSize.FONT_SIZE_16,
                fontFamily: "NotoSansKRBold",
                color: colors.PRIMARY_TEXT,
                backgroundColor: colors.SECONDARY_TEXT,
                height: wp(13),
            },
        })
    )
}