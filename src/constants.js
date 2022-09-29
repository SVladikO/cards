export const CARD_STATYS = {
    COLODA: "COLODA",
    USER: "USER",
    COMPUTER: "COMPUTER",
    BIN: "BIN",
    ROUND: "ROUND"
}

export const USER_TURN_ATTACK = "USER_TURN_ATTACK";
export const COMPUTER_TURN_ATTACK = "COMPUTER_TURN_ATTACK";

export const USER_LOST_ROUND = "USER_LOST_ROUND";
export const COMPUTER_LOST_ROUND = "COMPUTER_LOST_ROUND";
export const MOVE_ROUND_TO_TRASH = "MOVE_ROUND_TO_TRASH";

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