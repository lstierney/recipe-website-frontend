import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css';
import {fetchTagsData, fetchUnitsData} from "./store/meta-actions";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {routes} from "./routes/main-route";
import config from "./config";

const router = createBrowserRouter(routes);

function App() {
    // Load and store Meta Data
    const dispatch = useDispatch();

    // TODO - do these need to be loaded here?
    useEffect(() => {
        dispatch(fetchUnitsData());
        dispatch(fetchTagsData());
        document.title = config.PAGE_TITLE
    }, [dispatch]);

    return <RouterProvider router={router}/>
}

export default App;
