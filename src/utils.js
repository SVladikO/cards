import {maxCardsPerRound} from "./constants";

export const canCardBeAddedToRound = (roundCards= [], candidateToAdd) => roundCards?.find(card => card.level === candidateToAdd.level)

export function findHigherCard(cards, cardToCover) {
    return cards.find(card =>
        card.suit === cardToCover.suit && card.level > cardToCover.level
    );
}

export function isTrumpCard(card, trump) {
    return card.suit === trump;
}

const sortCallback = (f, s) => f.level - s.level;

export function findHigherTrumpCard(cards, cardToCover, trump) {
     cards
        ?.filter(card => card.suit === trump)
        ?.sort(sortCallback)
        ?.find(
            card =>
                (card.suit !== cardToCover.suit) ||
                (card.suit === cardToCover.suit && card.level > cardToCover.level)
        );
}

/**
 * Calculate how many cards can be added to player.
 *
 * @param to
 * @param from
 * @return {[[cardsToAdd], [cutedColoda]]}
 */
export function prepareCardsTo(to, from) {
    if (to.length >= maxCardsPerRound || from.length === 0) {
        return [to, from];
    }

    let result = [];
    let canBeAdded = maxCardsPerRound - to.length;

    if (canBeAdded > 0) {
        result = from.slice(-canBeAdded)
    }

    return [result, from.slice(0, from.length - canBeAdded)];
}