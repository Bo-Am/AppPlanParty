import React from 'react';
import {useSelector} from "react-redux";

const UserProfile = () => {
    const user = useSelector(state => state.auth.user)
    // window.localStorage.setItem('userName', JSON.stringify(name))
    // const raw = localStorage.getItem('userName')
    // const user = JSON.parse(raw)
    // console.log(user.name)
    return (
        <div>
            {user && user.name}
            {user && user.email}
            {user && user.avatar}
            {/*<div>{selectorRedux.auth.user.email}</div>*/}
        </div>
    );
};

export default UserProfile;