// ==========================================
// CARGADOR DE VISTAS HTML
// ==========================================

async function cargarVista(archivo, contenedorId) {
    try {
        const response = await fetch(archivo);
        const html = await response.text();
        document.getElementById(contenedorId).innerHTML += html;
    } catch (error) {
        console.error(`Error cargando ${archivo}:`, error);
    }
}

async function cargarTodasLasVistas() {
    const contenedorVistas = 'contenido-vistas';
    const contenedorModales = 'contenedor-modales';
    
    // Cargar modales
    await cargarVista('html/modales.html', contenedorModales);
    await cargarVista('html/modal-alerta.html', contenedorModales);
    
    // Cargar vistas
    await cargarVista('html/vista-permiso.html', contenedorVistas);
    await cargarVista('html/vista-mapa.html', contenedorVistas);
    await cargarVista('html/vista-transporte.html', contenedorVistas);
    await cargarVista('html/vista-servicios.html', contenedorVistas);
    await cargarVista('html/vista-comunidad.html', contenedorVistas);
    await cargarVista('html/vista-configuracion.html', contenedorVistas);
    
    // Inicializar después de cargar todas las vistas
    generarCalendarioReal(); 
    renderizarChat();
}

// Cargar vistas cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarTodasLasVistas);
} else {
    cargarTodasLasVistas();
}
