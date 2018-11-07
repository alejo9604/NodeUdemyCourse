//requireds
const fs = require('fs');
const colors = require('colors');


// module.exports.crearArchivo
let crearArchivo = ( base, limite = 10 ) => {
    return new Promise( (resolve, reject) => {
    
        if( !Number(base) ){
            reject(`El valos introducido ${base} no es un numero.`);
            return;
        }

        let data = "";

        for (let i = 1; i <= limite; i++) {
            data += `${base} * ${i} = ${base * i}\n`;
        }


        fs.writeFile(`tablas/tabla-${base}.txt`, data, (err) => {
            if (err) 
                reject(err);
            else
                resolve(`tabla-${base}.txt`);
        });

    });
}


let listarTabla = (base, limite = 10) => {
    let data = "";

    console.log("=====================".green);
    console.log(`tabla de ${base}`.green);
    console.log("=====================".green);

    for (let i = 1; i <= limite; i++) {
        data += `${base} * ${i} = ${base * i}\n`;
    }
    console.log(data);
}

module.exports = {
    crearArchivo,
    listarTabla
}