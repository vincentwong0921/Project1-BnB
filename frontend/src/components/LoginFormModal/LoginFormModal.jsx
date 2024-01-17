import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session'
import { useModal } from "../../context/Modal";

const LoginFormModal = () => {
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  useEffect(() => {
    const errs = {}
    if(credential.length < 4){
      errs.credential = "username or email is more than 4 characters"
    }
    if(password.length < 6){
      errs.password = "password is more than 6 characters"
    }
    setErrors(errs)
  }, [credential, password])

  const handleSubmit = e => {
    e.preventDefault()
    // navigate('/')
    setErrors({});
    return dispatch(sessionActions.loginUser({credential, password}))
    .then(closeModal)
    .catch( async (res) => {
            const data = await res.json()
            if(data?.message) setErrors({message: "The provided credentials were invalid"})
            }
    )
  }

  const demoClick = e => {
    e.preventDefault()
    return dispatch(sessionActions.loginUser({
      credential: "Demo-lition",
      password: "password"
    }))
    .then(closeModal)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
      <h1>Log In</h1>

        {errors.message && <div className="errormsg">{errors.message}</div>}

        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          className="loginbutton"
          disabled = {Object.values(errors).length}
        >Log In</button>

        <a href="/" onClick={demoClick}>Demo User</a>

      </form>
    </>
  );
};

export default LoginFormModal;
