import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppString } from "../AppString/AppString";

function isEmptyObj(obj: any) {
    if (typeof obj !== 'object' || obj === null) {
      return false; // Not an object, or null, so it's not considered empty
    }
    return Object.keys(obj).length === 0;
  }

export const parseErrorData = (response: { data: string[] & string, status: number }): string => {
    if (response?.data) {
        if (isEmptyObj(response?.data) || response.status == 500) {
            return AppString.something_went_wrong;
        }
        let customErrroMessage = '';
        for (const errorKey in response?.data) {
            customErrroMessage += Array.isArray(response?.data[errorKey]) ? response?.data[errorKey][0] : response?.data[errorKey] + '\n';
        }
        return customErrroMessage;
    } else {
        return AppString.something_went_wrong;
    }
};

export const getAsyncStorageData = async (key: string) => {
    const data = await AsyncStorage.getItem(key);
    if (data) {
        const parse_data = JSON.parse(data);
        return parse_data;
    } else {
        return null;
    }
};

export const setAsyncStorageData = async (key: string, data: any) => {
    const stringify_data = JSON.stringify(data);
    await AsyncStorage.setItem(key, stringify_data);
};