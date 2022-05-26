
const farmTransformer= function(farm){
    farm.farmPicture=`${process.env.URL + process.env.UPLOADS + farm.farmPicture}`
    
    console.log("farms picture...."+process.env.URL + process.env.UPLOADS )

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