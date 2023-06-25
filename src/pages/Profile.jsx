import React from 'react';
import {useTelegram} from "../hooks/useTelegram.js";

const Profile = () => {
    const {user} = useTelegram()
    return (
        <div>
            {Object.keys(user).map(elem=>(
                <div>
                    <span>{elem}</span>:<span>{user[elem]}</span>
                </div>
            ))}
        </div>
    );
};

export default Profile;
