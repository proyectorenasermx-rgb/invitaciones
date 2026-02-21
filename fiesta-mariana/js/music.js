const musica = document.getElementById("musica");
const toggleBtn = document.getElementById("toggle-music");
const volUpBtn = document.getElementById("volume-up");
const volDownBtn = document.getElementById("volume-down");

// Configuración inicial
if (musica) {
  musica.volume = 0.5; // Volumen inicial al 50%
  
  // Intentar reproducir automáticamente (los navegadores lo bloquean a veces)
  const playPromise = musica.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay bloqueado, mostramos mensaje al usuario
      toggleBtn.textContent = "🔇 Click para música";
    });
  }
}

// Recuperar estado del localStorage
const musicaEstado = localStorage.getItem("musicaEstado");
const musicaVolumen = localStorage.getItem("musicaVolumen");

if (musicaEstado === "paused") {
  musica.pause();
  toggleBtn.textContent = "🔇 Música pausada";
} else if (musicaEstado === "playing") {
  musica.play();
  toggleBtn.textContent = "🎵 Reproduciendo";
}

if (musicaVolumen) {
  musica.volume = parseFloat(musicaVolumen);
}

// Pausar/Reproducir
toggleBtn.addEventListener("click", () => {
  if (musica.paused) {
    musica.play();
    toggleBtn.textContent = "🎵 Reproduciendo";
    localStorage.setItem("musicaEstado", "playing");
  } else {
    musica.pause();
    toggleBtn.textContent = "🔇 Música pausada";
    localStorage.setItem("musicaEstado", "paused");
  }
});

// Subir Volumen
volUpBtn.addEventListener("click", () => {
  musica.volume = Math.min(musica.volume + 0.1, 1);
  localStorage.setItem("musicaVolumen", musica.volume);
  mostrarVolumen();
});

// Bajar Volumen
volDownBtn.addEventListener("click", () => {
  musica.volume = Math.max(musica.volume - 0.1, 0);
  localStorage.setItem("musicaVolumen", musica.volume);
  mostrarVolumen();
});

// Mostrar volumen actual (feedback visual)
function mostrarVolumen() {
  const volumen = Math.round(musica.volume * 100);
  console.log(`Volumen: ${volumen}%`);
}