import {SuitWrapper} from "./suit-presentation.style";

import {GameDescription} from "../../components/text/text.style";
import CardGroup from "../../components/card-group/card-group";
import {hierarchyCards, suits} from "../../utils/cards-data";
import {generateCards} from '../../utils/durak-utils';

export default function SuitsPresentation() {
    const card6 = hierarchyCards[0]; // card 6
    const suitGroups = suits.map(sg => generateCards(sg))
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
