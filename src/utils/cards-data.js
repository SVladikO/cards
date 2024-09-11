// ♥/♡	♦/♢	♠/♤	♣/♧
/**
 *
 * @param [string] suitGroup
 * @returns {[{color: string, background: string, suit: *},{color: string, background: string, suit: *},{color: string, background: string, suit: *},{color: string, background: string, suit: *}]}
 */
export function generateSuits(suitGroup) {

    return [
        {background: 'white', color: 'black', suit: 'first', emojiCode: suitGroup[0]},
        {background: 'white', color: 'black', suit: 'second', emojiCode: suitGroup[1]},
        {background: 'white', color: 'black', suit: 'third', emojiCode: suitGroup[2]},
        {background: 'white', color: 'black', suit: 'forth', emojiCode: suitGroup[3]},
    ];
}

export const cardsData = [
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

export const encodeEmoji = emoji => new TextEncoder().encode(emoji)
export const decodeEmoji = emojiCode => new TextDecoder('utf8').decode(emojiCode)

export const suits = [
    [encodeEmoji('♥'), encodeEmoji('♦'), encodeEmoji('♣'), encodeEmoji('♠')],
    [encodeEmoji('🍓'), encodeEmoji('🍒'), encodeEmoji('🍐'), encodeEmoji('🍏')],
    [ encodeEmoji('🌶️'), encodeEmoji('🍅'), encodeEmoji('🫑'), encodeEmoji('🥒')],
    [encodeEmoji('🍋'), encodeEmoji('🥝'), encodeEmoji('🍑'), encodeEmoji('🥥')],
    [encodeEmoji('🍊'), encodeEmoji('🫐'), encodeEmoji('🍇'), encodeEmoji('🍎')], //
    [encodeEmoji('🌶️'), encodeEmoji('🫑'), encodeEmoji('🥬'), encodeEmoji('🥔')],
    [encodeEmoji('🍼'), encodeEmoji('🥃'), encodeEmoji('🍷'), encodeEmoji('🧃')],
    [encodeEmoji('🪼'), encodeEmoji('🦀'), encodeEmoji('🐡'), encodeEmoji('🦈')],
    [encodeEmoji('♡'), encodeEmoji('♢'), encodeEmoji('♧'), encodeEmoji('♤')],
];
//.map(el => el.split(''))
// '🥕🍆🌽',

