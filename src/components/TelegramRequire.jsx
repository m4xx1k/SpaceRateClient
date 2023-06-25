import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router";
import {useTelegram} from "../hooks/useTelegram.js";

const TelegramRequire = () => {
    const token = localStorage.getItem('token')
    const location = useLocation()
    const {user} = useTelegram()
    console.log(token)
    return (
        token && !!user ?
            <Outlet/>
            : (!!user ? <Navigate to="/login" state={{from: location}}
                                  replace/> : window.location.href = 'https://t.me/spaceratebot')

    );
};

export default TelegramRequire;
