import { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'

const SignupFormModal = () => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        if(password === confirmPassword){
            setErrors({});
            return dispatch(
              sessionActions.signUpUser({
                username,
                firstName,
                lastName,
                email,
                password
            }))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if(data?.errors) setErrors(data.errors)
                }
            )
        }

        return setErrors({
            confirmPassword: 'Confirm Password field must be the same as the Password field'
        })
    }

    return (
        <>
          <div className='signupform'>
            <form onSubmit={handleSubmit}>
            <h1>Sign Up Here</h1>

              <label>
                First Name
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>
              {errors.firstName && <div className='errormsg'>{errors.firstName}</div>}

              <label>
                Last Name
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </label>
              {errors.lastName && <div className='errormsg'>{errors.lastName}</div>}

              <label>
                Email
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              {errors.email && <div className='errormsg'>{errors.email}</div>}

              <label>
                Username
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              {errors.username && <div className='errormsg'>{errors.username}</div>}

              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              {errors.password && <div className='errormsg'>{errors.password}</div>}

              <label>
                Confirm Password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              {errors.confirmPassword && <div className='errormsg'>{errors.confirmPassword}</div>}

              <div className='signup'>
                <button
                  className='signupbutton'
                  type="submit"
                  disabled={Object.values(errors).length}
                >
                  Sign Up!</button>
              </div>
            </form>

          </div>
        </>
      );
}


export default SignupFormModal
