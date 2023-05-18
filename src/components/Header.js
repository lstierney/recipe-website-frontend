import React from 'react';
import {NavLink} from "react-router-dom";
import classes from '../main.module.css';
import {useSelector} from "react-redux";
import Notification from "./UI/Notification";

const Header = () => {
    const notification = useSelector(state => state.ui.notification);

    return (
        <>
            <header className={classes.header}>

            </header>
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
                    <li><NavLink to="/admin/" className={({isActive}) =>
                        isActive ? classes.active : undefined
                    }
                    >
                        Admin
                    </NavLink>
                    </li>
                    <li><NavLink to="/login" className={({isActive}) =>
                        isActive ? classes.active : undefined
                    }
                    >
                        Login
                    </NavLink>
                    </li>
                </ul>
            </nav>
            {notification && <Notification status={notification.status} title={notification.title}
                                           message={notification.message}/>}
        </>
    );
};

export default Header;