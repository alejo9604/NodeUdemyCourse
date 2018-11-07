/**
 * Async - Await
 */


// let getNombre = async() => {

//     //throw new Error('No existe un nombre');

//     return 'Alejo';
// };


let getNombre = () => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve('Fernando');
        }, 3000);
    });
};


let saludo = async() => {

    let nombre = await getNombre();

    return `Hola ${nombre}`;
}


// getNombre().then(nombre => {
//         console.log(nombre);
//     })
//     .catch(e => {
//         console.log("Error en Async", e);
//     });


saludo().then(mensaje => {
    console.log(mensaje);
})