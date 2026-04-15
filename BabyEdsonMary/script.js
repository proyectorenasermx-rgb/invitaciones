document.addEventListener("DOMContentLoaded", function () {

    // =====================
    // MÚSICA
    // =====================
    const musica = document.getElementById("musica");
    const btnMusica = document.getElementById("btnMusica");

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

        // 🔥 AUTO PLAY AL PRIMER TOQUE (sin conflicto)
        document.addEventListener("click", function (e) {

            if (e.target.id === "btnMusica") return;

            if (musica.paused) {
                musica.play().then(() => {
                    btnMusica.textContent = "⏸️ Pausar música";
                }).catch(() => {});
            }

        }, { once: true });

    }

    // =====================
    // FORMULARIO
    // =====================
    const btnFormulario = document.getElementById("btnFormulario");
    const formulario = document.getElementById("formulario");

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

            if (!asistenciaSeleccionada) {
                alert("Selecciona Sí o No");
                return;
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
                alert("¡Confirmación enviada! 💕");

                formulario.reset();
                formulario.classList.add("oculto");

                regalosSeleccionados = [];
                asistenciaSeleccionada = "";

                regalos.forEach(r => r.classList.remove("seleccionado"));
                botonesAsistencia.forEach(b => b.classList.remove("activo"));

                if (btnFormulario) {
                    btnFormulario.textContent = "Enviar otra asistencia";
                }
            });
        });
    }

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

});
