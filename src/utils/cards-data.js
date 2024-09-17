export const encodeEmoji = emoji => new TextEncoder().encode(emoji)
export const decodeEmoji = emojiCode => new TextDecoder('utf8').decode(emojiCode)

export const suits = [
    [encodeEmoji('♥'), encodeEmoji('♦'), encodeEmoji('♣'), encodeEmoji('♠')],
    [encodeEmoji('🍓'), encodeEmoji('🍒'), encodeEmoji('🍐'), encodeEmoji('🍏')],
    [encodeEmoji('🌶️'), encodeEmoji('🍅'), encodeEmoji('🫑'), encodeEmoji('🥒')],
    [encodeEmoji('🍋'), encodeEmoji('🥝'), encodeEmoji('🍑'), encodeEmoji('🥥')],
    [encodeEmoji('🍊'), encodeEmoji('🫐'), encodeEmoji('🍇'), encodeEmoji('🍎')], //
    [encodeEmoji('🌶️'), encodeEmoji('🫑'), encodeEmoji('🥬'), encodeEmoji('🥔')],
    [encodeEmoji('🍼'), encodeEmoji('🥃'), encodeEmoji('🍷'), encodeEmoji('🧃')],
    [encodeEmoji('🪼'), encodeEmoji('🦀'), encodeEmoji('🐡'), encodeEmoji('🦈')],
    [encodeEmoji('♡'), encodeEmoji('♢'), encodeEmoji('♧'), encodeEmoji('♤')],
];

export const hierarchyCards = [
    // {level: 1, title: 1},
    // {level: 2, title: 2},
    // {level: 3, title: 3},
    // {level: 4, title: 4},
    // {level: 5, title: 5},
    {level: 6, title: 6},
    {level: 7, title: 7},
    {level: 8, title: 8},
    {level: 9, title: 9},
    {level: 10, title: 10},
    {level: 11, title: 'V'},
    {level: 12, title: 'D'},
    {level: 13, title: 'K'},
    {level: 14, title: 'T'},
];

// Transformation
// [string, ...] > [object, ...] > [[{}], ...]
export const cardGroups = suits
        .map(suits => (
            [
                {background: 'white', color: 'red', suit: 'first', emojiCode: suits[0]},
                {background: 'white', color: 'red', suit: 'second', emojiCode: suits[1]},
                {background: 'white', color: 'black', suit: 'third', emojiCode: suits[2]},
                {background: 'white', color: 'black', suit: 'forth', emojiCode: suits[3]},
            ]
        ))
        .map(suits => {

                const result = []
                hierarchyCards.forEach(hierarchyCard => {
                    suits.forEach(suit => {
                        result.push({...suit, ...hierarchyCard})
                    })
                })
                return result;
            }
        )

console.log(123456, {cardGroups})