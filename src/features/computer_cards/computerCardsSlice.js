import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const computerCardsSlice = createSlice({
    name: 'computerCards',
    initialState,
    reducers: {
        initComputerCards: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const {initComputerCards} = computerCardsSlice.actions;

export default computerCardsSlice.reducer