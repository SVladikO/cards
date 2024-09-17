import {SuitWrapper} from "./suit-presentation.style";

import CardGroup from "../../components/card-group/card-group";
import {GameDescription} from "../../components/text/text.style";

import {cardGroups,} from "../../utils/cards-data";

export default function SuitsPresentation() {


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
