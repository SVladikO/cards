import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const roundCardsSlice = createSlice({
    name: 'roundCards',
    initialState,
    reducers: {
        initRoundCards: (state, action) => {
            state.value = action.payload;
        },
        addCardToRound: (state, action) => {
            state.value.push(action.payload);
        }
    }
})

export const {initRoundCards, addCardToRound} = roundCardsSlice.actions;

export default roundCardsSlice.reducer