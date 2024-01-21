import SpotForm from "./SpotForm";

const CreateNewSpot = () => {
    const spot = {
        country: '',
        address: '',
        city: '',
        state: '',
        lat: '',
        lng: '',
        description: '',
        name: '',
        price: ''
    }

    return(
        <>
            <SpotForm
                spot={spot}
                formType="Create Spot"
            />
        </>
    )
}

export default CreateNewSpot
