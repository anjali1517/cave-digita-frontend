import { FlatList, Image, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomCircleView from '../components/CustomCircleView'
import CustomBackButton from '../components/CustomBackButton'
import { IconsPath } from '../utils/IconsPath'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useAppDispatch, useAppSelector, USER_LOGOUT } from '../redux/Store'
import { FontSize } from '../styles/FontSizes'
import { ActivityIndicator, Icon, Text } from 'react-native-paper'
import { AppString } from '../AppString/AppString'
import CustomContainer from '../components/CustomContainer'
import useCustomNavigation from '../hook/useCustomNavigation'
import { useIsFocused } from '@react-navigation/native'
import { addTask, getAllTaskList, setAddBtn, TaskListProps } from '../redux/slices/HomeSlice/homeSlice'
import { userLogOut } from '../redux/slices/authSlice/AuthSlice'
import { setAsyncStorageData } from '../utils/HelperFunctions'
import CustomActivityIndicator from '../components/CustomActivityIndicator'


const HomeScreen = () => {
    const Styles = useStyles()
    const navigation = useCustomNavigation('HomeScreen')
    const { colors } = useAppSelector(state => state.CommonSlice)
    const { userDetails } = useAppSelector(state => state.AuthSlice)
    const { taskList, taskListLoading } = useAppSelector(state => state.HomeSlice)
    const [refreshing, setRefreshing] = useState(false);
    const focus = useIsFocused()
    const dispatch = useAppDispatch()
    const [page, setpage] = useState(0)

    useEffect(() => {
        if (focus) {
            setAsyncStorageData(AppString.is_first_time_open, true)
            dispatch(setAddBtn(false))
            const params = {
                page: page
            }
            getTaskList(params)
        } else {
            setpage(0)
        }
    }, [focus])

    const getTaskList = async (params: any) => {

        dispatch(getAllTaskList(params)).unwrap().then((res) => {
            setRefreshing(false)
            setpage(page + 10)
        }).catch(() => { })
    }

    // ** Handle Clear local Storage while logout or delete account
    const handleClearStorage = () => {
        dispatch({ type: USER_LOGOUT })
        navigation.navigate('Login')
    }

    const userLogOutApi = async () => {
        dispatch(userLogOut(null)).unwrap().then(() => {
            handleClearStorage()
        }).catch((error) => {
        })
    };

    const renderListItem = ({ item, index }: { item: TaskListProps, index: number }) => {
        return (
            <TouchableOpacity style={Styles.listContainer} onPress={() => navigation.navigate('AddTaskScreen', { item: item })}>
                <Image source={IconsPath.LIST_ICON} style={{ width: wp(5), height: wp(5), resizeMode: 'contain' }} />
                <Text style={Styles.listText}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={Styles.mainContainer}>
            {(taskListLoading && !refreshing) ? <CustomActivityIndicator /> : <></>}
            <CustomContainer>
                <CustomCircleView />
                <TouchableOpacity style={{ position: 'absolute', right: wp(6), top: wp(15) }} onPress={() => userLogOutApi()}>
                    <Image source={IconsPath.LOGOUT} style={Styles.logoutIcon} />
                </TouchableOpacity>
                <CustomBackButton icon={IconsPath.USER} iconStyle={{ top: wp(30) }} />
                <Text style={Styles.titlStyle}>{userDetails.result?.name.toUpperCase()}</Text>
                <View style={Styles.container}>
                    <View style={Styles.circle} />
                    <View style={Styles.line} />
                    <View style={Styles.circle} />
                </View>
                <View style={{ marginHorizontal: wp(8), marginTop: wp(6), height: '60%' }}>
                    <FlatList
                        data={taskList?.data}
                        renderItem={renderListItem}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled
                        onEndReachedThreshold={0.5}
                        showsVerticalScrollIndicator={false}
                        onEndReached={() => {
                            if (taskList?.next && !taskListLoading) {
                                const params = {
                                    page: page
                                }
                                getTaskList(params)
                            }
                        }}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={() => {
                                if (!refreshing) {
                                    setRefreshing(true)
                                    const params = {
                                        page: 1
                                    }
                                    getTaskList(params)
                                }
                            }} />
                        }
                        // ListFooterComponent={() => taskListLoading ? <ActivityIndicator style={{ margin: wp(5) }} color={colors.SECONDARY_SHADOW} /> : null}
                        ListEmptyComponent={() =>
                            !taskListLoading && (
                                <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
                                    <Image source={IconsPath.NOT_FOUND} style={{width:wp(130), height:wp(130), resizeMode:'contain'}}/>
                                </View>
                            )
                        }
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('AddTaskScreen')} style={{ flexDirection: 'row', marginLeft: wp(6), marginVertical: wp(4) }}>
                    <Icon source={IconsPath.PLUS_ICON} color={colors.SECONDARY_SHADOW} size={24} />
                    <Text style={Styles.plustext}>{AppString.add_new_task}</Text>
                </TouchableOpacity>
            </CustomContainer>
        </View>
    )
}

export default HomeScreen

const useStyles = () => {
    const { colors } = useAppSelector(state => state.CommonSlice)
    return (
        StyleSheet.create({
            mainContainer: {
                flex: 1,
                backgroundColor: colors.PRIMARY,
            },
            titlStyle: {
                position: 'absolute',
                top: wp(29),
                left: wp(16),
                fontSize: FontSize.FONT_SIZE_22,
                fontFamily: "NotoSansKRExtraBold",
                width: "90%",
                letterSpacing: 2
            },
            logoutIcon: {
                width: wp(6),
                height: wp(6),
                tintColor: colors.ERROR_TEXT,

            },
            container: {
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: wp(4)
            },
            circle: {
                width: wp(4),
                height: wp(4),
                borderRadius: wp(5),
                backgroundColor: colors.SECONDARY,
            },
            line: {
                flex: 1,
                height: wp(0.5),
                backgroundColor: colors.SECONDARY
            },
            listContainer: {
                flexDirection: 'row',
                marginVertical: wp(3)
            },
            listText: {
                fontSize: FontSize.FONT_SIZE_18,
                color: colors.PRIMARY_TEXT,
                fontFamily: "NotoSansKRMedium",
                lineHeight: 22,
                marginLeft: wp(3)
            },
            plustext: {
                fontSize: FontSize.FONT_SIZE_20,
                color: colors.PRIMARY_TEXT,
                fontFamily: "NotoSansKRBold",
                lineHeight: 26,
                marginLeft: wp(3)
            }
        })
    )
}