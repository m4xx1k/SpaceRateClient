import React, {useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram.js";
import {useNavigate} from "react-router-dom";
import {useFindUserMutation, useRegistrationMutation} from "../../redux/auth/authApiSlice.js";
import s from './Login.module.scss'

const Login = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const {tg, user: tgUser} = useTelegram()
    const [username, setUsername] = useState(!!tgUser?.username ? tgUser.username : '')
    const [name, setName] = useState(!!tgUser?.username ? tgUser.first_name : '')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [findUser] = useFindUserMutation()
    const [registration] = useRegistrationMutation()
    useEffect(() => {
        tg.ready()
        const handleFindUser = async () => {
            const {data} = await findUser({telegramId: tgUser?.id})
            if (data) {
                navigate('/profile', {replace: true})
            }
            // setIsLoaded(true)
        }
        if (!tgUser) {
            window.location.replace('https://t.me/goodjoyuz_bot')
        } else handleFindUser()
    }, [])
    const handleLogin = async () => {
        try {
            if (!!username && !!name) {
                await registration({
                    telegramId: `${tgUser.id}`,
                    password: `${tgUser.id}`,
                    username,
                    name
                })
                navigate(-1)
            } else {
                setError('Поле не может быть пустым')
            }
        } catch (e) {
            alert(JSON.stringify(e))
        }
    }
    // if (isLoaded) return <p className={'center'}>загрузка</p>
    return (
        <div className={s.container}>

            <h2 className={s.title}>Добро Пожаловать!</h2>

            <input className={s.input} placeholder={'Логин...'} value={username}
                   onChange={e => setUsername(e.target.value)} type="text"/>
            <input className={s.input} placeholder={'Имя...'} value={name} onChange={e => setName(e.target.value)}
                   type="text"/>
            <span className={s.error}>{error}</span>
            <button className={s.btn} onClick={handleLogin}>Ввойти</button>
        </div>
    );
};

export default Login;
