import './App.css';
import {PAGE_ROUTES} from './route.config';
import {createBrowserRouter, RouterProvider, } from "react-router-dom";

const router = createBrowserRouter(PAGE_ROUTES);

function App() {
    return (
        <div className="App">

            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
