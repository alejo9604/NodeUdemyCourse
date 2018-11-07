const axios = require('axios');


const gteLugarLatLng = async (direccion) => {

    let encodeUrl = encodeURI(direccion);

    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUrl}&key=AIzaSyDa0SZ-9MJP3pBHwxgg2rWFBn20YUVaGyw `);
            
    if(resp.data.status === 'ZERO_RESULTS'){
        throw new Error(`No hay resutlados para la ciudad ${direccion}`);
    }


    let location = resp.data.results[0];
    let coors = location.geometry.location;

    return {
        direccion: location.formatted_address,
        lat: coors.lat, 
        lng: coors.lng
    }
}


module.exports = {
    gteLugarLatLng
}