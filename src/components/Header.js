import React from 'react';
import {NavLink, useRouteLoaderData, useSubmit} from "react-router-dom";
import classes from '../main.module.css';
import {getSubject} from "../utils/auth";

const Header = () => {
    const token = useRouteLoaderData('root');
    const submit = useSubmit();
    const subject = getSubject();

    const handleLogout = () => {
        submit(null, {action: '/logout', method: 'post'});
    }

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
                        <li><NavLink to="/logout" onClick={handleLogout} className={({isActive}) =>
                            isActive ? classes.active : undefined
                        }
                        >
                            Logout (<span className={classes.small}>{subject}</span>)
                        </NavLink>
                        </li>
                    }
                </ul>
            </nav>

        </>
    );
};

export default Header;