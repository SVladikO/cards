import {Wrapper, MenuWrapper, SuitWrapper} from "./main-menu.page.style";

import {PAGE_ROUTES} from '../../route.config';

import GameName from "../../components/game-name/game-name";
import CardGroup from "../../components/card-group/card-group";
import {GameDescription} from '../../components/text/text.style';

export default function MainMenuPage() {
    return (
        <Wrapper>
            <GameDescription>Список доступних ігор</GameDescription>
            <MenuWrapper>
                {
                    PAGE_ROUTES
                        .filter(g => g.showInMainMenu)
                        .map(game => <GameName key={game.path} {...game} />)
                }
            </MenuWrapper>
        </Wrapper>
    )
}

