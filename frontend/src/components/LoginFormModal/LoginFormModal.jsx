import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session'
import { useModal } from "../../context/Modal";

const LoginFormModal = () => {
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const handleSubmit = e => {
    e.preventDefault()
    setErrors({});
    return dispatch(sessionActions.loginUser({credential, password}))
    .then(closeModal)
    .catch( async (res) => {
            const data = await res.json()
            if(data?.message) setErrors({message: data.message})
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

        {errors.message && <p>{errors.message}</p>}

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
