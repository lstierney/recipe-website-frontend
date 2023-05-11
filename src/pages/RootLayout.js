import React from 'react';
import Header from "../components/Header";
import {Outlet} from "react-router-dom";
import classes from '../main.module.css';
import {ToastContainer} from "react-toastify";

const RootLayout = () => {
    return (
        <>
            <div className={classes.parent}>
                <Header/>
                <ToastContainer />
                <main className={classes.content}>
                    <div className={classes.mainContent}>
                        <Outlet/>
                    </div>
                </main>
                <footer className={classes.footer}>
                    This is the footer
                </footer>
            </div>
        </>
    );
};

export default RootLayout;