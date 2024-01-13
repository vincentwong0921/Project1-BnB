import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session'
import './LoginForm.css'
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

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>

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

        {errors.message && <p>{errors.message}</p>}

        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default LoginFormModal;
