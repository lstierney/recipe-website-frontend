import RootLayout from "../pages/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/Home";
import Recipes from "../pages/Recipes";
import Recipe from "../pages/Recipe";
import AdminHomePage from "../pages/admin/AdminHomePage";
import ManageTags from "../pages/admin/ManageTags";
import Search from "../pages/Search";
import {checkAuthLoader, tokenLoader} from '../utils/auth';
import {action as logoutAction} from '../pages/Logout';
import Login, {action as loginAction} from '../pages/Login';
import Convertor from "../pages/Convertor";

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
                path: 'search',
                element: <Search/>
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