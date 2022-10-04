export const CARD_STATYS = {
    COLODA: "COLODA",
    USER: "USER",
    COMPUTER: "COMPUTER",
    BIN: "BIN",
    ROUND: "ROUND"
}

export const maxRoundCards = 12;
export const maxUserCardsPerRound = 6;

export const USER_TURN_ATTACK = "USER_TURN_ATTACK";
export const COMPUTER_TURN_ATTACK = "COMPUTER_TURN_ATTACK";

export const USER_LOST_ROUND = "USER_LOST_ROUND";
export const COMPUTER_LOST_ROUND = "COMPUTER_LOST_ROUND";
export const MOVE_ROUND_TO_TRASH = "MOVE_ROUND_TO_TRASH";
export const MESSAGE = {
    USER_WON: 'User won.',
    COMPUTER_WON: 'Computer won!',
    DRAW: 'Draw.',
    CANT_BET_YOU: "Ops. I can't bit it.",
}

export const card = {
    addTo: {
        computer: {},
        user: {}
    },
    send: {
        on: {
            table: {
                computer: {
                    SIMPLE_COMPUTER: () => {
                    },
                    HARD_COMPUTER: () => {
                    },
                },
                user: {}
            }
        }
    },
    bit: {
        computer: {
            SIMPLE_COMPUTER: () => {
            },
            HARD_COMPUTER: () => {
            },
        }
    }
}