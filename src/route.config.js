import MainMenuPage from "./pages/main-menu/main-menu.page";

import DurakMenuPage from "./pages/durak-menu/menu.page";
import DurakRoomPage from "./pages/durak-room/room.page";

import PockerMenuPage from './pages/pocker-menu/pocker.page';

export const ROUTE_LINK = {
    MAIN_PAGE: '/',

    DURAK_MENU_PAGE: '/durak-menu',
    DURAK_ROOM_PAGE: '/durak-room',
    DURAK_END_PAGE: '/durak-end',

    PASIANS_MAIN_PAGE: '/pasians-menu',
    POCKER_MAIN_PAGE: '/pocker-menu',
}

export const PAGE_ROUTES = [
    {
        name: 'Main page',
        path: ROUTE_LINK.MAIN_PAGE,
        element: <MainMenuPage />,
    },

    //Durak pages start
    {
        showInMainMenu: true,
        name: 'Дурак',
        path: ROUTE_LINK.DURAK_MENU_PAGE,
        element: <DurakMenuPage />,
    },
    {
        path: ROUTE_LINK.DURAK_ROOM_PAGE,
        element: <DurakRoomPage />,
    },
    {
        path: ROUTE_LINK.DURAK_END_PAGE,
        element: <div>durak-end-game!</div>,
    },
    //Durak pages end
    {
        showInMainMenu: true,
        name: 'Покер',
        path: ROUTE_LINK.POCKER_MAIN_PAGE,
        element: <PockerMenuPage />,
    },
    {
        showInMainMenu: true,
        name: 'Пасянс',
        path: ROUTE_LINK.PASIANS_MAIN_PAGE,
        element: <div>Pasians page!</div>,
    },

];