import React, {useEffect, useState} from 'react';
import {useTelegram} from "../hooks/useTelegram.js";
import {Link, useNavigate} from "react-router-dom";
import {useFindUserMutation, useRegistrationMutation} from "../redux/auth/authApiSlice.js";

const Login = () => {
    const {tg,user:tgUser} = useTelegram()
    const [username, setUsername] = useState(!!tgUser?.username ? tgUser.username :'')
    const [name, setName] = useState(!!tgUser?.username ? tgUser.username :'')
    const navigate= useNavigate()
    const [findUser] = useFindUserMutation()
    const [registration] = useRegistrationMutation()
    useEffect(() => {
        tg.ready()
        const handleFindUser = async ()=>{
            const user = await findUser({telegramId:tgUser?.id})
        }
        if(!tgUser) {
            window.location.replace('https://t.me/spaceratebot')
        }else handleFindUser()
    }, [])
    const handleLogin = async ()=>{
        try{
            if(!!username && !!name) {
                await registration({
                    telegramId: tgUser.id,
                    password: tgUser.id,
                    username,
                    name: username
                })
                navigate('/profile')
            }
        }catch (e) {
            alert(JSON.stringify(e))
        }
    }
    return (
        <div style={{background: '#000', height: '100hv', width: '100vw', color: '#fff', fontSize: '42px'}}>

            <h2>login</h2>

            <input value={username} onChange={e=>setUsername(e.target.value)} type="text"/>
            <input value={name} onChange={e=>setName(e.target.value)} type="text"/>
            <button onClick={handleLogin}>login</button>
        </div>
    );
};

export default Login;
