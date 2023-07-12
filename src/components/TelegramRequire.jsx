import React from 'react';
import { Outlet} from "react-router";
import {useTelegram} from "../hooks/useTelegram.js";

const TelegramRequire = () => {
    const {user} = useTelegram()
    const goToTelegram = () => {
        window.location.replace('https://t.me/goodjoyuz_bot')

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
