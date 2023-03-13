import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css';
import {fetchTagsData, fetchUnitsData} from "./store/meta-actions";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {routes} from "./routes/main-route";

const router = createBrowserRouter(routes);

function App() {
    // Load and store Meta Data
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUnitsData());
        dispatch(fetchTagsData());
    }, [dispatch]);

    return <RouterProvider router={router}/>
}

export default App;
