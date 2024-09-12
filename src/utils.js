import {maxCardsPerRound} from "./constants";

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
 * @param to
 * @param from
 * @return {[[cardsToAdd], [cutedColoda]]}
 */
export function prepareCardsTo(to, from) {
    if (to.length >= maxCardsPerRound || from.length === 0) {
        return [[], from];
    }

    let result = [];
    let canBeAdded = maxCardsPerRound - to.length;

    if (canBeAdded > 0) {
        result = from.slice(-canBeAdded)
    }

    return [result, from.slice(0, from.length - canBeAdded)];
}