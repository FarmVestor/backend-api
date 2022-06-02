const addressTransformers = (city) => {
    
    if (city.latitude) {
        city.latitude = parseFloat(city.latitude)
    }
    if (city.longitude) {
        city.longitude = parseFloat(city.longitude)
    }
    return city
}
const addressesTransformers = (ArrayOfCitys) => {
    return ArrayOfCitys.map((singleCity) => addressTransformers(singleCity))
}
module.exports = {
    addressTransformers,
    addressesTransformers
}