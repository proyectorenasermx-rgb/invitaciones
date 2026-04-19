document.addEventListener("DOMContentLoaded", function () {

// =====================
// MÚSICA
// =====================
const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");

function iniciarMusica(e) {
    if (e.target.id === "btnMusica") return;

    if (musica && musica.paused) {
        musica.play().then(() => {
            if (btnMusica) {
                btnMusica.textContent = "⏸️ Pausar música";
            }
        }).catch(() => {});
    }
}

document.addEventListener("touchstart", iniciarMusica, { once: true });
document.addEventListener("click", iniciarMusica, { once: true });

if (musica && btnMusica) {
    btnMusica.addEventListener("click", () => {
        if (musica.paused) {
            musica.play();
            btnMusica.textContent = "⏸️ Pausar música";
        } else {
            musica.pause();
            btnMusica.textContent = "▶️ Reproducir música";
        }
    });
}

// =====================
// FORMULARIO
// =====================
const btnFormulario = document.getElementById("btnFormulario");
const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensajeGracias");

if (btnFormulario && formulario) {
    btnFormulario.addEventListener("click", () => {
        formulario.classList.toggle("oculto");
    });
}

// =====================
// REGALOS
// =====================
let regalosSeleccionados = [];
const regalos = document.querySelectorAll(".regalos li");

regalos.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("seleccionado");

        const texto = item.textContent.trim();

        if (regalosSeleccionados.includes(texto)) {
            regalosSeleccionados = regalosSeleccionados.filter(r => r !== texto);
        } else {
            regalosSeleccionados.push(texto);
        }
    });
});

const inputAdultos = document.getElementById("ACOMPAÑANTES_ADULTOS");
const inputInfantiles = document.getElementById("ACOMPAÑANTES_INFANTILES");
const errorBoletos = document.getElementById("errorBoletos");
const btnEnviar = document.getElementById("btnEnviar");

function validarBoletos() {
    const adultos = parseInt(inputAdultos?.value || "0");
    const infantiles = parseInt(inputInfantiles?.value || "0");

    if (adultos === 0 && infantiles === 0) {
        if (errorBoletos) errorBoletos.style.display = "block";
        if (btnEnviar) btnEnviar.disabled = true;
    } else {
        if (errorBoletos) errorBoletos.style.display = "none";
        if (btnEnviar) btnEnviar.disabled = false;
    }
}

// 👇 escuchar cambios en tiempo real
if (inputAdultos) inputAdultos.addEventListener("input", validarBoletos);
if (inputInfantiles) inputInfantiles.addEventListener("input", validarBoletos);

// 👇 ejecutar al cargar
validarBoletos();

// =====================
// ASISTENCIA
// =====================
let asistenciaSeleccionada = "";
const botonesAsistencia = document.querySelectorAll(".btn-asistencia");

botonesAsistencia.forEach(btn => {
    btn.addEventListener("click", () => {
        botonesAsistencia.forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");
        asistenciaSeleccionada = btn.dataset.valor;
    });
});

// =====================
// ENVIAR FORMULARIO
// =====================
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbz7eWts4T0uHLa17fKOYg1vW3C15EIWGcq4f21L4NHa7l44T6OidNAmRiQgGGOXb6yR/exec"



