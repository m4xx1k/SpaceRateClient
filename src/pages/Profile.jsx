import React, {useEffect, useState} from 'react';
import {useTelegram} from "../hooks/useTelegram.js";
import {useNavigate} from "react-router-dom";
import {useFindUserMutation} from "../redux/auth/authApiSlice.js";

const Profile = () => {
    const {tg,user:tgUser} = useTelegram()
    const [user, setUser] = useState({})
    const [etc,sett]= useState(null)
    const [findUser] = useFindUserMutation()

    useEffect(()=>{
        const handleFindUser = async ()=>{
            const data = await findUser({telegramId:tgUser?.id})
            if(data.data) setUser(data.data)
            sett(data)
        }
        handleFindUser()
        tg.ready()
    },[])
    return (
        <div>
            {Object.keys(user).map(elem=>(
                <div>
                    <span>{elem}</span>:<span>{user[elem]}</span>
                </div>
            ))}
            {JSON.stringify(etc)}
        </div>
    );
};

export default Profile;
