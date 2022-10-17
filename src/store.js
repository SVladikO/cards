import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import userCardsReducer from "./features/user_cards/userCardsSlice";
import roundCardsReducer from "./features/round_cards/roundCardsSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        userCards: userCardsReducer,
        roundCards: roundCardsReducer,
    },
})
