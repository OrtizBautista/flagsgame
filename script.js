const banderas = [

    // ===== AMÉRICA DEL NORTE =====
    { pais: "Canadá", imagen: "banderas/canada.png" },
    { pais: "Estados Unidos", imagen: "banderas/estados_unidos.png" },
    { pais: "México", imagen: "banderas/mexico.png" },

    // ===== AMÉRICA CENTRAL =====
    { pais: "Belice", imagen: "banderas/belice.png" },
    { pais: "Costa Rica", imagen: "banderas/costa_rica.png" },
    { pais: "El Salvador", imagen: "banderas/el_salvador.png" },
    { pais: "Guatemala", imagen: "banderas/guatemala.png" },
    { pais: "Honduras", imagen: "banderas/honduras.png" },
    { pais: "Nicaragua", imagen: "banderas/nicaragua.png" },
    { pais: "Panamá", imagen: "banderas/panama.png" },

    // ===== AMÉRICA DEL SUR =====
    { pais: "Argentina", imagen: "banderas/argentina.png" },
    { pais: "Bolivia", imagen: "banderas/bolivia.png" },
    { pais: "Brasil", imagen: "banderas/brasil.png" },
    { pais: "Chile", imagen: "banderas/chile.png" },
    { pais: "Colombia", imagen: "banderas/colombia.png" },
    { pais: "Ecuador", imagen: "banderas/ecuador.png" },
    { pais: "Guyana", imagen: "banderas/guyana.png" },
    { pais: "Paraguay", imagen: "banderas/paraguay.png" },
    { pais: "Perú", imagen: "banderas/peru.png" },
    { pais: "Surinam", imagen: "banderas/surinam.png" },
    { pais: "Uruguay", imagen: "banderas/uruguay.png" },
    { pais: "Venezuela", imagen: "banderas/venezuela.png" },

    // ===== CARIBE =====
    { pais: "Antigua y Barbuda", imagen: "banderas/antigua_y_barbuda.png" },
    { pais: "Bahamas", imagen: "banderas/bahamas.png" },
    { pais: "Barbados", imagen: "banderas/barbados.png" },
    { pais: "Cuba", imagen: "banderas/cuba.png" },
    { pais: "Dominica", imagen: "banderas/dominica.png" },
    { pais: "Granada", imagen: "banderas/granada.png" },
    { pais: "Haití", imagen: "banderas/haiti.png" },
    { pais: "Jamaica", imagen: "banderas/jamaica.png" },
    { pais: "República Dominicana", imagen: "banderas/republica_dominicana.png" },
    { pais: "San Cristóbal y Nieves", imagen: "banderas/san_cristobal_y_nieves.png" },
    { pais: "Santa Lucía", imagen: "banderas/santa_lucia.png" },
    { pais: "San Vicente y las Granadinas", imagen: "banderas/san_vicente_y_las_granadinas.png" },
    { pais: "Trinidad y Tobago", imagen: "banderas/trinidad_y_tobago.png" }

    

];

let puntos = 0;
let respuestaCorrecta = "";
let tiempo = 10;
let intervalo;
let banderasDisponibles = [];
let record = localStorage.getItem("record") || 0;

function mezclar(array) {
    return array.sort(() => Math.random() - 0.5);
}
function reiniciarBanderas() {
    banderasDisponibles = [...banderas];
    banderasDisponibles = mezclar(banderasDisponibles);
}

