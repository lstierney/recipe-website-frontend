import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
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
                    <li><NavLink to="/recipes/add" className={({isActive}) =>
                        isActive ? classes.active : undefined
                    }
                    >
                        Add Recipe
                    </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;