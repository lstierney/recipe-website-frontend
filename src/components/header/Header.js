import React from 'react';
import {NavLink, useSubmit} from "react-router-dom";
import mainClasses from '../../main.module.css';
import classes from './Header.module.css';
import {getSubject, isAdminUser} from "../../utils/auth";

const Header = () => {
    const isAdmin = isAdminUser();
    const submit = useSubmit();
    const subject = getSubject();

    const handleLogout = () => {
        submit(null, {action: '/logout', method: 'post'});
    }

    return (
        <>
            <header className={mainClasses.header}></header>
            <nav className={mainClasses.navigation}>
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
                    <li><NavLink to="/search" className={({isActive}) =>
                        isActive ? classes.active : undefined
                    }
                    >
                        Search
                    </NavLink>
                    </li>
                    <li><NavLink to="/convertors" className={({isActive}) =>
                        isActive ? classes.active : undefined
                    }
                    >
                        Convertors
                    </NavLink>
                    </li>
                    {isAdmin && <li><NavLink to="/admin/" className={({isActive}) =>
                        isActive ? classes.active : undefined
                    }
                    >
                        Admin
                    </NavLink>
                    </li>}
                    {!isAdmin && <li><NavLink to="/login" className={({isActive}) =>
                        isActive ? classes.active : undefined
                    }
                    >
                        Login
                    </NavLink>
                    </li>}
                    {isAdmin &&
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