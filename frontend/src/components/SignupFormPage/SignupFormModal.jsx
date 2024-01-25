import { useState, useEffect } from 'react'
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

    useEffect(() => {
      const errs = {}
      if(password !== confirmPassword) errs.password = "Confirm Password field must be the same as Password field"
      setErrors(errs)
      if (!errs.firstName && !errs.lastName && !errs.email && !errs.username && !errs.password && !errs.confirmPassword
      ) {
        setErrors({});
      } else {
        setErrors(errs);
      }
    }, [firstName, lastName, email, username, password, confirmPassword])

    const handleSubmit = async e => {
      e.preventDefault();
      const newUser = { username, firstName, lastName, email, password }

      try{
        await dispatch(signUpUser(newUser))
        closeModal()
        navigateToHome()
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
