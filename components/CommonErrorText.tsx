import React, { memo } from 'react';
import { useAppSelector } from '../redux/Store';
import { StyleSheet, Text, TextStyle } from 'react-native';
import {  widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontSize } from '../styles/FontSizes';

interface CommonErrorTextProps {
    title: string,
};

const CommonErrorText = (props: CommonErrorTextProps & TextStyle) => {

    const Styles = useStyles();

    return (
        <Text {...props} numberOfLines={2} style={Styles.errorTxtStyle}>{props.title}</Text>
    );
};

export default memo(CommonErrorText);

const useStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice);

    return (
        StyleSheet.create({
            errorTxtStyle: {
                color: colors.ERROR_TEXT,
                fontFamily: "NotoSansKRRegular",
                fontSize: FontSize.FONT_SIZE_12,
                paddingHorizontal: wp(0.5),
                alignSelf:'flex-start',
                marginLeft:wp(7),
                lineHeight: 14
            },
        })
    );
};
