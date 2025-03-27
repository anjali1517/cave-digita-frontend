import { APP_URL } from "./Host";

export const ApiConstants = {
    SIGNUP: APP_URL + "/auth/signup",
    LOGIN: APP_URL + "/auth/login",
    ADD_TASK: APP_URL + "/tasks",
    GET_ALL_TASK: APP_URL + "/tasks",
    UPDATE_TASK: APP_URL + "/update-tasks",
    DELETE_TASK: APP_URL  + "/delete-tasks",
    LOGOUT: APP_URL + "/auth/logout",
    SEND_VERIFICATION_CODE: APP_URL + "/auth/send-verification-code",
    VERIFY_VERIFICATION_CODE: APP_URL + "/auth/verify-verification-code",
    GET_USER_TASK: APP_URL + "/specific-tasks"

}