if (formulario) {
    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        if (enviando) return; // 🚫 evita doble envío

        const adultos = parseInt(document.getElementById("ACOMPAÑANTES_ADULTOS")?.value || "0");
        const infantiles = parseInt(document.getElementById("ACOMPAÑANTES_INFANTILES")?.value || "0");

        // 🚫 Validación: al menos un boleto
        if (adultos === 0 && infantiles === 0) {
            alert("Debes seleccionar al menos un boleto (adulto o infantil)");
            return;
        }

        // 🚫 Validación: no negativos
        if (adultos < 0 || infantiles < 0) {
            alert("Los boletos no pueden ser negativos");
            return;
        }

        // 🚫 Validación: asistencia
        if (!asistenciaSeleccionada) {
            alert("Selecciona Sí o No");
            return;
        }

        enviando = true; // 🔒 bloquea

        const botonEnviar = formulario.querySelector("button[type='submit']");
        if (botonEnviar) {
            botonEnviar.textContent = "Enviando...";
            botonEnviar.disabled = true;
        }

        const datos = new URLSearchParams({
            nombre: document.getElementById("nombre")?.value,
            telefono: document.getElementById("telefono")?.value,
            adultos: adultos,
            infantiles: infantiles,
            asistencia: asistenciaSeleccionada,
            regalos: regalosSeleccionados.join(", ")
        });

        fetch(URL_SCRIPT, {
            method: "POST",
            body: datos
        })
        .then(() => {

            formulario.classList.add("cerrar-form");

            setTimeout(() => {
                formulario.classList.add("oculto");

                if (mensaje) {
                    mensaje.classList.remove("oculto");
                }

                formulario.reset();
                regalosSeleccionados = [];
                asistenciaSeleccionada = "";

                // 🔄 reset visual de boletos
                document.getElementById("ACOMPAÑANTES_ADULTOS").value = 0;
                document.getElementById("ACOMPAÑANTES_INFANTILES").value = 0;

                regalos.forEach(r => r.classList.remove("seleccionado"));
                botonesAsistencia.forEach(b => b.classList.remove("activo"));

                setTimeout(() => {
                    enviando = false;

                    if (botonEnviar) {
                        botonEnviar.textContent = "ENVIAR CONFIRMACIÓN";
                        botonEnviar.disabled = false;
                    }

                    if (btnFormulario) {
                        btnFormulario.textContent = "Registro de asistencia correcto";
                        btnFormulario.style.display = "block";
                    }

                    if (mensaje) {
                        mensaje.classList.add("oculto");
                    }

                }, 2500);

            }, 300);

        });
    });
}



let enviando = false;
// =====================
// CUENTA REGRESIVA
// =====================
const fechaEvento = new Date("2026-05-16T13:00:00").getTime();

setInterval(() => {
    const ahora = Date.now();
    const d = fechaEvento - ahora;
    if (d <= 0) return;

    const dias = Math.floor(d / (1000 * 60 * 60 * 24));
    const horas = Math.floor((d / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((d / (1000 * 60)) % 60);
    const segundos = Math.floor((d / 1000) % 60);

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;

}, 1000);

// =====================
// CUENTA REGRESIVA 2
// =====================
const fechaEvento2 = new Date("2026-05-17T13:00:00").getTime();

setInterval(() => {
    const ahora = Date.now();
    const d = fechaEvento2 - ahora;
    if (d <= 0) return;

    const dias = Math.floor(d / (1000 * 60 * 60 * 24));
    const horas = Math.floor((d / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((d / (1000 * 60)) % 60);
    const segundos = Math.floor((d / 1000) % 60);

    document.getElementById("dias2").textContent = dias;
    document.getElementById("horas2").textContent = horas;
    document.getElementById("minutos2").textContent = minutos;
    document.getElementById("segundos2").textContent = segundos;

}, 1000);
    
// =====================
// 🌿 LLUVIA DE HOJAS
// =====================
const contenedor = document.querySelector(".lluvia-hojas");

if (contenedor) {
    for (let i = 0; i < 40; i++) {

        let hoja = document.createElement("img");

        let hojas = ["hoja1.png", "hoja2.png", "hoja3.png"];
        hoja.src = "./Imagenes/" + hojas[Math.floor(Math.random() * hojas.length)];

        hoja.classList.add("hoja-lluvia");

        hoja.style.left = (Math.random() * 120 - 10) + "vw";

        let size = 30 + Math.random() * 120;
        hoja.style.width = size + "px";

        hoja.style.animationDuration = (6 + Math.random() * 10) + "s";
        hoja.style.animationDelay = Math.random() * 10 + "s";
        hoja.style.opacity = 0.3 + Math.random() * 0.5;

        contenedor.appendChild(hoja);
    }
}


});


