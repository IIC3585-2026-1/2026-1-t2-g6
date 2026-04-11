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




const conTimeout = (promesa, ms) =>
    Promise.race([
        promesa,
        new Promise((_, reject) =>
            setTimeout(() => reject("Tiempo de espera agotado"), ms)
        )
    ]);

const iniciarCheckIn = (pasajeroId) => {

    const proceso = Promise.all([
        // Verificar pasaporte y visa en paralelo para optimizar el tiempo
        validarPasaporte(pasajeroId).then((resultado) => {
            return resultado;
        }),
        verificarRestriccionesVisa(pasajeroId).then((resultado) => {
            return resultado;
        })
    ])

        // Si ambos procesos son exitosos, asignar asiento y generar pase de abordar
        .then(([pasaporte, visa]) => {
            return asignarAsiento()
                .then((asiento) => ({ pasajeroId, pasaporte, visa, asiento }));
        })

        // Generar pase de abordar con los datos obtenidos
        .then((datos) => {
            return generarPaseAbordar(datos.pasaporte, datos.visa, datos.asiento);
        })

        // Se genera el pase de abordar
        .then((pase) => {
            return pase;
        })

        // Manejo de errores en cualquier etapa del proceso
        .catch((error) => {
            console.error(`Error: ${error}`);
            throw error;
        });

    return conTimeout(proceso, 4000);
};
