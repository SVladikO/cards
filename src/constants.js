export const CARD_STATUS = {
    COLODA: "COLODA",
    USER: "USER",
    COMPUTER: "COMPUTER",
    TRASH: "BIN",
    ROUND: "ROUND"
}

export const maxRoundCards = 12;
export const maxUserCardsPerRound = 6;

// This variable answer the question which turn to attack fool round
// In one case your turn to attack & walk
// In another case your turn to defence & walk
// It's a big difference
export const TURN = {
    USER: {
        ATTACK: "TURN_USER_ATTACK",
        WALK: "TURN_USER_WALK",
    },
    COMPUTER: {
        ATTACK: "TURN_COMPUTER_ATTACK",
        WALK: "TURN_COMPUTER_WALK",
    },
};

// This variable answer the question which turn to attack fool round
export const TURN_TO_WALK = {
    USER: "USER_TURN_TO_WALK",
    COMPUTER: "COMPUTER_TURN_TO_WALK"
};


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