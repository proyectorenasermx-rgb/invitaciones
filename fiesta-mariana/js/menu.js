// Menú hamburguesa con animaciones
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

// Cambiar icono según estado
function actualizarIcono() {
  if (menu.classList.contains('mostrar')) {
    menuToggle.innerHTML = '✕';  // Cerrar
    menuToggle.style.transform = 'rotate(90deg)';
  } else {
    menuToggle.innerHTML = '☀️';  // Abrir (solcito)
    menuToggle.style.transform = 'rotate(0deg)';
  }
}

// Toggle del menú
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('mostrar');
  actualizarIcono();
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('nav ul li a').forEach(enlace => {
  enlace.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      menu.classList.remove('mostrar');
      actualizarIcono();
    }
  });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
    menu.classList.remove('mostrar');
    actualizarIcono();
  }
});

// Manejar cambio de tamaño de ventana
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    menu.classList.remove('mostrar');
    menuToggle.innerHTML = '☀️';
    menuToggle.style.transform = 'rotate(0deg)';
  }
});

// Marcar el enlace activo según la página actual
function marcarActivo() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul li a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('activo');
    } else {
      link.classList.remove('activo');
    }
  });
}

// Ejecutar al cargar la página
marcarActivo();
