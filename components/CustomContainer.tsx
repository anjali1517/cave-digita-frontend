import { StyleSheet, Text, View, ViewProps, ViewStyle } from 'react-native'
import React from 'react'
import { useAppSelector } from '../redux/Store'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

const CustomContainer = ({ style, children }: ViewProps) => {
  const Styles = useStyles()
  return (
    <View style={[Styles.constiner, style]}>
      {children}
    </View>
  )
}

export default CustomContainer

const useStyles = () => {
  const { colors } = useAppSelector(state => state.CommonSlice)
  return (
    StyleSheet.create({
      constiner: {
        backgroundColor: colors.PRIMARY,
        paddingHorizontal: wp(4),
      }
    })
  )
}