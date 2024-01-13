import './Navigation.css'
import ProfileButton from './ProfileButton'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import LoginFormModal from '../LoginFormModal/LoginFormModal'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import SignupFormModal from '../SignupFormPage/SignupFormModal'

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user)

    const sessionLinks = sessionUser ? (
        <>
            <li>
                <ProfileButton user={sessionUser}/>
            </li>
        </>
    ) : (
        <>
            <li>
                <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal/>}
                />
            </li>
            <li>
                <OpenModalButton
                    buttonText='Sign Up'
                    modalComponent={<SignupFormModal/>}
                />
            </li>
        </>
    )

    return(
        <div className='navi'>
            <ul>
                <li>
                    <NavLink to={'/'}>Home</NavLink>
                </li>
                {isLoaded && sessionLinks}
            </ul>
        </div>
    )
}


export default Navigation
