import { authService } from 'fbase';
import { signOut } from "firebase/auth";
import React from 'react';

const Profile = () => {

    const onLogOutClick=()=>{
        signOut(authService)
    }
    return (
        <div>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    );
};

export default Profile;