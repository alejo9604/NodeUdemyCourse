
const clima  = require('./clima/clima');
const lugar = require('./lugar/lugar');


const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Descripción de la ciudad a obtener el clima',
        demand: true
    }
}).argv;



// lugar.gteLugarLatLng(argv.direccion)
//     .then((resp) => {
//         console.log(resp);
//     }).catch((err) => {
//         console.log(err);
//     });

// clima.getClima(6.244203, -75.5812119)
//     .then( temp => console.log(temp))
//     .catch( err => console.log(err));


let getInfo = async (direccion) => {

    try {
        let coors = await lugar.gteLugarLatLng(direccion);
        let temp = await clima.getClima(coors.lat, coors.lng);

        return `El clima en ${coors.direccion} es de ${temp}`;   
    } catch (error) {
        return `No se pudo determinar el clima en ${direccion}`;
    }
}


getInfo(argv.direccion)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));

