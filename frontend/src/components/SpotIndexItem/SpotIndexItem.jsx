import { Link } from 'react-router-dom'

const SpotIndexItem = ({ spot }) => {
    return(
        <div className='spotsbox'>
            <Link to={`/spots/${spot.id}`}>
                <img
                    src={spot.previewImage}
                    className='spotimage'
                    title={spot.name}
                    >
                </img>
            </Link>
            <div className='SpotDetail'>
                <div className='citystaterating'>
                    {spot.city}, {spot.state}
                    <div>
                        <i className="fa-solid fa-star"></i>{spot.avgRating}
                    </div>
                </div>
                <span style={{fontWeight: 'bold'}}>${spot.price}</span> per night
            </div>
        </div>
    )
}


export default SpotIndexItem
