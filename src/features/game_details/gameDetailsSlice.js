import {createSlice} from "@reduxjs/toolkit";

import {TURN_ATTACK} from "../../constants";

const initialState = {
    turnAttack: '',
}

export const gameDetailsSlice = createSlice({
    name: 'gameDetails',
    initialState,
    reducers: {
        setUserTurnAttack: (state) => {
            state.turnAttack = TURN_ATTACK.USER;
        },
        setComputerTurnAttack: (state) => {
            state.turnAttack = TURN_ATTACK.COMPUTER;
        },
        changeTurnAttack: (state) => {
            state.turnAttack = state.turnAttack === TURN_ATTACK.USER
                    ? TURN_ATTACK.COMPUTER
                    : TURN_ATTACK.USER
        }
    }
})

export const {setUserTurnAttack, setComputerTurnAttack, changeTurnAttack} = gameDetailsSlice.actions;

export default gameDetailsSlice.reducer