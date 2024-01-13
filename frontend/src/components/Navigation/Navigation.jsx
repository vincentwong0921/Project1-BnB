import './Navigation.css'
import ProfileButton from './ProfileButton'
import { useSelector, useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import { NavLink } from 'react-router-dom'

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const logout = e => {
        e.preventDefault()
        dispatch(sessionActions.logout())
    }

    const sessionLinks = sessionUser ? (
        <>
            <li>
                <ProfileButton user={sessionUser}/>
            </li>
            <li>
                <button onClick={logout}>Log Out</button>
            </li>
        </>
    ) : (
        <>
            <li>
                <NavLink to={'/login'}>Login</NavLink>
            </li>
            <li>
                <NavLink to={'/signup'}>Sign Up</NavLink>
            </li>
        </>
    )


    return(
        <ul>
            <li>
                <NavLink to={'/'}>Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    )
}


export default Navigation
