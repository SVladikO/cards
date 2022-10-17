import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const userCardsSlice = createSlice({
    name: 'userCards',
    initialState,
    reducers: {
        updateCards: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {updateCards} = userCardsSlice.actions;

export default userCardsSlice.reducer