// Referecia de función: https://medium.com/@randomstr/generating-random-strings-in-javascript-and-its-frameworks-118cb1c9cba7
function generateRandomString() {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  result += characters.charAt(Math.floor(Math.random() * charactersLength));
  result += characters.charAt(Math.floor(Math.random() * charactersLength));
  result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return result;
}

const validarPasaporte = (id) => {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (id % 2 == 0) {
        reject("El id es inválido");
      } else {
        resolve("El id es válido");
      }
    }, 1500);
  });
};

// Referencias de Math.random(): https://www.w3schools.com/Js/js_random.asp
const verificarRestriccionesVisa = (id) => {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
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
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const randomString = generateRandomString();
      resolve(randomString);
    }, 1000);
  });
};

const generarPaseAbordar = (pasaporte, visa, asiento) => {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve({ pasaporte, visa, asiento });
    }, 500);
  });
};

const conTimeout = (promesa, ms) =>
  Promise.race([
    promesa,
    new Promise((_, reject) =>
      setTimeout(() => reject("Tiempo de espera agotado"), ms),
    ),
  ]);

const iniciarCheckIn = (pasajeroId) => {
  const proceso = Promise.all([
    validarPasaporte(pasajeroId).then((resultado) => {
      return resultado;
    }),
    verificarRestriccionesVisa(pasajeroId).then((resultado) => {
      return resultado;
    }),
  ])

    .then(([pasaporte, visa]) => {
      return asignarAsiento().then((asiento) => ({
        pasajeroId,
        pasaporte,
        visa,
        asiento,
      }));
    })

    .then((datos) => {
      return generarPaseAbordar(datos.pasaporte, datos.visa, datos.asiento);
    })

    .then((pase) => {
      return pase;
    })

    .catch((error) => {
      console.error(`Error: ${error}`);
      throw error;
    });

  return conTimeout(proceso, 4000);
};

const validarID = () => {
  const id = document.getElementById("input-id").value;
  const boton = document.getElementById("button-id");
  const logs = document.getElementById("logs-id");
  const passport = document.getElementById("passport-info");
  passport.style.display = "none";
  logs.innerHTML = ``;
  passport.innerHTML = `<h1>✈️ Información del vuelo</h1>`;
  boton.disable = true;
  logs.style.marginTop = "2rem";
  logs.innerHTML += `<p>Iniciando validaciones</p>`;
  boton.innerText = "Cargando...";

  iniciarCheckIn(id)
    .then((resultado) => {
      logs.innerHTML = `<p>¡Pasaporte validado!</p>`;
      passport.innerHTML += `<p>Asiento ${resultado.asiento}</p>`;
      passport.style.display = "flex";
    })
    .catch((error) => {
      logs.innerHTML += `<p>${error}</p>`;
      boton.disable = false;
      boton.innerText = "Validar";
    })
    .finally(() => {
      boton.disable = false;
      boton.innerText = "Validar";
    });
};
