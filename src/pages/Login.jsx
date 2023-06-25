import React, {useEffect} from 'react';
import {useTelegram} from "../hooks/useTelegram.js";
import {Link} from "react-router-dom";

const Login = () => {
    const {tg,user} = useTelegram()
    useEffect(() => {
        tg.ready()
        if (!user) window.location.replace = 'https://t.me/spaceratebot'
    }, [])

    return (
        <div style={{background: '#000', height: '100hv', width: '100vw', color: '#fff', fontSize: '42px'}}>

            <h2>login</h2>
            <Link to={'/profile'}>Profile</Link>
        </div>
    );
};

export default Login;
