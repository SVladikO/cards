import {createBrowserRouter, RouterProvider,} from "react-router-dom";

import './App.css';

import {PAGE_ROUTES, ROUTE_LINK} from './route.config';
import {SecondaryButton} from './components/button/button.style';

const router = createBrowserRouter(PAGE_ROUTES);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router}/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            {
                document.location.pathname !== ROUTE_LINK.MAIN_PAGE
                && <a href={'/'}>
                    <SecondaryButton>
                        Обрати іншу гру
                    </SecondaryButton>
                </a>
            }
        </div>
    );
}

export default App;
