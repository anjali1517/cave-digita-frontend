import { TaskListProps } from "../redux/slices/HomeSlice/homeSlice";

export type RootStackParamsList = {
    Login: undefined;
    SignUpScreen: undefined;
    ForgetPasswordScreen: undefined ;
    HomeScreen: undefined;
    AddTaskScreen: {item?: TaskListProps} | undefined;
    EnterVerificationCode: undefined,
    UpdatePasswordScreen: {code: string},
    OnBoardingScreen: undefined
}