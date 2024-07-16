import RootLayout from "../pages/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/home/Home";
import Recipe from "../pages/recipe/Recipe";
import AdminHomePage from "../pages/admin/AdminHomePage";
import ManageTags from "../pages/admin/ManageTags";
import Recipes from "../pages/recipes/Recipes";
import {checkAuthLoader, tokenLoader} from '../utils/auth';
import {action as logoutAction} from '../pages/Logout';
import Login, {action as loginAction} from '../pages/Login';
import Convertor from "../pages/convertors/Convertor";
import Pinned from "../pages/pinned/Pinned";

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
                path: 'recipes/:recipeName',
                element: <Recipe/>
            },
            {
                path: 'recipes',
                element: <Recipes/>
            },
            {
                path: 'pinned',
                element: <Pinned/>
            },
            {
                path: 'convertors',
                element: <Convertor/>
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
                        path: 'addRecipe',
                        element: <Recipe/>
                    },
                    {
                        path: 'manageTags',
                        element: <ManageTags/>
                    }
                ]
            }
        ]
    }
];