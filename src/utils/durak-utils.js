import {maxCardsPerRound} from "../constants";

export const mixCards = cards => cards.sort(() => Math.random() - 0.5);
export const sortCardsByLevel = cards => cards.sort((f, s) => f.level - s.level);
const sortCallback = (f, s) => f.level - s.level;
export const getTrumpCards = (cards, trump) => cards.filter(card => card.suit === trump)
export const getUsualCards = (cards, trump) => cards.filter(card => card.suit !== trump)

/**
 * Find higher card the same suit.
 *
 * @param cards
 * @param cardToCover
 * @returns {*}
 */
export function _findHigherCard(cards, cardToCover) {
    return sortCardsByLevel(cards).find(
        c => c.suit === cardToCover.suit && c.level > cardToCover.level
    );
}

/**
 * Get higher card no matter is it trump or not.
 * This function needed for computer defence.
 *
 * @param roundCards - Round cards
 * @param computerCards - Cards from which you can choose
 * @param trump - Current game trump.
 * @returns {*} - Higher card.
 */
export const getHigherCard = (roundCards, computerCards, trump) => {
    const cardToCover = getLastRoundCard(roundCards);
    const trumpCards = getTrumpCards(computerCards, trump) || [];
    const usualCards = getUsualCards(computerCards, trump)

    if (isTrump(cardToCover, trump)) {
        return _findHigherCard(trumpCards, cardToCover)
    }

    return  _findHigherCard(usualCards, cardToCover) || (trumpCards && trumpCards.length && trumpCards[0]) || null;
}

/**
 * Get lower card.
 * This function needed for computer attack.
 *
 * @param roundCards
 * @param computerCards
 * @param trump
 * @returns {*}
 */
export const getLowerCard = (roundCards, computerCards, trump) => {
    const usualCards = getUsualCards(computerCards, trump)
    const trumpCards = getTrumpCards(computerCards, trump)

    // First card on table from computer
    if (!roundCards.length) {
        return usualCards[0] || trumpCards[0];
    }

    return usualCards.find(card => canCardBeAddedToRound(roundCards, card)) || trumpCards.find(card => canCardBeAddedToRound(roundCards, card)) || null;
}

export const sortTrumpToEnd = (cards, trump) => {
    const trumps = cards.filter(card => card.suit === trump)
    const simpleCards = cards.filter(card => card.suit !== trump)

    return [sortCardsByLevel(simpleCards), sortCardsByLevel(trumps)];
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function turnOffWarningFrom(cards, setCards) {
    setTimeout(() => {
        setCards(cards.map(card => ({...card, warning: false})))
    }, 400)
}


export const canCardBeAddedToRound = (roundCards = [], candidateToAdd = {}) => roundCards?.find(card => card.level === candidateToAdd.level)

export function findHigherTrumpCard(cards, cardToCover, trump) {
    return cards
        ?.filter(card => card.suit === trump)
        ?.find(
            card =>
                (card.suit !== cardToCover.suit) ||
                (card.suit === cardToCover.suit && card.level > cardToCover.level)
        );
}

//Cases:
// trump vs trump       isFirstHigherCard
// trump vs no trump    isTrump && isTrump && isFirstHigherCard
// no trump vs no trump isFirstHigherCard
export const isTrump = (card, trump) => card.suit === trump;

//We can compare trump and no trump cards
export const isFirstHigherCard = (f, s) => f.level > s.level && f.suit === s.suit;

export const getLastRoundCard = roundCards => roundCards[roundCards.length - 1];

/**
 * Calculate how many cards can be added to player.
 *
 * @param toCards Computer or user cards
 * @param fromCards coloda only
 * @return {[[cardsToAdd], [cutedColoda]]}
 */
export function prepareCardsTo(toCards, fromCards) {
    if (toCards.length >= maxCardsPerRound || fromCards.length === 0) {
        return [[], fromCards];
    }

    let result = [];
    let canBeAdded = maxCardsPerRound - toCards.length;

    if (canBeAdded > 0) {
        result = fromCards.slice(-canBeAdded)
    }

    return [result, fromCards.slice(0, fromCards.length - canBeAdded)];
}