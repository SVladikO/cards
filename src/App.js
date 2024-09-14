import './App.css';
import {PAGE_ROUTES, ROUTE_LINK} from './route.config';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

const router = createBrowserRouter(PAGE_ROUTES);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router}/>
            <br/>
            {
                document.location.pathname !== ROUTE_LINK.MAIN_PAGE
                && <a href={'/'}>Обрати іншу гру</a>
            }
        </div>
    );
}

export default App;
