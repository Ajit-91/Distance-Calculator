
const getLetLng = async (place) => {
    return {
        lat : place.geometry.location.lat(),
        lng: place.geometry.location.lng()
    }
}

export default getLetLng;