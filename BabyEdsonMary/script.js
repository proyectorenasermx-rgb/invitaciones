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
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbyGMrtlVuumCTWYga6rqb96U7erfKx-1j9Pn5-UJr3Ift4KldxBnBZyIwqgNZyLFPw2/exec";

if (formulario) {
    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        if (enviando) return; // 🚫 evita doble envío

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

        fetch(URL_SCRIPT, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: document.getElementById("nombre")?.value,
                telefono: document.getElementById("telefono")?.value,
                asistencia: asistenciaSeleccionada,
                regalos: regalosSeleccionados.join(", ")
            })
        })
        .then(() => {

            // 🎬 animación rápida
            formulario.classList.add("cerrar-form");

            setTimeout(() => {
                formulario.classList.add("oculto");

                // 🎉 mensaje
                if (mensaje) {
                    mensaje.classList.remove("oculto");
                }

                // 🔄 limpiar estado
                formulario.reset();
                regalosSeleccionados = [];
                asistenciaSeleccionada = "";

                regalos.forEach(r => r.classList.remove("seleccionado"));
                botonesAsistencia.forEach(b => b.classList.remove("activo"));

                // 🔁 permitir otro envío después de unos segundos
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

                }, 2500); // 🔥 tiempo más corto y controlado

            }, 300); // 🔥 animación más rápida

        });
    });
}

let enviando = false;
// =====================
// CUENTA REGRESIVA
// =====================
const fechaEvento = new Date("2026-05-16T14:00:00").getTime();

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
