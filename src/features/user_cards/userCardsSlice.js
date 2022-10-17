import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const userCardsSlice = createSlice({
    name: 'userCards',
    initialState,
    reducers: {
        init: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const {init} = userCardsSlice.actions;

export default userCardsSlice.reducer