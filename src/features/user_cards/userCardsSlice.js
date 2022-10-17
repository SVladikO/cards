import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const userCardsSlice = createSlice({
    name: 'userCards',
    initialState,
    reducers: {
        initUserCards: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const {initUserCards} = userCardsSlice.actions;

export default userCardsSlice.reducer