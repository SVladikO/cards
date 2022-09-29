export const CARD_STATYS = {
    COLODA: 'COLODA',
    USER: 'USER',
    COMPUTER: 'COMPUTER',
    BIN: 'BIN',
    ROUND: 'ROUND'
}

export const USER_TURN = 'USER_TURN';
export const COMPUTER_TURN = 'COMPUTER_TURN';

export const USER_TAKE = 'USER_TAKE';
export const COMPUTER_TAKE = 'COMPUTER_TAKE';
export const MOVE_ROUND_TO_TRASH = 'MOVE_ROUND_TO_TRASH';

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