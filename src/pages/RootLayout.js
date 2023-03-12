import React from 'react';
import Header from "../components/Header";
import {Outlet} from "react-router-dom";
import classes from '../main.module.css';

const RootLayout = () => {
    return (
        <>
            <div className={classes.parent}>
                <Header/>
                <main className={classes.content}>
                    <Outlet/>
                </main>
                <footer className={classes.footer}>
                    This is the footer
                </footer>
            </div>
        </>
    );
};

export default RootLayout;