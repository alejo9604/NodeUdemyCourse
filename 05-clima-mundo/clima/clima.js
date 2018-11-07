
const axios = require('axios');

const getClima = async (lat, lng) => {
   
    let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=f73761ea6b5a4ab85ad33795e701a410`)
   
    if(resp.data.cod !== 200){
        throw new Error("Infromación no valida");
    }

    return resp.data.main.temp;

}



module.exports = {
    getClima
}