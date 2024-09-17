import {maxCardsPerRound} from "../constants";

export const mixCards = cards => cards.sort(() => Math.random() - 0.5);

export function sortByLevel(cards) {
    return cards.sort((f, s) => f.level - s.level);
}

export const sortTrumpToEnd = (cards, trump) => {
    const trumps = cards.filter(card => card.suit === trump)
    const simpleCards = cards.filter(card => card.suit !== trump)

    return [sortByLevel(simpleCards), sortByLevel(trumps)];
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

//This function mostly for computer search approptiate card
export function findHigherCard(cardsInHand, cardToCover, trump) {
    //We will cover trump by tramp only
    if (isTrump(cardToCover, trump)) {
        return findHigherTrumpCard(cardsInHand, cardToCover, trump)
    }

    return cardsInHand.find(card =>
        card.suit === cardToCover.suit && card.level > cardToCover.level
    );
}

const sortCallback = (f, s) => f.level - s.level;

export const getTrumpCards = (cards, trump) => cards.filter(card => card.suit === trump);

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