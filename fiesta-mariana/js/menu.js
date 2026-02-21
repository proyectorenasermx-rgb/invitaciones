// Crear botón hamburguesa
const nav = document.querySelector("nav");
const menu = document.querySelector("nav ul");
const botonMenu = document.createElement("button");

botonMenu.id = "menu-toggle";
botonMenu.innerHTML = "☀️"; // Corazón o lo que quieras
botonMenu.setAttribute("aria-label", "Menú");

nav.insertBefore(botonMenu, nav.firstChild);

// Toggle menú
botonMenu.addEventListener("click", () => {
  menu.classList.toggle("mostrar");
  
  // Cambiar icono
  if (menu.classList.contains("mostrar")) {
    botonMenu.innerHTML = "✕";
  } else {
    botonMenu.innerHTML = "☀️";
  }
});

// Cerrar menú al hacer click en un enlace (móvil)
document.querySelectorAll("nav a").forEach(enlace => {
  enlace.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      menu.classList.remove("mostrar");
      botonMenu.innerHTML = "☀️";
    }
  });
});