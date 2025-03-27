import React, { memo } from 'react';
import { useAppSelector } from '../redux/Store';
import { FontSize } from '../styles/FontSizes';
import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface CustomPrimaryButtonProps {
    txtStyle?: TextStyle,
    title: String
};

const CustomPrimaryBtn = (props: CustomPrimaryButtonProps & TouchableOpacityProps) => {

    const Styles = useStyles();

    return (
        <TouchableOpacity {...props}>
            <Text style={[Styles.btnTitleStyle, props.txtStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export default memo(CustomPrimaryBtn);

const useStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice);

    return (
        StyleSheet.create({
            btnTitleStyle: {
                fontFamily: "NotoSansKRMedium",
                fontSize: FontSize.FONT_SIZE_16,
                color: colors.PRIMARY_TEXT,
                lineHeight: 22
            },
        })
    );
};
