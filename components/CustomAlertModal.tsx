import { Image, ImageProps, ImageSourcePropType, Modal, Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { memo } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAppSelector } from '../redux/Store';
import { IconsPath } from '../utils/IconsPath';
import { FontSize } from '../styles/FontSizes';
import CustomPrimaryBtn from './CustomPrimaryBtn';

interface CustomModelAlertProps {
    onPressYes?: () => void,
    onPressNo?: () => void,
    isOpen?: boolean
    title?: string
    subTitle?: string
    yesBtnVisible?: boolean
    yesBtnTitle?: string,
    noBtnTitle?: string,
    isIconVisible?: boolean,
    iconsVisible?: boolean,
    isIcons?: ImageSourcePropType,
}

const CustomAlertModal = (props: CustomModelAlertProps) => {
    const styles = useStyles();
    const { colors } = useAppSelector(state => state.CommonSlice);
    return (
        <Modal
            animationType="fade"
            transparent={props.isOpen}
            visible={true}
            onRequestClose={props.yesBtnVisible ? props.onPressNo : props.onPressYes}>
            <View style={styles.container}>
                <View style={styles.model}>

                    {props.iconsVisible && <Image source={IconsPath.PLUS_ICON} style={{width: wp(6), height: wp(6)}}/>}
                    {props.title && <Text style={styles.title}>{props.title}</Text>}
                    <Text style={styles.subTitle}>{props.subTitle}</Text>
                    <View style={styles.btnContainer}>
                        <CustomPrimaryBtn
                            onPress={props.onPressYes}
                            title={props.yesBtnTitle ?? "Ok"}
                            style={[styles.btnStyle, { backgroundColor: colors.SECONDARY_SHADOW }]}
                            txtStyle={{ alignSelf: 'center' }}
                        />
                        {props.yesBtnVisible ?
                            <>
                                <View style={{ marginHorizontal: wp(1) }} />
                                <CustomPrimaryBtn
                                    onPress={props.onPressNo}
                                    title={props.noBtnTitle ?? "No"}
                                    style={[styles.btnStyle, { backgroundColor: colors.TRANSPARENT }]}
                                    txtStyle={{ alignSelf: 'center', color: colors.PRIMARY_TEXT }}
                                />
                            </> : null

                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default memo(CustomAlertModal)

const useStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice);
   

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center'
        },
        model: {
            backgroundColor: colors.SECONDARY_TEXT,
            borderRadius: wp(3),
            width: '85%',
            alignItems: 'center',
            paddingVertical: wp(3),
            paddingHorizontal: wp(3)
        },
        title: {
            color: colors.PRIMARY_TEXT,
            fontFamily: "NotoSansKRBold",
            fontSize: FontSize.FONT_SIZE_14,
            marginVertical: wp(1),
        },
        subTitle: {
            color: colors.PRIMARY_TEXT,
            fontFamily: "NotoSansKRRegular",
            fontSize: FontSize.FONT_SIZE_14,
            textAlign: 'center',
        },
        btnContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center'
        },
        btnStyle: {
            paddingVertical: wp(2.5),
            width: '48%',
            borderRadius: wp(3.5),
            backgroundColor: colors.SECONDARY,
            borderColor: colors.PRIMARY,
            borderWidth: wp(0.3),
            marginTop: wp(3)
        },
        btnTxt: {
            color: colors.PRIMARY_TEXT,
            fontFamily: "NotoSansKRRegular",
            fontSize: FontSize.FONT_SIZE_15,
            textAlign: 'center'
        }
    })
}