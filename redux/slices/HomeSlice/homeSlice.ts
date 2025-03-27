import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../../config/Axio";
import { ApiConstants } from "../../../config/ApiConstants";
import { AppAlert } from "../../../utils/AppAlert";
import { AppString } from "../../../AppString/AppString";
import { parseErrorData } from "../../../utils/HelperFunctions";
import CommonToastContainer from "../../../components/CommonToastContainer";

export interface apiErrorTypes {
    data: string,
    status: number
};

interface ParamsType {
    title?: string,
    description?: string,
    page?: number,
    _id?: string
}

export interface TaskListProps {
    _id?: string,
    title: string,
    description: string,
    userId: string
}

interface GetTaskList {
    count: number,
    next: string,
    previous: string,
    data: TaskListProps[] 
}

interface InitialStateProps {
    taskListLoading: boolean,
    taskDeatils: TaskListProps,
    taskList: GetTaskList,
    isAddBtn: boolean 
}

const initialState: InitialStateProps = {
    taskListLoading: false,
    taskDeatils: {
        title:'',
        description:'',
        userId:''
    },
    taskList: {
        count:0,
        next:'',
        previous:'',
        data: []
    },
    isAddBtn: false
}

const HOME = "HOME";

export const addTask = createAsyncThunk<TaskListProps, ParamsType, { rejectValue: apiErrorTypes }>(HOME + "/addTask",
    async (params, { rejectWithValue }) => {
        
        try {
            const response = await axiosClient.post(ApiConstants.ADD_TASK, params)
            return response.data
        } catch (error: any) {
            console.log(error)
            if (error.response && error.response.data && error.response.status !== 401) {
                // Access message from backend error response
                AppAlert(AppString.error,error.response.data.message)
                return rejectWithValue(error.response.data);
            } 
        }
    });

    export const updateTask = createAsyncThunk<TaskListProps, ParamsType, { rejectValue: apiErrorTypes }>(HOME + "/updateTask",
        async (params, { rejectWithValue }) => {
            
            try {
                const response = await axiosClient.put(ApiConstants.UPDATE_TASK + `/?_id=${params._id}`, params)
                return response.data
            } catch (error: any) {
                console.log(error)
                if (error.response && error.response.data && error.response.status !== 401) {
                    // Access message from backend error response
                    AppAlert(AppString.error,error.response.data.message)
                    return rejectWithValue(error.response.data);
                } 
            }
        });

        export const deleteTask = createAsyncThunk<TaskListProps, ParamsType, { rejectValue: apiErrorTypes }>(HOME + "/deleteTask",
            async (params, { rejectWithValue }) => {
                try {
                    const response = await axiosClient.delete(ApiConstants.DELETE_TASK + `/?_id=${params._id}`)
                    return response.data
                } catch (error: any) {
                    console.log(error)
                    if (error.response && error.response.data && error.response.status !== 401) {
                        // Access message from backend error response
                        AppAlert(AppString.error,error.response.data.message)
                        return rejectWithValue(error.response.data);
                    } 
                }
            });

    export const getAllTaskList = createAsyncThunk<GetTaskList, ParamsType, { rejectValue: apiErrorTypes }>(HOME + "/getAllTaska",
        async (params, { rejectWithValue }) => {
            
            try {
                const response = await axiosClient.get(ApiConstants.GET_ALL_TASK + `?page=${params.page}&limit=10`)
                return response.data
            } catch (error: any) {
                if (error.response && error.response.data && error.response.status !== 401) {
                    // Access message from backend error response
                    AppAlert(AppString.error,error.response.data.message)
                    return rejectWithValue(error.response.data);
                } 
            }
        });

        export const getUserTaskList = createAsyncThunk<GetTaskList, ParamsType, { rejectValue: apiErrorTypes }>(HOME + "/getUserTaskList",
            async (params, { rejectWithValue }) => {
                
                try {
                    const response = await axiosClient.get(ApiConstants.GET_USER_TASK + `?page=${params.page}&limit=10`)
                    return response.data
                } catch (error: any) {
                    console.log(error)
                    if (error.response && error.response.data && error.response.status !== 401) {
                        // Access message from backend error response
                        AppAlert(AppString.error,error.response.data.message)
                        return rejectWithValue(error.response.data);
                    } 
                }
            });

export const HomeSlice = createSlice({
    name: HOME,
    initialState,
    reducers: {
        setAddBtn: (state, action) => {
            state.isAddBtn = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(addTask.pending, (state) => {
            state.taskListLoading = true
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.taskListLoading = false,
            state.taskDeatils = action.payload
        });
        builder.addCase(addTask.rejected, (state) => {
            state.taskListLoading = false
        });

        builder.addCase(getAllTaskList.pending, (state) => {
            state.taskListLoading = true
        });
        builder.addCase(getAllTaskList.fulfilled, (state, action) => {
            state.taskListLoading = false,
            state.taskList = action.payload
        });
        builder.addCase(getAllTaskList.rejected, (state) => {
            state.taskListLoading = false
        });

        builder.addCase(updateTask.pending, (state) => {
            state.taskListLoading = true
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.taskListLoading = false,
            state.taskDeatils = action.payload
        });
        builder.addCase(updateTask.rejected, (state) => {
            state.taskListLoading = false
        });

        builder.addCase(deleteTask.pending, (state) => {
            state.taskListLoading = true
        });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.taskListLoading = false
        });
        builder.addCase(deleteTask.rejected, (state) => {
            state.taskListLoading = false
        });
    },
})

export const {setAddBtn} = HomeSlice.actions;
export default HomeSlice.reducer;