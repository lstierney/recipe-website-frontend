import RootLayout from "../pages/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/Home";
import Recipes from "../pages/Recipes";
import Recipe from "../pages/Recipe";
import AddRecipe from "../pages/admin/AddRecipe";
import AdminHomePage from "../pages/admin/AdminHomePage";
import ManageTags from "../pages/admin/ManageTags";
import Tags from "../pages/Tags";
import {checkAuthLoader, tokenLoader} from '../utils/auth';
import {action as logoutAction} from '../pages/Logout';
import Login, {action as loginAction} from '../pages/Login';

export const routes = [
    {
        id: 'root',
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        loader: tokenLoader,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'recipes',
                element: <Recipes/>
            },
            {
                path: 'recipes/:recipeId',
                element: <Recipe/>
            },
            {
                path: 'tags',
                element: <Tags/>
            },
            {
                path: 'login',
                element: <Login/>,
                action: loginAction
            },
            {
                path: 'logout',
                element: <HomePage/>,
                action: logoutAction
            },
            {
                path: '/admin/',
                loader: checkAuthLoader,
                children: [
                    {
                        index: true,
                        element: <AdminHomePage/>
                    },
                    {
                        path: 'manageTags',
                        element: <ManageTags/>
                    },
                    {
                        path: 'addRecipe',
                        element: <AddRecipe/>
                    }
                ]
            }
        ]
    }
];