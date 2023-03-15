import RootLayout from "../pages/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/Home";
import Recipes from "../pages/Recipes";
import Recipe from "../pages/Recipe";
import AddRecipe from "../pages/admin/AddRecipe";
import AdminHomePage from "../pages/admin/AdminHomePage";
import ManageTags from "../pages/admin/ManageTags";
import Tags from "../pages/Tags";

export const routes = [
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: 'recipes', element: <Recipes/>},
            {path: 'recipes/:recipeId', element: <Recipe/>},
            {path: 'recipes/add', element: <AddRecipe/>},
            {path: 'tags', element: <Tags/>},
        ]
    },
    {
        path: '/admin/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <AdminHomePage/>},
            {path: 'manageTags', element: <ManageTags/>},
            {path: 'addRecipe', element: <AddRecipe/>}
        ]
    },
];