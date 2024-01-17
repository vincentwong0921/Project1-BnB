import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const RECEIVE_SPOT = 'spots/RECEIVE_SPOT'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const REMOVE_SPOT = 'spots/REMOVE_SPOT'

/* Action Creator */
export const loadAllSpots = spots => ({
    type: LOAD_SPOTS,
    spots
})

export const receiveSpot = spot => ({
    type: RECEIVE_SPOT,
    spot
})

export const editSpot = spot => ({
    type: UPDATE_SPOT,
    spot
})

export const deleteSpot = spotId => ({
    type: REMOVE_SPOT,
    spotId
})

/* Thunk */

export const getAllSpots = () => async(dispatch) => {
    const response = await csrfFetch('/api/spots')
    if(response.ok){
        const spots = await response.json()
        dispatch(loadAllSpots(spots))
    } else {
        const error = await response.json()
        return error
    }
}

export const getOneSpot = spotId => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if(response.ok){
        const spotDetail = await response.json()
        dispatch(receiveSpot(spotDetail))
    } else {
        const error = await response.json()
        console.log(error)
        return error
    }
}

export const createSpot = spot => async(dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    })

    if(response.ok){
        const newSpot = await response.json()
        dispatch(receiveSpot(newSpot))
        return newSpot
    } else {
        const error = await response.json()
        return error
    }
}



/* Reducer */

const initialState = {}

const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SPOTS: {
            const spotState = {}
            action.spots.Spots.forEach(spot => spotState[spot.id] = spot)
            return spotState
        }
        case RECEIVE_SPOT: {
            return {...state, [action.spot.id] : action.spot}
        }
        case UPDATE_SPOT: {
            return {...state, [action.spot.id] : action.spot}
        }
        case REMOVE_SPOT: {
            const newSpotState = {...state}
            delete newSpotState[action.spotId]
            return newSpotState
        }
        default:
            return state
    }
}

export default spotsReducer;
