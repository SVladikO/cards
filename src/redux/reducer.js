import {StoreNames} from "../type";

const initialState = {
    [StoreNames.DESK_CARDS]: [],
    [StoreNames.USER_CARDS]: [],
    [StoreNames.TRASH_CARDS]: [],
    [StoreNames.COMPUTER_CARDS]: [],
    [StoreNames.ROUND_CARDS]: [],
}

export const ACTION_TYPE = {
    SET_CARDS_TO_DECK: "SET_CARDS_TO_DECK",
    SET_CARDS_TO_COMPUTER: "SET_CARDS_TO_COMPUTER",
    SET_CARDS_TO_USER: "SET_CARDS_TO_USER",
    SET_CARDS_TO_ROUND: "SET_CARDS_TO_ROUND",
    SET_CARDS_TO_TRASH: "SET_CARDS_TO_TRASH",
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPE.SET_CARDS_TO_DECK:
            return {...state, [StoreNames.DESK_CARDS]: action.payload}

        case ACTION_TYPE.SET_CARDS_TO_COMPUTER:
            return {...state, [StoreNames.COMPUTER_CARDS]: action.payload};

        case ACTION_TYPE.SET_CARDS_TO_USER:
            return {...state, [StoreNames.USER_CARDS]: action.payload};

        case ACTION_TYPE.SET_CARDS_TO_ROUND:
            return {...state,  [StoreNames.ROUND_CARDS]: action.payload};

        case ACTION_TYPE.SET_CARDS_TO_TRASH:
            return {...state,  [StoreNames.TRASH_CARDS]: action.payload};

        default:
            return state;
    }
}