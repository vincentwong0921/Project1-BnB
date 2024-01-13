import './Navigation.css'
import ProfileButton from './ProfileButton'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user)

    return(
        <div className='navi'>
            <ul>
                <li>
                    <NavLink to={'/'}>Home</NavLink>
                </li>
                {isLoaded && (
                    <li>
                        <ProfileButton user={sessionUser}/>
                    </li>
                )}
            </ul>
        </div>
    )
}


export default Navigation
