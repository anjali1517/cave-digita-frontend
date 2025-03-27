import { createSlice } from "@reduxjs/toolkit";
import { colors } from "../styles/Colors";
import { ColorsTypes } from "../types/ColorsTypes";

interface initialStateTypes {
    colors: ColorsTypes,
};

const initialState: initialStateTypes = {
    colors: colors,
};

export const CommonSlice = createSlice({
    name: "COMMON_REDUCER",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.colors = colors
        },
    },
});

export const { setTheme } = CommonSlice.actions;
export default CommonSlice.reducer;