function nuevaPregunta() {

const progreso = document.getElementById("progresoTiempo");

progreso.style.transition = "none";
progreso.style.width = "100%";

setTimeout(() => {
    progreso.style.transition = "width 10s linear";
    progreso.style.width = "0%";
}, 10);

    document.getElementById("progresoTiempo").style.background =
    "linear-gradient(90deg, #4CAF50, #8BC34A)";

    clearInterval(intervalo);

    document.getElementById("bandera")
    .classList.remove("banderaFinal");
    
    const botones = [
        document.getElementById("op1"),
        document.getElementById("op2"),
        document.getElementById("op3"),
        document.getElementById("op4")
    ];

    botones.forEach(boton => {
        boton.classList.remove("correcto");
        boton.classList.remove("incorrecto");
        boton.classList.remove("correctoAnimado");
        boton.disabled = false;
    });

    document.getElementById("mensaje").innerHTML = "";
    document.getElementById("tiempo").classList.remove("peligro");

    const bandera = document.getElementById("bandera");
    bandera.classList.remove("errorAnimado");

    tiempo = 10;
    document.getElementById("tiempo").textContent = tiempo;

if (banderasDisponibles.length === 0) {
    reiniciarBanderas();
}

const correcta = banderasDisponibles.pop();


    respuestaCorrecta = correcta.pais;

    document.getElementById("bandera").src =
        correcta.imagen;

    bandera.classList.remove("banderaAnimada");
    void bandera.offsetWidth;
    bandera.classList.add("banderaAnimada");

    let opciones = [correcta.pais];

    while (opciones.length < 4) {

        let paisAleatorio =
            banderas[Math.floor(Math.random() * banderas.length)].pais;

        if (!opciones.includes(paisAleatorio)) {
            opciones.push(paisAleatorio);
        }
    }

    opciones = mezclar(opciones);

    document.getElementById("op1").textContent = opciones[0];
    document.getElementById("op2").textContent = opciones[1];
    document.getElementById("op3").textContent = opciones[2];
    document.getElementById("op4").textContent = opciones[3];

    iniciarTemporizador();
}

function iniciarTemporizador() {

    intervalo = setInterval(() => {

        tiempo--;

        document.getElementById("tiempo").textContent = tiempo;

        if (tiempo <= 3) {
            document
            
                .getElementById("tiempo")
                .classList.add("peligro");
                document.getElementById("progresoTiempo").style.background =
                "#f44336";
        }

        if (tiempo <= 0) {

            clearInterval(intervalo);
            document.getElementById("progresoTiempo").style.width = "0%";
            terminarJuego(
                "⏰ Se acabó el tiempo<br>🏆 Puntaje final: " + puntos
            );
        }

    }, 1000);
}

function verificarRespuesta(respuesta) {

    clearInterval(intervalo);

    const botones = [
        document.getElementById("op1"),
        document.getElementById("op2"),
        document.getElementById("op3"),
        document.getElementById("op4")
    ];

    if (respuesta === respuestaCorrecta) {

    puntos++;

    document.getElementById("puntos").textContent = puntos;

    if (puntos > record) {

        record = puntos;

        localStorage.setItem("record", record);

        document.getElementById("record").textContent = record;
}

        const botonCorrecto = botones.find(
            b => b.textContent === respuestaCorrecta
        );

        botonCorrecto.classList.add("correcto");
        botonCorrecto.classList.add("correctoAnimado");

        botones.forEach(b => b.disabled = true);

        setTimeout(() => {
            nuevaPregunta();
        }, 700);

    } else {

        botones.forEach(boton => {

            if (boton.textContent === respuestaCorrecta) {
                boton.classList.add("correcto");
            }

            if (boton.textContent === respuesta) {
                boton.classList.add("incorrecto");
            }

            boton.disabled = true;
        });

        document
            .getElementById("bandera")
            .classList.add("errorAnimado");

        terminarJuego(
            "❌ Incorrecto<br>La respuesta era: " +
            respuestaCorrecta +
            "<br>🏆 Puntaje final: " + puntos
        );
    }
}

function terminarJuego(mensajeFinal) {

    document.getElementById("reiniciar").style.display =
        "inline-block";

    let mensajeRecord = "";

    if (puntos == record && puntos > 0) {
        mensajeRecord = "<br>🎉 ¡Nuevo récord!";
    }

    document.getElementById("mensaje").innerHTML =
        mensajeFinal + mensajeRecord;

    document.querySelector(".info").style.display = "none";

    document.getElementById("bandera")
        .classList.add("banderaFinal");
}

document.getElementById("op1").addEventListener("click", () => {
    verificarRespuesta(document.getElementById("op1").textContent);
});

document.getElementById("op2").addEventListener("click", () => {
    verificarRespuesta(document.getElementById("op2").textContent);
});

document.getElementById("op3").addEventListener("click", () => {
    verificarRespuesta(document.getElementById("op3").textContent);
});

document.getElementById("op4").addEventListener("click", () => {
    verificarRespuesta(document.getElementById("op4").textContent);
});

document.getElementById("reiniciar").addEventListener("click", () => {
    location.reload();
});

console.log("Cantidad de países:", banderas.length);
document.getElementById("record").textContent = record;
reiniciarBanderas();
nuevaPregunta();