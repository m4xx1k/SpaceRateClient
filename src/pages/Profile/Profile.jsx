import React, {useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram.js";
import {useNavigate} from "react-router-dom";
import {useFindUserMutation} from "../../redux/auth/authApiSlice.js";
import s from './Profile.module.scss'

const Profile = () => {
    const {tg, user: tgUser} = useTelegram()
    const [user, setUser] = useState({})
    const [findUser] = useFindUserMutation()

    useEffect(() => {
        const handleFindUser = async () => {
            const data = await findUser({telegramId: tgUser?.id})
            if (data.data) setUser(data.data)
        }
        handleFindUser()
        tg.ready()
    }, [])
    return (
        <div className={s.container}>
            <h2 className={s.title}>Профиль</h2>
            <ul className={s.info}>
                <img src={user.picture} style={{width: 64, height: 64, borderRadius: '50%'}} alt=""/>

                <li key={elem} className={s.info_item}>
                    <span className={s.info_name}>{`ID:`}</span>
                    <span className={s.info_value}>{user.telegramId}</span>
                </li>
                <li key={elem} className={s.info_item}>
                    <span className={s.info_name}>{`Username:`}</span>
                    <span className={s.info_value}>{user.username}</span>
                </li>
                <li key={elem} className={s.info_item}>
                    <span className={s.info_name}>{`Name:`}</span>
                    <span className={s.info_value}>{user.name}</span>
                </li>
            </ul>

        </div>
    );
};

export default Profile;
