import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import userCardsReducer from "./features/user_cards/userCardsSlice";
import computerCardsReducer from "./features/computer_cards/computerCardsSlice";
import roundCardsReducer from "./features/round_cards/roundCardsSlice";
import gameDetailsReducer from "./features/game_details/gameDetailsSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        userCards: userCardsReducer,
        computerCards: computerCardsReducer,
        roundCards: roundCardsReducer,
        gameDetails: gameDetailsReducer,
    },
})
