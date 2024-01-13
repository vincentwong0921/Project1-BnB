import './Navigation.css'
import ProfileButton from './ProfileButton'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

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
                <NavLink to={'/login'}>Login</NavLink>
            </li>
            <li>
                <NavLink to={'/signup'}>Sign Up</NavLink>
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
