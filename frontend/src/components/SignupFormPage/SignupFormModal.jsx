import { useState } from 'react'
import { signUpUser } from '../../store/session'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'

const SignupFormModal = ({navigateToHome}) => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const handleSubmit = async e => {
      e.preventDefault();

      try{
        if(password !== confirmPassword){
          const errs = {}
          errs.password = "Password must be the same as Confirm Password!!"
          setErrors(errs)
        } else {
          const newUser = { username, firstName, lastName, email, password }
          await dispatch(signUpUser(newUser))
          closeModal()
          navigateToHome()
        }
      } catch(error){
          const data = await error.json()
          setErrors(data.errors)
      }
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
                  disabled={!firstName ||!lastName ||!email ||!password ||!confirmPassword || username.length < 4 || password.length < 6}
                >
                  Sign Up!</button>
              </div>
            </form>

          </div>
        </>
      );
}


export default SignupFormModal
