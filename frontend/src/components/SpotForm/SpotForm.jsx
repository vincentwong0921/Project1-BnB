import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSpot, updateSpot } from "../../store/spots";
import { postSpotImage } from "../../store/spots";
import { editSpotImage } from "../../store/spots";

const SpotForm = ({ spot, formType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [country, setCountry] = useState(spot?.country);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [lat, setLat] = useState(spot?.lat);
  const [lng, setLng] = useState(spot?.lng);
  const [description, setDescription] = useState(spot?.description);
  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);
  const [errors, setErrors] = useState({});

  const [preUrl, setPreUrl] = useState(spot && spot.SpotImages && spot.SpotImages[0] && spot.SpotImages[0].url || '');
  const [url1, setUrl1] = useState(spot && spot.SpotImages && spot.SpotImages[1] && spot.SpotImages[1].url || '');
  const [url2, setUrl2] = useState(spot && spot.SpotImages && spot.SpotImages[2] && spot.SpotImages[2].url || '');
  const [url3, setUrl3] = useState(spot && spot.SpotImages && spot.SpotImages[3] && spot.SpotImages[3].url || '');
  const [url4, setUrl4] = useState(spot && spot.SpotImages && spot.SpotImages[4] && spot.SpotImages[4].url || '');

  const reset = () => {
    setCountry(""), setAddress(""),setCity(""),setState(""),setLat(""),setLng(""),setDescription(""),
    setName(""),setPreUrl(""),setUrl1(""),setUrl2(""),setUrl3(""),setUrl4("");
  };

  useEffect(() => {
    const errs = {};
    if (!country) errs.country = "Country is required";
    if (!address) errs.address = "Address is required";
    if (!city) errs.city = "City is required";
    if (!state) errs.state = "State is required";
    if (!name) errs.name = "Name is required";
    if (!price) errs.price = "Price is required";
    if (!preUrl) errs.preUrl = "Preview image is required";
    if (!description || description && description.length < 30) {
      errs.description = "Description needs a minimum of 30 characters";
    }
    if (
      (preUrl && !preUrl.toLowerCase().endsWith(".png")) &&
      (preUrl && !preUrl.toLowerCase().endsWith(".jpg")) &&
      (preUrl && !preUrl.toLowerCase().endsWith(".jpeg"))
    ) {
      errs.preUrl = "Image URL must end in .png, .jpg, .jpeg";
    }
    if (
      (url1 && !url1.toLowerCase().endsWith(".png")) &&
      (url1 && !url1.toLowerCase().endsWith(".jpg")) &&
      (url1 && !url1.toLowerCase().endsWith(".jpeg"))
    ) {
      errs.url1 = "Image URL must end in .png, .jpg, .jpeg";
    }
    if (
      (url2 && !url2.toLowerCase().endsWith(".png")) &&
      (url2 && !url2.toLowerCase().endsWith(".jpg")) &&
      (url2 && !url2.toLowerCase().endsWith(".jpeg"))
    ) {
      errs.url2 = "Image URL must end in .png, .jpg, .jpeg";
    }
    if (
      (url3 && !url3.toLowerCase().endsWith(".png")) &&
      (url3 && !url3.toLowerCase().endsWith(".jpg")) &&
      (url3 && !url3.toLowerCase().endsWith(".jpeg"))
    ) {
      errs.url3 = "Image URL must end in .png, .jpg, .jpeg";
    }
    if (
      (url4 && !url4.toLowerCase().endsWith(".png")) &&
      (url4 && !url4.toLowerCase().endsWith(".jpg")) &&
      (url4 && !url4.toLowerCase().endsWith(".jpeg"))
    ) {
      errs.url4 = "Image URL must end in .png, .jpg, .jpeg";
    }
    setErrors(errs);
  }, [ country, address, city, state, price, description, name, preUrl, url1, url2, url3, url4 ]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      spot = { ...spot, country, address, city, state, price, description, name, lat, lng }

      const previewImage = { url: preUrl, preview: true }

      if (lat !== undefined && lng !== undefined) {
        spot.lat = lat || 10;
        spot.lng = lng || 20;
      }

      if (formType === "Update Your Spot") {
        const editedSpot = await dispatch(updateSpot(spot))
        spot = editedSpot
        await dispatch(editSpotImage(spot.id, previewImage))
      } else if (formType === "Create Spot") {
        const newSpot = await dispatch(createSpot(spot))
        spot = newSpot
        await dispatch(postSpotImage(spot.id, previewImage))

        if(url1){
          const img1 = {url: url1, preview: false}
          await dispatch(postSpotImage(spot.id, img1))
        }

        if(url2){
          const img2 = {url: url2, preview: false}
          await dispatch(postSpotImage(spot.id, img2))
        }

        if(url3){
          const img3 = {url: url3, preview: false}
          await dispatch(postSpotImage(spot.id, img3))
        }

        if(url4){
          const img4 = {url: url4, preview: false}
          await dispatch(postSpotImage(spot.id, img4))
        }
      }

      navigate(`/spots/${spot.id}`);
      reset();

    } catch (error) {
        const errs = await error.json()
        setErrors(errs.errors)
    }
  };

  return (
    <form className="createspotform" onSubmit={handleSubmit}>
      <div>
        <h2>{formType === "Create Spot" ? 'Create a New Spot' : 'Update Your Spot'}</h2>
        <h4>Where&apos;s your place located?</h4>
        <p>Guests will only get your exact address once they booked a reservation.</p>
      </div>

        <label>
          <span>Country</span>
          {errors.country && <span className="errormsg"> {errors.country}</span>}
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            />
        </label>

        <label>
          Street Address
          {errors.address && <span className="errormsg"> {errors.address}</span>}
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </label>

      <div className="citystate">
          <label>
            City {errors.city && <span className="errormsg"> {errors.city}</span>}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </label>

          <label>
            State {errors.state && <span className="errormsg"> {errors.state}</span>}
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
        {errors.description && <p className="errormsg">{errors.description}</p>}
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
        {errors.name && <p className="errormsg">{errors.name}</p>}
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
        {errors.price && <p className="errormsg">{errors.price}</p>}
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
        {errors.preUrl && <p className="errormsg">{errors.preUrl}</p>}

        <input
          type="text"
          value={url1}
          onChange={(e) => setUrl1(e.target.value)}
          placeholder="Image URL"
        />
        {errors.url1 && <p className="errormsg">{errors.url1}</p>}
        <input
          type="text"
          value={url2}
          onChange={(e) => setUrl2(e.target.value)}
          placeholder="Image URL"
        />
        {errors.url2 && <p className="errormsg">{errors.url2}</p>}
        <input
          type="text"
          value={url3}
          onChange={(e) => setUrl3(e.target.value)}
          placeholder="Image URL"
        />
        {errors.url3 && <p className="errormsg">{errors.url3}</p>}
        <input
          type="text"
          value={url4}
          onChange={(e) => setUrl4(e.target.value)}
          placeholder="Image URL"
        />
        {errors.url4 && <p className="errormsg">{errors.url4}</p>}
      </div>

      <div className="createbutton">
        <button className="spotbutton" disabled={Object.values(errors).length}>
          {formType}
        </button>
      </div>
    </form>
  );
};

export default SpotForm;
