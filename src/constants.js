export const CARD_STATYS = {
    COLODA: 'COLODA',
    USER: 'USER',
    COMPUTER: 'COMPUTER',
    BIN: 'BIN',
    ROUND: 'ROUND'
}

export const TURN = {
    USER: 'USER',
    COMPUTER: 'COMPUTER'
}

const USER_TAKE = 'USER_TAKE';
const COMPUTER_TAKE = 'COMPUTER_TAKE';
const MOVE_ROUND_TO_TRASH = 'MOVE_ROUND_TO_TRASH';

const card = {
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