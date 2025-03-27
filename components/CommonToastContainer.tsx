import React, { memo } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAppSelector } from '../redux/Store';
import { FontSize } from '../styles/FontSizes';

interface CommonToastViewProps {
    title: string,
    containerStyle?: ViewStyle,
    txtStyle?: TextStyle,
};

const CommonToastContainer = (props: CommonToastViewProps) => {

    const Styles = useStyles();

    return (
        <View style={[Styles.bottomToastContainer, props.containerStyle]}>
            <Text style={[Styles.bottomToastText, props.txtStyle]}>{props.title}</Text>
        </View>
    );
};

export default memo(CommonToastContainer);

const useStyles = () => {
    const {colors} = useAppSelector(state => state.CommonSlice)
    return StyleSheet.create({
        bottomToastContainer: {
            marginBottom: hp(11),
            backgroundColor: colors.PRIMARY,
            padding: wp(2.5),
            borderRadius: wp(3),
            borderColor: colors.PRIMARY,
            borderWidth: 1
        },
        bottomToastText: {
            fontSize: FontSize.FONT_SIZE_12,
            fontFamily: "NotoSansKRMedium",
            color: colors.PRIMARY_TEXT
        },
    });
};
