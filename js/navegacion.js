// ==========================================
// PERMISOS Y NAVEGACIÓN
// ==========================================

let ubicacionConcedida = false; 
let vistaPendiente = 'mapa'; 

function concederUbicacion(event) {
    event.target.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Obteniendo...'; 
    event.target.disabled = true;
    
    setTimeout(() => { 
        ubicacionConcedida = true; 
        if (!miMapa) inicializarMapa(); 
        cambiarVista(vistaPendiente, document.getElementById('nav-' + vistaPendiente)); 
    }, 1000);
}

function cambiarVista(nombreVista, elementoNav) {
    if ((nombreVista === 'mapa' || nombreVista === 'transporte') && !ubicacionConcedida) { 
        vistaPendiente = nombreVista; 
        nombreVista = 'permiso'; 
    }
    
    document.querySelectorAll('.vista').forEach(v => v.classList.remove('activa'));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('activo'));
    document.getElementById('vista-' + nombreVista).classList.add('activa');
    if (elementoNav) elementoNav.classList.add('activo');
    
    if(nombreVista === 'comunidad') { 
        cerrarSubvistaForo();
        inicializarVistaComunidad();
    }
    if(nombreVista === 'servicios') { 
        cerrarSubvistaServicio(); 
    }
    if(nombreVista === 'mapa' && miMapa) { 
        setTimeout(() => { miMapa.invalidateSize(); }, 100); 
    }
    if(nombreVista === 'transporte' && mapaTransporte && document.getElementById('resultados-transporte').style.display === 'block') { 
        setTimeout(() => { mapaTransporte.invalidateSize(); }, 100); 
    }
    if(nombreVista === 'configuracion') { 
        setTimeout(() => { 
            if(!mapaGeocercaInstance) inicializarMapaGeocerca(); 
            else mapaGeocercaInstance.invalidateSize(); 
        }, 100); 
    }
}

// ==========================================
// INICIALIZACIÓN
// ==========================================
// La inicialización ahora se maneja en cargar-vistas.js
// después de que todas las vistas HTML estén cargadas
