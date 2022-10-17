import {createSlice} from "@reduxjs/toolkit";

import {TURN} from "../../constants";

const initialState = {
    turnAttack: '',
    turnWalk: '',
}

export const gameDetailsSlice = createSlice({
    name: 'gameDetails',
    initialState,
    reducers: {
        setUserTurnAttack: (state) => {
            state.turnAttack = TURN.USER.ATTACK;
        },
        setComputerTurnAttack: (state) => {
            state.turnAttack = TURN.COMPUTER.ATTACK;
        },
        setUserTurnWalk: (state) => {
            state.turnWalk = TURN.USER.WALK;
        },
        setComputerTurnWalk: (state) => {
            state.turnWalk = TURN.COMPUTER.WALK;
        },
        changeTurnAttack: (state) => {
            state.turnAttack = state.turnAttack === TURN.USER.ATTACK
                    ? TURN.COMPUTER.ATTACK
                    : TURN.USER.ATTACK
        },
        changeTurnWalk: (state) => {
            state.turnWalk = state.turnWalk === TURN.USER.WALK
                    ? TURN.COMPUTER.WALK
                    : TURN.USER.WALK
        }
    }
})

export const {setUserTurnAttack, setComputerTurnAttack, changeTurnAttack} = gameDetailsSlice.actions;

export default gameDetailsSlice.reducer