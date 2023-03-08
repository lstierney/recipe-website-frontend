import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css';
import AddRecipe from "./components/admin/AddRecipe";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/Home";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: 'recipes', element: <Recipes/>},
            {path: 'recipes/:recipeId', element: <Recipe/>},
            {path: 'recipes/add', element: <AddRecipe/>}

        ]
    },
]);

function App() {
    return <RouterProvider router={router}/>
}

export default App;
