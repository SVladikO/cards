import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const roundCardsSlice = createSlice({
    name: 'roundCards',
    initialState,
    reducers: {
        init: (state, action) => {
            state.value = action.payload;
        },
        addCard: (state, action) => {
            state.value.push(action.payload);
        }
    }
})

export const {init, addCard} = roundCardsSlice.actions;

export default roundCardsSlice.reducer