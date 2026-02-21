let pasoActual = 0;
const pasos = document.querySelectorAll(".paso");

const respuestas = {
  asistira: "",
  eventos: [],
  nombre: "",
  telefono: "",
  correo: ""
};

// Mostrar primer paso
pasos[0].style.display = "block";

function siguiente() {
  // Validar según el paso actual
  if (pasoActual === 0 && !respuestas.asistira) {
    alert("💕 ¿Vas a venir? Selecciona Sí o No");
    return;
  }
  
  if (pasoActual === 1 && respuestas.eventos.length === 0) {
    alert("✨ Selecciona al menos un evento");
    return;
  }
  
  // Ocultar paso actual y mostrar siguiente
  pasos[pasoActual].style.display = "none";
  pasoActual++;
  
  if (pasos[pasoActual]) {
    pasos[pasoActual].style.display = "block";
  }
}

function asistir(valor) {
  respuestas.asistira = valor;
  
  // Feedback visual
  const botones = pasos[0].querySelectorAll("button");
  botones.forEach(btn => {
    btn.style.background = "rgba(255,255,255,0.25)";
    btn.style.color = "var(--blanco)";
  });
  
  event.target.style.background = "var(--blanco)";
  event.target.style.color = "var(--rosa-principal)";
  
  if (valor === "No") {
    // Si dice que no, saltamos a datos de contacto
    setTimeout(() => {
      pasos[0].style.display = "none";
      pasos[1].style.display = "none";
      pasoActual = 2;
      pasos[2].style.display = "block";
    }, 500);
  }
}

function evento(nombre) {
  if (!respuestas.eventos.includes(nombre)) {
    respuestas.eventos.push(nombre);
    event.target.style.background = "var(--blanco)";
    event.target.style.color = "var(--rosa-principal)";
  } else {
    // Si ya está, lo quitamos
    const index = respuestas.eventos.indexOf(nombre);
    respuestas.eventos.splice(index, 1);
    event.target.style.background = "rgba(255,255,255,0.25)";
    event.target.style.color = "var(--blanco)";
  }
}

function enviar() {
  respuestas.nombre = document.getElementById("nombre").value;
  respuestas.telefono = document.getElementById("telefono").value;
  respuestas.correo = document.getElementById("correo").value;
  
  // Validaciones
  if (!respuestas.nombre) {
    alert("🌸 ¿Cómo te llamas?");
    return;
  }
  
  if (!respuestas.telefono || respuestas.telefono.length < 10) {
    alert("📱 Déjame tu teléfono (10 dígitos)");
    return;
  }
  
  if (!respuestas.correo || !respuestas.correo.includes("@")) {
    alert("📧 Correo electrónico válido, por favor");
    return;
  }
  
  // Guardar en localStorage
  localStorage.setItem("rsvp_" + respuestas.nombre, JSON.stringify(respuestas));
  
  // Mensaje personalizado
  let mensaje = "";
  if (respuestas.asistira === "Sí") {
    mensaje = `¡Gracias ${respuestas.nombre}! 💖 Te espero el 17 de Junio.`;
  } else {
    mensaje = `Qué pena que no puedas venir ${respuestas.nombre}, ¡otra vez será! 💕`;
  }
  
  alert(mensaje);
  
  // Redirección
  window.location.href = "gracias.html";
}