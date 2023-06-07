import React from 'react';
import {Form, NavLink, useRouteLoaderData} from "react-router-dom";
import classes from '../main.module.css';

const Header = () => {
    const token = useRouteLoaderData('root');

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     return redirect('/');
    // }

    return (
        <>
            <header className={classes.header}></header>
            <nav className={classes.navigation}>
                <ul className={classes.nav_list}>
                    <li><NavLink to="/" className={({isActive}) =>
                        isActive ? classes.active : undefined
                    }
                                 end={true}
                    >
                        Home
                    </NavLink>
                    </li>
                    <li><NavLink to="/recipes" className={({isActive}) =>
                        isActive ? classes.active : undefined
                    }
                    >
                        Recipes
                    </NavLink>
                    </li>
                    <li><NavLink to="/tags" className={({isActive}) =>
                        isActive ? classes.active : undefined
                    }
                    >
                        Tags
                    </NavLink>
                    </li>
                    {token && <li><NavLink to="/admin/" className={({isActive}) =>
                        isActive ? classes.active : undefined
                    }
                    >
                        Admin
                    </NavLink>
                    </li>}
                    {!token && <li><NavLink to="/login" className={({isActive}) =>
                        isActive ? classes.active : undefined
                    }
                    >
                        Login
                    </NavLink>
                    </li>}
                    {token &&
                        <li>
                            <Form action="/logout" method="post">
                                <button className={classes.linkyButton}>Logout</button>
                            </Form>
                        </li>
                    }
                </ul>
            </nav>

        </>
    );
};

export default Header;