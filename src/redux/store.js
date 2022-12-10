import {configureStore} from "@reduxjs/toolkit";
import {Reducer} from './common_card_slice'
import gameDetailsReducer from "./gameDetailsSlice";

export const store = configureStore({
    reducer: {
        userCards: Reducer.user,
        computerCards: Reducer.computer,
        colodaCards: Reducer.coloda,
        roundCards: Reducer.round,
        trashCards: Reducer.trash,
        gameDetails: gameDetailsReducer,
    },
})
