import {configureStore} from "@reduxjs/toolkit";
import {Reducer} from './features/common_card_slice'
import gameDetailsReducer from "./features/game_details/gameDetailsSlice";

export const store = configureStore({
    reducer: {
        userCards: Reducer.user,
        computerCards: Reducer.computer,
        roundCards: Reducer.round,
        trashCards: Reducer.trash,
        gameDetails: gameDetailsReducer,
    },
})
