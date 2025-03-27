import { Alert } from "react-native";
import { AppString } from "../AppString/AppString";

export const AppAlert = (title: string, message: string, onPositivePress?: () => void, onNegativePress?: () => void, leftTxt?: string, rightTxt?: string) => {
    Alert.alert(
        title,
        message,
        [
            {
                text: leftTxt ?? AppString.cancel,
                onPress: () => onNegativePress?.()
            },
            {
                text: rightTxt ?? AppString.ok,
                onPress: () => onPositivePress?.()
            }
        ]);
};
