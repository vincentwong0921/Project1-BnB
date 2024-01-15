import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

const CreateNewSpot = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [country, setCountry] = useState('Country')
    const [streetAddress, setStreetAddress] = useState('Address')
    const [city, setCity] = useState('City')
    const [state, setState] = useState('STATE')
    const [lat, setLat] = useState('Latitude')
    const [lng, setLng] = useState('Longitude')
    const [des, setDes] = useState('Please write at least 30 characters')
    const [title, setTitle] = useState('Name of your spot')
    const [price, setPrice] = useState('Price per night (USD)')
    const [preUrl, setPreUrl] = useState('Preview Image URL')
    const [url1, setUrl1] = useState('Image URL')
    const [url2, setUrl2] = useState('Image URL')
    const [url3, setUrl3] = useState('Image URL')
    const [url4, setUrl4] = useState('Image URL')

    const reset = () => {

    }

    const handleSubmit = e => {
        e.preventDefault()
        const newSpot = { country, streetAddress, city, state, lat, lng, des, title, price, preUrl, url1, url2, url3, url4 }


        reset()
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Create a new Spot</h2>
            <h4>Where's your place located?</h4>
            Guests will only get your exact address once they booked a reservation.<br></br>
            <div className="newspotaddress">
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Street Address
                    <input
                        type="text"
                        value={streetAddress}
                        onChange={e => setStreetAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Latitude
                    <input
                        type="text"
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                    />
                </label>
                <label>
                    Longitude
                    <input
                        type="text"
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                    />
                </label>
            </div>

            <div className="spotdes">
                <h4>Describe your place to guests</h4>
                Mention the best features of your space, any special amentities like fast wife or parking, and what you love about the neighborhood.
                <label>
                    <textarea
                        value={des}
                        onChange={e => setDes(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div className="spottitle">
                <h4>Create a title for your spot</h4>
                Catch guests' attention with a spot title that highlights what makes your place special
                <label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
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
                />
                <input
                    type="text"
                    value={url1}
                    onChange={e => setUrl1(e.target.value)}
                />
                <input
                    value={url2}
                    onChange={e => setUrl2(e.target.value)}
                />
                <input
                    value={url3}
                    onChange={e => setUrl3(e.target.value)}
                />
                <input
                    value={url4}
                    onChange={e => setUrl4(e.target.value)}
                />
            </div>

            <div className="createbutton">
                <button className="spotbutton">Create Spot</button>
            </div>
        </form>
    )
}

export default CreateNewSpot
