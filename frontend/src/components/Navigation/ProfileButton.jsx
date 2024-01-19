import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session'
import LoginFormModal from '../LoginFormModal/LoginFormModal'
import SignupFormModal from "../SignupFormPage/SignupFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { Link, useNavigate } from "react-router-dom";


const ProfileButton = ({ user }) => {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)
    const ulRef = useRef()
    const navigate = useNavigate()

    const toggleMenu = e => {
        e.stopPropagation()
        setShowMenu(!showMenu)
    }

    const navigateToHome = () => {
        navigate('/')
    }

    useEffect(() => {
        if(!showMenu) return

        const closeMenu = e => {
            if(!ulRef.current.contains(e.target)){
                setShowMenu(false)
            }
        }

        document.addEventListener('click', closeMenu)

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    const closeMenu = () => setShowMenu(false)

    const logout = e => {
        e.preventDefault()
        dispatch(sessionActions.logout())
        closeMenu();
        navigate('/')
    }


    const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

    return(
        <>
            <button onClick={toggleMenu}>
                <i className="fa-solid fa-id-card"></i>
            </button>

            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <div className="profilesection">
                            <li>Hello, {user.username}</li>
                            <li className="emailcontainer">{user.email}</li>
                            <li>
                                <Link className="managespotlink">Manage Spots</Link>
                            </li>
                            <li>
                                <button
                                 onClick={logout}
                                 className="logoutbutton"
                                >Logout</button>
                            </li>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="underprofile">
                            <div className="login">
                                <OpenModalButton
                                    buttonText='Log In'
                                    onButtonClick={closeMenu}
                                    modalComponent={<LoginFormModal navigateToHome={navigateToHome}/>}
                                />
                            </div>

                            <div className="signup">
                                <OpenModalButton
                                    buttonText='Sign Up'
                                    onButtonClick={closeMenu}
                                    modalComponent={<SignupFormModal/>}
                                />
                            </div>
                        </div>
                    </>
                )}
            </ul>
        </>
    )
};

export default ProfileButton;
