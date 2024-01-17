import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { createSpot } from "../../store/spots"

const CreateNewSpot = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [preUrl, setPreUrl] = useState('')
    const [url1, setUrl1] = useState('')
    const [url2, setUrl2] = useState('')
    const [url3, setUrl3] = useState('')
    const [url4, setUrl4] = useState('')
    const [error, setError] = useState({})

    const reset = () => {
        setCountry(''), setAddress(''), setCity(''), setState(''), setLat(''), setLng(''), setDescription(''), setName(''), setPreUrl(''), setUrl1(''), setUrl2(''), setUrl3(''), setUrl4('')
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const newSpot = { country, address, city, state, description, name, price }
        if(lat !== undefined && lng !== undefined){
            newSpot.lat = lat
            newSpot.lng = lng
        }

        const createdSpot = await dispatch(createSpot(newSpot))

        navigate(`/api/spots/${createdSpot.id}`)
        reset()
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Create a new Spot</h2>
            <h4>Where&apos;s your place located?</h4>
            <p>Guests will only get your exact address once they booked a reservation.</p>

            <div className="newspotaddress">
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder="Country"
                        required
                    />
                </label>
                <label>
                    Street Address
                    <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Address"
                        required
                    />
                </label>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="City"
                        required
                    />
                </label>
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder="STATE"
                        required
                    />
                </label>
                <label>
                    Latitude
                    <input
                        type="text"
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                        placeholder="Latitude"
                    />
                </label>
                <label>
                    Longitude
                    <input
                        type="text"
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                        placeholder="Longitude"
                    />
                </label>
            </div>

            <div className="spotdes">
                <h4>Describe your place to guests</h4>
                Mention the best features of your space, any special amentities like fast wife or parking, and what you love about the neighborhood.
                <label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        placeholder="Please write at least 30 characters"
                    />
                </label>
            </div>

            <div className="spottitle">
                <h4>Create a title for your spot</h4>
                <p>Catch guest&apos;s attention with a spot title that highlights what makes your place special</p>
                <label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name of your spot"
                        required
                    />
                </label>
            </div>

            <div className="spotprice">
                <h4>Set a base price for your spot</h4>
                Competitive pricing can help your listing stand out and rank higher in search results
                <label>
                    $
                    <input
                        type="text"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder="Price per night(USD)"
                        required
                    />
                </label>
            </div>

            <div className="spoturl">
                <h4>Liven up your spot with photos</h4>
                Submit a link to at least one photo to publish your spot
                <input
                    type="text"
                    value={preUrl}
                    onChange={e => setPreUrl(e.target.value)}
                    placeholder="Preview Image URL"
                />
                <input
                    type="text"
                    value={url1}
                    onChange={e => setUrl1(e.target.value)}
                    placeholder="Image URL"
                />
                <input
                    value={url2}
                    onChange={e => setUrl2(e.target.value)}
                    placeholder="Image URL"
                />
                <input
                    value={url3}
                    onChange={e => setUrl3(e.target.value)}
                    placeholder="Image URL"
                />
                <input
                    value={url4}
                    onChange={e => setUrl4(e.target.value)}
                    placeholder="Image URL"
                />
            </div>

            <div className="createbutton">
                <button className="spotbutton">Create Spot</button>
            </div>
        </form>
    )
}

export default CreateNewSpot
