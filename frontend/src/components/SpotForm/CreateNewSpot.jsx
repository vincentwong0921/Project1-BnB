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

    const preUrl = {
        url: '',
        preview: true
    }

    const url1 = {
        url: '',
        preview: false
    }

    const url2 = {
        url: '',
        preview: false
    }

    const url3 = {
        url: '',
        preview: false
    }

    const url4 = {
        url: '',
        preview: false
    }

    return(
        <>
            <SpotForm
                spot={spot}
                preUrl={preUrl}
                url1={url1}
                url2={url2}
                url3={url3}
                url4={url4}
                formType="Create Spot"
            />
        </>
    )
}

export default CreateNewSpot
