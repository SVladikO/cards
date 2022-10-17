import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const roundCardsSlice = createSlice({
    name: 'roundCards',
    initialState,
    reducers: {
        updateCards: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {updateCards} = roundCardsSlice.actions;

export default roundCardsSlice.reducer