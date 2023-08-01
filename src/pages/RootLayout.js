import React, {useEffect} from 'react';
import Header from "../components/header/Header";
import {Outlet, useLoaderData, useLocation, useSubmit} from "react-router-dom";
import classes from '../main.module.css';
import {ToastContainer} from "react-toastify";
import {EXPIRED, getTokenDuration} from "../utils/auth";
import Footer from "../components/footer/Footer";

const RootLayout = () => {
    const token = useLoaderData();
    const submit = useSubmit();
    const location = useLocation();

    useEffect(() => {
        if (!token) {
            return;
        }
        if (token === EXPIRED) {
            submit(null, {action: '/logout', method: 'post'})
        }
        setTimeout(() => {
            submit(null, {action: '/logout', method: 'post'})
        }, getTokenDuration());
    }, [token, submit]);

    const klassName = location.pathname === '/' ? classes['home-content'] : classes.content;

    return (
        <>
            <div className={classes.parent}>
                <Header/>
                <ToastContainer/>
                <main className={klassName}>
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </>
    );
};

export default RootLayout;