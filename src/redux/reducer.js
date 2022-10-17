const initialState = {
    deck: [],
    computerCards: [],
    userCards: [],
    roundCards: [],
    trashCards: [],
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
            return {...state, deck: action.payload}

        case ACTION_TYPE.SET_CARDS_TO_COMPUTER:
            return {...state, computerCards: action.payload};

        case ACTION_TYPE.SET_CARDS_TO_USER:
            return {...state, userCards: action.payload};

        case ACTION_TYPE.SET_CARDS_TO_ROUND:
            return {...state, roundCards: action.payload};

        case ACTION_TYPE.SET_CARDS_TO_TRASH:
            return {...state, trashCards: action.payload};

        default:
            return state;
    }
}