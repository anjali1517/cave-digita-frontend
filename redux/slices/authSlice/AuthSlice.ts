import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../../config/Axio";
import { ApiConstants } from "../../../config/ApiConstants";
import { AppAlert } from "../../../utils/AppAlert";
import { AppString } from "../../../AppString/AppString";
import { parseErrorData } from "../../../utils/HelperFunctions";
import CommonToastContainer from "../../../components/CommonToastContainer";
import { string } from "yup";

export interface apiErrorTypes {
    data: string,
    status: number
};

interface ParamsType {
    email?: string,
    name?: string,
    password?: string
}

interface SignupProps {
    success: boolean,
    message: string,
    token: string,
    result: {
        email: string,
        name: string,
        _id: string
    }
}

interface InitialStateProps {
    signupLoading: boolean,
    loginLoading: boolean,
    userDetails: SignupProps,
    userEmail: {email :string, code:string},
    isSessionExpire: boolean
}

const initialState: InitialStateProps = {
    signupLoading: false,
    loginLoading: false,
    userEmail:{email: '', code:''},
    userDetails: {
        success: false,
        message: '',
        token: '',
        result: {
            email: '',
            name: '',
            _id: ''
        }
    },
    isSessionExpire:false
}

const AUTH = "AUTH";

export const signUp = createAsyncThunk<SignupProps, ParamsType, { rejectValue: apiErrorTypes }>(AUTH + "/signUp",
    async (params, { rejectWithValue }) => {

        try {
            const response = await axiosClient.post(ApiConstants.SIGNUP, params)
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Access message from backend error response
                AppAlert(AppString.error, error.response.data.message)
                return rejectWithValue(error.response.data);
            }
        }
    });

export const login = createAsyncThunk<SignupProps, ParamsType, { rejectValue: apiErrorTypes }>(AUTH + "/login",
    async (params, { rejectWithValue }) => {

        try {
            const response = await axiosClient.post(ApiConstants.LOGIN, params)
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Access message from backend error response
                AppAlert(AppString.error, error.response.data.message)
                return rejectWithValue(error.response.data);
            }
        }
    });

export const userLogOut = createAsyncThunk<string, null, { rejectValue: apiErrorTypes }>(AUTH + "/userLogOut",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(ApiConstants.LOGOUT)
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Access message from backend error response
                AppAlert(AppString.error, error.response.data.message)
                return rejectWithValue(error.response.data);
            }
        }
    });

export const sendVerificationCode = createAsyncThunk<any, ParamsType, { rejectValue: apiErrorTypes }>(AUTH + "/sendVerificationCode",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.patch(ApiConstants.SEND_VERIFICATION_CODE, params,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Access message from backend error response
                AppAlert(AppString.error, error.response.data.message)
                return rejectWithValue(error.response.data);
            }
        }
    });

export const verifyVerificationCode = createAsyncThunk<string, ParamsType, { rejectValue: apiErrorTypes }>(AUTH + "/verifyVerificationCode",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.patch(ApiConstants.VERIFY_VERIFICATION_CODE, params,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Access message from backend error response
                AppAlert(AppString.error, error.response.data.message)
                return rejectWithValue(error.response.data);
            }
        }
    });


export const AuthSlice = createSlice({
    name: AUTH,
    initialState,
    reducers: {
        showSessionExpirePopup: (state, action) => {
            state.isSessionExpire = action.payload
        },
    },
    extraReducers(builder) {
        builder.addCase(signUp.pending, (state) => {
            state.signupLoading = true
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.signupLoading = false,
                state.userDetails = action.payload
        });
        builder.addCase(signUp.rejected, (state) => {
            state.signupLoading = false
        });

        builder.addCase(login.pending, (state) => {
            state.loginLoading = true
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loginLoading = false,
                state.userDetails = action.payload
        });
        builder.addCase(login.rejected, (state) => {
            state.loginLoading = false
        });

        builder.addCase(sendVerificationCode.pending, (state) => {
            state.loginLoading = true
        });
        builder.addCase(sendVerificationCode.fulfilled, (state, action) => {
            state.loginLoading = false
            state.userEmail = action.payload
        });
        builder.addCase(sendVerificationCode.rejected, (state) => {
            state.loginLoading = false
        });

        builder.addCase(verifyVerificationCode.pending, (state) => {
            state.loginLoading = true
        });
        builder.addCase(verifyVerificationCode.fulfilled, (state, action) => {
            state.loginLoading = false
        });
        builder.addCase(verifyVerificationCode.rejected, (state) => {
            state.loginLoading = false
        });
    },
})

export const { showSessionExpirePopup} = AuthSlice.actions;
export default AuthSlice.reducer;