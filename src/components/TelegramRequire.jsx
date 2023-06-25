import React from 'react';
import { Outlet} from "react-router";
import {useTelegram} from "../hooks/useTelegram.js";

const TelegramRequire = () => {
    // const token = localStorage.getItem('token')
    // const location = useLocation()
    const {user} = useTelegram()
    // console.log(token)
    const goToTelegram = () => {
        window.location.replace('https://t.me/spaceratebot')

    }
    return (
        <>
            {
                !!user ?
                    <Outlet/> :
                    goToTelegram()
            }
        </>


    );
};

export default TelegramRequire;
