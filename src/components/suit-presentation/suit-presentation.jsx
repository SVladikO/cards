import {SuitWrapper} from "./suit-presentation.style";

import {GameDescription} from "../text/text.style";
import CardGroup from "../card-group/card-group";
import {cardsData, generateSuits, suits} from "../../utils/cards-data";

export default function SuitsPresentation() {
    const card6 = cardsData[0]; // card 6
    const suitGroups = suits.map(sg => generateSuits(sg))
    const cardGroups = suitGroups.map(suits => {
        const result = [];
        suits.forEach(suit =>
            result.push({...card6, ...suit})
        )
        return result;
    })

    const selectedSuitIndex = 0;
    const handleSetSelectedSuit = () => {
    };

    return (
        <>
            <GameDescription>Ви можете змінити масть</GameDescription>
            <SuitWrapper>
                {cardGroups.map((cards, index) =>
                    <div key={index} onClick={() => handleSetSelectedSuit(index)}>
                        <CardGroup
                            isSelected={index === selectedSuitIndex}
                            ownerName={index}
                            cards={cards}
                        />
                    </div>
                )
                }
            </SuitWrapper>
        </>
    )
}
