import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const roundCardsSlice = createSlice({
    name: 'roundCards',
    initialState,
    reducers: {
        addCardToRound: (state, action) => {
            state.value.push(action.payload);
        }
    }
})

export const {addCardToRound} = roundCardsSlice.actions;

export default roundCardsSlice.reducer