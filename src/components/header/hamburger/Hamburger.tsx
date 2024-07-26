import React, {useEffect, useState} from 'react';
import classes from './Hamburger.module.css';
import mainClasses from '../../../main.module.css';
import {Link, useSubmit} from "react-router-dom";
import hamburgerImage from '../../../assets/images/hamburger.svg';
import hamburgerCloseImage from '../../../assets/images/hamburger-close.svg';
import {isAdminUser} from "../../../utils/auth";

const Hamburger = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const isAdmin = isAdminUser();
    const submit = useSubmit();

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const handleLogout = () => {
        submit(null, {action: '/logout', method: 'post'});
        setIsMenuVisible(!isMenuVisible);
    }

    const closeIconStyle = isMenuVisible ? {display: 'block'} : {display: 'none'};
    const menuIconStyle = isMenuVisible ? {display: 'none'} : {display: 'block'};

    useEffect(() => {
        // Add a click event listener to the document body
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement; // Cast e.target to HTMLElement

            // Check if the click occurred outside of the menu and hamburger icon
            if (
                isMenuVisible &&
                target &&
                !target.classList.contains(classes['menu']) &&
                !target.classList.contains(classes['hamburger']) &&
                !target.classList.contains(classes['menu-icon']) &&
                !target.classList.contains(classes['close-icon'])
            ) {
                // Close the menu
                setIsMenuVisible(false);
            }
        };

        // Attach the event listener when the component mounts
        document.body.addEventListener('click', handleOutsideClick);

        // Clean up the event listener when the component unmounts
        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, [isMenuVisible]);

    return (
        <div className={mainClasses['hamburger-container']}>
            <div className={`${classes['menu']} ${isMenuVisible ? classes['show-menu'] : ''}`}>
                <ul className={classes['menu-list']}>
                    <li><Link className={classes['menu-item']} to="/" onClick={toggleMenu}>Home</Link></li>
                    <li><Link className={classes['menu-item']} to="/recipes" onClick={toggleMenu}>Recipes</Link></li>
                    <li><Link className={classes['menu-item']} to="/pinned" onClick={toggleMenu}>Pinned</Link></li>
                    {isAdmin &&
                        <li><Link className={classes['menu-item']} to="/ideas" onClick={toggleMenu}>Ideas</Link></li>
                    }
                    <li><Link className={classes['menu-item']} to="/convertors" onClick={toggleMenu}>Convertors</Link>
                    </li>
                    {
                        isAdmin
                            ?
                            <li><Link className={classes['menu-item']} to="/logout" onClick={handleLogout}>Logout</Link>
                            </li>
                            : <li><Link className={classes['menu-item']} to="/login" onClick={toggleMenu}>Login</Link>
                            </li>
                    }
                </ul>
            </div>
            {/*<div className={classes['hamburger']}>*/}
            {/*    tests*/}
            <img className={classes['hamburger']} src={!isMenuVisible ? hamburgerImage : hamburgerCloseImage}
                 alt="Hamburger Menu" aria-label="Hamburger Menu" onClick={toggleMenu}/>
            {/*</div>*/}
            <div className={classes['close-icon']} style={closeIconStyle}>
                Close
            </div>
            <div className={classes['menu-icon']} style={menuIconStyle}>
                Menu
            </div>
        </div>
    );
}

export default Hamburger;
