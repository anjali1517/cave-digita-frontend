import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomCircleView from '../components/CustomCircleView'
import CustomContainer from '../components/CustomContainer'
import { store, useAppDispatch, useAppSelector } from '../redux/Store'
import { IconsPath } from '../utils/IconsPath'
import CustomBackButton from '../components/CustomBackButton'
import useCustomNavigation from '../hook/useCustomNavigation'
import { Text } from 'react-native-paper'
import { AppString } from '../AppString/AppString'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FontSize } from '../styles/FontSizes'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native'
import { addTask, deleteTask, setAddBtn, updateTask } from '../redux/slices/HomeSlice/homeSlice'
import { RootStackParamsList } from '../types/RootStackList'
import * as yup from 'yup'
import { useFormik } from 'formik'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

const AddTaskScreen = () => {

    const Style = useStyle()
    const { colors } = useAppSelector(state => state.CommonSlice)
    const {taskListLoading} = useAppSelector(state => state.HomeSlice)
    const navigation = useCustomNavigation('AddTaskScreen')
    type NestedScreenRouteProp = RouteProp<RootStackParamsList, 'AddTaskScreen'>;
    const route = useRoute<NestedScreenRouteProp>();
    const item = route?.params?.item
    const [title, settitle] = useState(item?.title ?? '')
    const [description, setdescription] = useState(item?.description ?? '')
    const focus = useIsFocused()
    const dispatch = useAppDispatch()

    const addTaskSchema = yup.object().shape({
        title: yup.string().trim(),
        description: yup.string().trim()
    })

    const { handleSubmit, handleChange, values } = useFormik({
        validationSchema: addTaskSchema,
        initialValues: {
            title: item?.title ?? '',
            description: item?.description ?? ''
        },
        onSubmit: (values) => {
            if (values.title !== '' || values.description != '') {
                if (!store.getState().HomeSlice.isAddBtn) {
                    addTaskDeatils()
                } else {
                    updateTaskDeatils()
                }
            }
        }
    })

    useEffect(() => {
        if(item !== undefined){
            if (item?.title !== values.title || item?.description !== values.description) {
                dispatch(setAddBtn(true))
            }
        }
    }, [values])

    const addTaskDeatils = () => {
        const params = {
            title: values.title,
            description: values.description
        }
        dispatch(addTask(params)).unwrap().then((res) => {
            navigation.goBack()
        })
    }

    const updateTaskDeatils = () => {
        const params = {
            _id: item?._id,
            title: values.title,
            description: values.description
        }
        dispatch(updateTask(params)).unwrap().then((res) => {
            navigation.goBack()
        })
    }

    const deleteTaskDeatils = () => {
        const params = {
            _id: item?._id,
        }
        dispatch(deleteTask(params)).unwrap().then((res) => {
            navigation.goBack()
        })
    }

    return (
        <View style={Style.mainContainer}>
            {taskListLoading ? <CustomActivityIndicator /> : <></>}
            <CustomCircleView circleStyle={{ backgroundColor: colors.SHADOW_COLOR2 }} circleStyleContainer={{ backgroundColor: colors.SHADOW_COLOR2 }} />
            {(item?._id && item) ?
                <TouchableOpacity style={{ position: 'absolute', right: wp(6), top: wp(15) }} onPress={() => deleteTaskDeatils()}>
                    <Image source={IconsPath.DELETE_ICON} style={Style.logoutIcon} />
                </TouchableOpacity>
                : <></>}
            <CustomBackButton icon={IconsPath.BACK_ICON} onPress={() => navigation.goBack()} iconStyle={{ top: wp(24) }} />
            <Text style={Style.titlStyle}>{AppString.new_task}</Text>
            <View style={{ alignItems: 'center' }}>
                <CustomTextInput
                    focusable
                    returnKeyType='done'
                    keyboardType='email-address'
                    placeholder={AppString.enter_title}
                    value={values.title}
                    onChangeText={handleChange("title")}
                    mainContainerStyle={{ borderRadius: wp(2) }}
                />
                <CustomTextInput
                    multiline
                    returnKeyType='done'
                    keyboardType='email-address'
                    placeholder={AppString.enter_description}
                    value={values.description}
                    onChangeText={handleChange("description")}
                    containerStyles={Style.textInputContainer}
                    mainContainerStyle={{ borderRadius: wp(2) }}
                />
            </View>
            <View style={{ alignItems: 'center', marginVertical: wp(5) }}>
                <CustomButton title={store.getState().HomeSlice.isAddBtn ? AppString.update : AppString.add} onPress={() => handleSubmit()} />
            </View>
        </View>
    )
}

export default AddTaskScreen

const useStyle = () => {
    const { colors } = useAppSelector(state => state.CommonSlice)
    return (
        StyleSheet.create({
            mainContainer: {
                flex: 1,
                backgroundColor: colors.SECONDARY_SHADOW,
            },
            titlStyle: {
                position: 'absolute',
                top: wp(23),
                left: wp(16),
                fontSize: FontSize.FONT_SIZE_22,
                fontFamily: "NotoSansKRExtraBold",
                width: "90%",
            },
            textInputContainer: {
                alignItems: 'flex-start',
                maxHeight: wp(100),
                minHeight: wp(30),
            },
            logoutIcon: {
                width: wp(8),
                height: wp(8),
                resizeMode: 'contain',
            },
        })
    )
}