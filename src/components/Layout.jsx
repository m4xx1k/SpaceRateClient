import React from 'react';
import Header from "./Header.jsx";
import {Outlet, useLocation} from "react-router";

const Layout = () => {
    const {pathname} = useLocation()
    return (
        <>
            <Header/>
            <Outlet/>
            <span>{pathname}</span>
        </>
    );
};

export default Layout;
