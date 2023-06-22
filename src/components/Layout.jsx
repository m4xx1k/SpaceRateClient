import React from 'react';
import Header from "./Header.jsx";
import {Outlet} from "react-router";
const Layout = () => {
    return (
        <>
         <Header/>
         <Outlet/>
        </>
    );
};

export default Layout;
