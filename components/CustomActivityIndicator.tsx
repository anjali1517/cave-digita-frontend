import React, { memo } from 'react';
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/Store';

const CustomActivityIndicator = (indicatorProps: ActivityIndicatorProps) => {

    const { colors } = useAppSelector(state => state.CommonSlice);
    const Styles = useStyles();

    return (
        <ActivityIndicator
            {...indicatorProps}
            color={colors.SECONDARY_SHADOW}
            style={Styles.indicatorStyle}
            size={'large'}
        />
    );
};

export default memo(CustomActivityIndicator);

const useStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice)

    return StyleSheet.create({
        indicatorStyle: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            justifyContent: 'center',  
            alignItems: 'center',
        }
    });
};
