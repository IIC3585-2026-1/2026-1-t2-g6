// Referecia de función: https://medium.com/@randomstr/generating-random-strings-in-javascript-and-its-frameworks-118cb1c9cba7
function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const validarPasaporte = (id) => {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (id % 2 == 0) {
                reject("El id es inválido");
            } else {
                resolve("El id es válido")
            }
        }, 1500);
    });
};

// Referencias de Math.random(): https://www.w3schools.com/Js/js_random.asp
const verificarRestriccionesVisa = (id) => {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            const prob = Math.random();
            if (prob <= 0.3) {
                reject("Visa no válida para el destino");
            } else {
                resolve("Visa válida para el destino");
            }
        }, 2000);
    });
};

const asignarAsiento = () => {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            const randomString = generateRandomString(3);
            resolve(randomString);
        }, 1000);
    });
};

const generarPaseAbordar = (pasaporte, visa, asiento) => {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve({pasaporte, visa, asiento});
        }, 500);
    });
};
