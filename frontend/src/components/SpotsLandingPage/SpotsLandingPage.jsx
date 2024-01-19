import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllSpots } from '../../store/spots'
import SpotIndexItem from '../SpotIndexItem/SpotIndexItem'

const SpotsLandingPage = () => {
    const spots = Object.values(useSelector(state => state.spots ? state.spots : null))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return(
        <section>
            <div className='spotshow'>
                {spots.map((spot) => (
                    <SpotIndexItem
                        spot={spot}
                        key={spot.id}
                    />
                ))}
            </div>
        </section>
    )
}


export default SpotsLandingPage
