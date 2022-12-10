import {createSlice} from "@reduxjs/toolkit";
import {StoreNames} from "../type";

export const colodaCardsSlice = commonCardSlice(StoreNames.COLODA_CARDS);
export const userCardsSlice = commonCardSlice(StoreNames.USER_CARDS);
export const roundCardsSlice = commonCardSlice(StoreNames.ROUND_CARDS);
export const trashCardsSlice = commonCardSlice(StoreNames.TRASH_CARDS);
export const computerCardsSlice = commonCardSlice(StoreNames.COMPUTER_CARDS);

export const Action = {
    Coloda: colodaCardsSlice.actions,
    User: userCardsSlice.actions,
    Round: roundCardsSlice.actions,
    Trash: trashCardsSlice.actions,
    Computer: computerCardsSlice.actions,
};

export const Reducer = {
    coloda: colodaCardsSlice.reducer,
    user: userCardsSlice.reducer,
    round: roundCardsSlice.reducer,
    trash: trashCardsSlice.reducer,
    computer: computerCardsSlice.reducer,
};

function commonCardSlice(name) {
    const initialState = {value: []};

    const slice = createSlice({
        name,
        initialState,
        reducers: {
            init: (state, action) => {
                state.value = action.payload;
            },
            addCard: (state, action) => {
                state.value.push(action.payload);
            },
            addCards: (state, action) => {
                state.value = [...state.value, ...action.payload];
            },
            deleteAll: (state, action) => {
                state.value = [];
            },
        }
    })

    const {init, addCard, addCards, deleteAll} = slice.actions

    return {
        actions: {init, addCard, addCards, deleteAll},
        reducer: slice.reducer
    };
}

