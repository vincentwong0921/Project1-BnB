import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSpot } from "../../store/spots";

const CreateNewSpot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [preUrl, setPreUrl] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const reset = () => {
    setCountry(""),
      setAddress(""),
      setCity(""),
      setState(""),
      setLat(""),
      setLng(""),
      setDescription(""),
      setName(""),
      setPreUrl(""),
      setUrl1(""),
      setUrl2(""),
      setUrl3(""),
      setUrl4("");
  };

  useEffect(() => {
    const errs = {};
    if (!country) {
      errs.country = "Country is required";
    }
    if (!address) {
      errs.address = "Address is required";
    }
    if (!city) {
      errs.city = "City is required";
    }
    if (!state) {
      errs.state = "State is required";
    }
    if (description.length < 30) {
      errs.description = "Description needs a minimum of 30 characters";
    }
    if (!name) {
      errs.name = "Name is required";
    }
    if (!price) {
      errs.price = "Price is required";
    }
    if (!preUrl) {
      errs.preUrl = "Preview image is required";
    }
    if (
      (preUrl && !preUrl.toLowerCase().endsWith(".png")) &&
      (preUrl && !preUrl.toLowerCase().endsWith(".jpg")) &&
      (preUrl && !preUrl.toLowerCase().endsWith(".jpeg"))
    ) {
      errs.preUrl = "Image URL must end in .png, .jpg, .jpeg";
    }

    if (submitted) {
      if (
        !url1.toLowerCase().endsWith(".png") &&
        !url1.toLowerCase().endsWith(".jpg") &&
        !url1.toLowerCase().endsWith(".jpeg")
      ) {
        errs.url1 = "Image URL must end in .png, .jpg, .jpeg";
      }
      if (
        !url2.toLowerCase().endsWith(".png") &&
        !url2.toLowerCase().endsWith(".jpg") &&
        !url2.toLowerCase().endsWith(".jpeg")
      ) {
        errs.url2 = "Image URL must end in .png, .jpg, .jpeg";
      }
      if (
        !url3.toLowerCase().endsWith(".png") &&
        !url3.toLowerCase().endsWith(".jpg") &&
        !url3.toLowerCase().endsWith(".jpeg")
      ) {
        errs.url3 = "Image URL must end in .png, .jpg, .jpeg";
      }
      if (
        !url4.toLowerCase().endsWith(".png") &&
        !url4.toLowerCase().endsWith(".jpg") &&
        !url4.toLowerCase().endsWith(".jpeg")
      ) {
        errs.url4 = "Image URL must end in .png, .jpg, .jpeg";
      }
    }
    setError(errs);
  }, [
    country,
    address,
    city,
    state,
    price,
    description,
    name,
    preUrl,
    url1,
    url2,
    url3,
    url4,
    submitted,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const newSpot = { country, address, city, state, description, name, price };
    if (lat !== undefined && lng !== undefined) {
      newSpot.lat = lat || 10;
      newSpot.lng = lng || 20;
    }

    const createdSpot = await dispatch(createSpot(newSpot));

    navigate(`/api/spots/${createdSpot.id}`);
    reset();
  };

  return (
    <form className="createspotform" onSubmit={handleSubmit}>
      <div>
        <h2>Create a new Spot</h2>
        <h4>Where&apos;s your place located?</h4>
        <p>Guests will only get your exact address once they booked a reservation.</p>
      </div>

        <label>
          <span>Country</span>
          {error.country && <span className="errormsg"> {error.country}</span>}
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            />
        </label>

        <label>
          Street Address
          {error.address && <span className="errormsg"> {error.address}</span>}
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </label>

      <div className="citystate">
          <label>
            City {error.city && <span className="errormsg"> {error.city}</span>}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </label>
          
          <label>
            State {error.state && <span className="errormsg"> {error.state}</span>}
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="STATE"
            />
          </label>
      </div>

      <div className="latlng">
        <label>
            Latitude
            <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Latitude"
            />
        </label>

        <label>
            Longitude
            <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="Longitude"
            />
        </label>
      </div>

      <div className="spotdes">
        <h4>Describe your place to guests</h4>
        <p>
          Mention the best features of your space, any special amentities like
          fast wife or parking, and what you love about the neighborhood.
        </p>
        <label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
          />
        </label>
        {error.description && <p className="errormsg">{error.description}</p>}
      </div>

      <div className="spottitle">
        <h4>Create a title for your spot</h4>
        <p>
          Catch guest&apos;s attention with a spot title that highlights what
          makes your place special
        </p>
        <label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of your spot"
          />
        </label>
        {error.name && <p className="errormsg">{error.name}</p>}
      </div>

      <div className="spotprice">
        <h4>Set a base price for your spot</h4>
        Competitive pricing can help your listing stand out and rank higher in
        search results
        <label>
          <span>$</span>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price per night(USD)"
          />
        </label>
        {error.price && <p className="errormsg">{error.price}</p>}
      </div>

      <div className="spoturl">
        <h4>Liven up your spot with photos</h4>
        Submit a link to at least one photo to publish your spot
        <input
          type="text"
          value={preUrl}
          onChange={(e) => setPreUrl(e.target.value)}
          placeholder="Preview Image URL"
        />
        {error.preUrl && <p className="errormsg">{error.preUrl}</p>}

        <input
          type="text"
          value={url1}
          onChange={(e) => setUrl1(e.target.value)}
          placeholder="Image URL"
        />
        {error.url1 && <p className="errormsg">{error.url1}</p>}
        <input
          type="text"
          value={url2}
          onChange={(e) => setUrl2(e.target.value)}
          placeholder="Image URL"
        />
        <input
          type="text"
          value={url3}
          onChange={(e) => setUrl3(e.target.value)}
          placeholder="Image URL"
        />
        <input
          type="text"
          value={url4}
          onChange={(e) => setUrl4(e.target.value)}
          placeholder="Image URL"
        />
      </div>

      <div className="createbutton">
        <button className="spotbutton" disabled={Object.values(error).length}>
          Create Spot
        </button>
      </div>
    </form>
  );
};

export default CreateNewSpot;
