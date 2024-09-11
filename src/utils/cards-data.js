// ♥/♡	♦/♢	♠/♤	♣/♧
/**
 *
 * @param [string] suitGroup
 * @returns {[{color: string, background: string, suit: *},{color: string, background: string, suit: *},{color: string, background: string, suit: *},{color: string, background: string, suit: *}]}
 */
export function generateSuits(suitGroup) {

    return [
        {background: 'white', color: 'black', suit: 1, emojiCode: suitGroup[0]},
        {background: 'white', color: 'black', suit: 2, emojiCode: suitGroup[1]},
        {background: 'white', color: 'black', suit: 3, emojiCode: suitGroup[2]},
        {background: 'white', color: 'black', suit: 4, emojiCode: suitGroup[3]},
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

export const suitGroups = [
    [encodeEmoji('♥'),encodeEmoji('♦'),encodeEmoji('♣'),encodeEmoji('♠')],
    [encodeEmoji('♡'), encodeEmoji('♢'), encodeEmoji('♧'), encodeEmoji('♤')],
    [encodeEmoji('🍋'),encodeEmoji('🥝'),encodeEmoji('🍌'),encodeEmoji('🥥')],
    [encodeEmoji('🍊'), encodeEmoji('🍐'), encodeEmoji('🍇'), encodeEmoji('🍒')], //
    [encodeEmoji('🍓'), encodeEmoji('🫐'), encodeEmoji('🍏'), encodeEmoji('🍎')],
    [encodeEmoji('🌶️'), encodeEmoji('🫑'), encodeEmoji('🍅'), encodeEmoji('🥒')],
    [encodeEmoji('🥓'), encodeEmoji('🧅'), encodeEmoji('🥔'), encodeEmoji('🍞')],
    [encodeEmoji('🍼'), encodeEmoji('🥃'), encodeEmoji('🍷'), encodeEmoji('🧃')],
    [encodeEmoji('🪼'), encodeEmoji('🐙'), encodeEmoji('🐡'), encodeEmoji('🦈')]
];
//.map(el => el.split(''))

console.log(55555555, {suitGroups} )


// '🥕🍆🌽',

