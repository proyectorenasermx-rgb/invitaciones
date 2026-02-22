// Fecha del evento: 17 de Junio 2026, 8:00 am
const fechaEvento = new Date("June 17, 2026 08:00:00").getTime();

function actualizarContador() {
  const ahora = new Date().getTime();
  const distancia = fechaEvento - ahora;

  if (distancia < 0) {
    document.getElementById("countdown").innerHTML = "¡HOY ES EL GRAN DÍA! 🎉";
    clearInterval(intervalo);
    return;
  }

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  // Formato bonito con emojis
  document.getElementById("countdown").innerHTML = `
    ${dias} días ${horas}h ${minutos}m ${segundos}s
  `;
}

const intervalo = setInterval(actualizarContador, 1000);
actualizarContador(); // Llamada inicial
