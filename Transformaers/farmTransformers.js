
const farmTransformer= function(farm){
    farm.farmPicture=`${process.env.URL + process.env.UPLOADS + farm.farmPicture}`
    
    console.log("farms picture...."+process.env.URL + process.env.UPLOADS )
    if (farm.City?.latitude) {
        farm.City.latitude = parseFloat(farm.City.latitude)
    }
    if (farm.City?.longitude) {
        farm.City.longitude = parseFloat(farm.City.longitude)
    }
    if (farm.farmLatitude) {
        farm.farmLatitude = parseFloat(farm.farmLatitude)
    }
    if (farm.farmLongitude) {
        farm.farmLongitude = parseFloat(farm.farmLongitude)
    }
    return farm
}

const farmsTransformers= function(arrayOfFarms){
   const transformedplace =arrayOfFarms.map((c)=>farmTransformer(c))
   return transformedplace
}

module.exports={
    farmTransformer,
    farmsTransformers
}