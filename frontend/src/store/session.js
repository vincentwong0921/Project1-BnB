import { csrfFetch } from "./csrf"

const SET_USER = 'user/SET_USER'
const REMOVE_USER = 'user/REMOVE_USER'

/* actions */
export const setUser = user => ({
    type: SET_USER,
    user
})

export const removeUser = () => ({
    type: REMOVE_USER,
})


/* thunks */
export const loginUser = (user) => async (dispatch) => {
    const { credential, password } = user

    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            credential,
            password
        })
    })

    const data = await response.json();
    dispatch(setUser(data.user))
    return response
}

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session')
    const data = await response.json()
    dispatch(setUser(data.user))
    return response
}

export const signUpUser = user => async (dispatch) => {
    const {username, firstName, lastName, email, password} = user

    const response = await csrfFetch('/api/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username, firstName, lastName, email, password
        })
    })

    const data = await response.json()
    console.log(data)
    dispatch(setUser(data.user))
    return response
}

export const logout = () => async(dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    })
    dispatch(removeUser())
    return response
}

/* selectors */




/* reducer */

const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_USER: {
            return {
                ...state,
                user: action.user
            }
        }
        case REMOVE_USER: {
            return {...state, user: null}
        }
        default:
            return state;
    }
}

export default sessionReducer
