import {configureStore} from "@reduxjs/toolkit";
import {Reducer} from './common_card_slice'
import gameDetailsReducer from "./gameDetailsSlice";
import {StoreNames} from "./type";

export const store = configureStore({
    reducer: {
        [StoreNames.USER_CARDS] : Reducer.user,
        [StoreNames.COMPUTER_CARDS] : Reducer.computer,
        [StoreNames.COLODA_CARDS] : Reducer.coloda,
        [StoreNames.ROUND_CARDS] : Reducer.round,
        [StoreNames.TRASH_CARDS] : Reducer.trash,
        gameDetails: gameDetailsReducer,
    },
})
