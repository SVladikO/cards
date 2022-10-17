import {createSlice} from "@reduxjs/toolkit";

import {TURN} from "../../constants";

const initialState = {
    // true - computer attack, false - user attack
    isComputerAttack: '',
    // true - computer walk, false - user walk
    isComputerWalk: '',
}

export const gameDetailsSlice = createSlice({
    name: 'gameDetails',
    initialState,
    reducers: {
        setIsComputerTurnAttack: (state, action) => {
            state.isComputerAttack = action.payload;
        },
        setIsComputerTurnWalk: (state, action) => {
            state.isComputerWalk = action.payload;
        },
        changeTurnAttack: (state) => {
            state.isComputerAttack = !state.isComputerAttack
        },
        changeTurnWalk: (state) => {
            state.isComputerWalk = !state.isComputerWalk
        }
    }
})

export const {
    setIsComputerTurnAttack,
    setIsComputerTurnWalk,
    changeTurnAttack,
    changeTurnWalk,
} = gameDetailsSlice.actions;

export default gameDetailsSlice.reducer