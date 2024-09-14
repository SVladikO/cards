import {Wrapper} from "./main-menu.page.style";

import {PAGE_ROUTES} from '../../route.config';
import GameName from "../../components/game-name/game-name";

export default function MainMenuPage() {
    return (
        <Wrapper>
            {
                PAGE_ROUTES
                    .filter(g => g.showInMainMenu)
                    .map(game => <GameName key={game.path} {...game} />)
            }
        </Wrapper>
    )
}