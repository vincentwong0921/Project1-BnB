import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session'

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch()

    const logout = e => {
        e.preventDefault()
        dispatch(sessionActions.logout())
    }

    return(
        <>
            <button>
                <i className="fa-solid fa-id-card-clip"></i>
            </button>

            <ul className="profile-dropdown">
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li>
                    <button onClick={logout}>Logout</button>
                </li>
            </ul>
        </>
    )
};

export default ProfileButton;
