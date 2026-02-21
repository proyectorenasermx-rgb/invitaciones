let regaloSeleccionado = "";

function seleccionar(opcion) {
  const campoOpcion = document.getElementById("opcion");
  const campoDetalle = document.getElementById("detalle");
  
  regaloSeleccionado = opcion;
  campoOpcion.value = opcion;
  
  // Mostrar campo de detalle con animación
  campoDetalle.style.display = "block";
  campoDetalle.style.animation = "fadeUp 0.5s ease";
  campoDetalle.focus();
  
  // Mensaje tierno según la opción
  const mensajes = {
    'Dinero': '💰 ¡Gracias por contribuir a la fiesta!',
    'Ropa y accesorios': '👗 ¡Qué emoción, te encanta mi estilo!',
    'Comida': '🍰 ¡Compartamos un antojito!',
    'Viajes': '✈️ ¡Aventuras juntos!'
  };
  
  if (mensajes[opcion]) {
    alert(mensajes[opcion]);
  }
}

function enviarRegalo() {
  const opcion = document.getElementById("opcion").value;
  const detalle = document.getElementById("detalle").value;
  
  if (!opcion) {
    alert("💖 Por favor, selecciona una categoría de regalo");
    return;
  }
  
  if (!detalle) {
    alert("✨ Cuéntame más detalles de tu regalo...");
    document.getElementById("detalle").focus();
    return;
  }
  
  // Guardar en localStorage (por si acaso)
  const regaloInfo = {
    opcion: opcion,
    detalle: detalle,
    fecha: new Date().toLocaleString()
  };
  
  localStorage.setItem("ultimoRegalo", JSON.stringify(regaloInfo));
  
  // Mensaje tierno de confirmación
  alert(`¡Gracias preciosa! 💕 Tu regalo de ${opcion} será maravilloso. Te espero el 17 de Junio.`);
  
  // Redirigir o limpiar
  document.getElementById("opcion").value = "";
  document.getElementById("detalle").value = "";
  document.getElementById("detalle").style.display = "none";
}