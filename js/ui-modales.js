// ==========================================
// UI & MODALES
// ==========================================
function abrirModalPerfil() { 
    document.getElementById('modal-perfil').classList.add('mostrar'); 
}

function cerrarModalPerfil() { 
    document.getElementById('modal-perfil').classList.remove('mostrar'); 
}

function toggleAcordeon(elemento) {
    if(elemento.classList.contains('activo')) elemento.classList.remove('activo');
    else elemento.classList.add('activo');
}

let mapaNegocioInstance;

function cerrarModalInfo() { 
    document.getElementById('modal-info-dinamico').classList.remove('mostrar'); 
    document.getElementById('contenedor-mini-mapa').classList.add('oculto');
}

function mostrarModalInfo(tipo, nombre, avatar, detalle, estrellas, extraTexto, coords) {
    document.getElementById('mod-info-nombre').innerHTML = nombre + ' <i class="fa-solid fa-circle-check" style="color: #f39c12;"></i>';
    document.getElementById('mod-info-avatar').src = avatar;
    document.getElementById('mod-info-estrellas').innerText = estrellas;
    document.getElementById('mod-info-trabajos').innerText = extraTexto;
    document.getElementById('mod-info-extra').innerHTML = detalle;
    
    const btn = document.getElementById('mod-info-btn');
    
    if(tipo === 'conductora') {
        document.getElementById('mod-info-label-extra').innerText = "Vehículo";
        document.getElementById('mod-info-resenas').innerHTML = `
            <div class="resena-caja"><strong>"Muy amable y respetuosa. Manejó con cuidado."</strong><br><span style="color:#999; font-size:0.75rem;">- Ana M.</span></div>
            <div class="resena-caja"><strong>"Llegó súper rápido y me ayudó con las bolsas."</strong><br><span style="color:#999; font-size:0.75rem;">- Carla S.</span></div>
            <div class="resena-caja"><strong>"Súper puntual y el auto olía muy rico. Me sentí muy a salvo. 5 estrellas."</strong><br><span style="color:#999; font-size:0.75rem;">- Valeria R.</span></div>`;
        btn.className = "btn-accion"; 
        btn.href = "#"; 
        btn.innerHTML = "Confirmar Viaje por " + coords; 
        btn.onclick = (e) => { 
            e.preventDefault(); 
            cerrarModalInfo(); 
            alert("¡Viaje confirmado! Tu conductora está en camino."); 
        };
    } 
    else if(tipo === 'trabajadora') {
        document.getElementById('mod-info-label-extra').innerText = "Especialidad";
        document.getElementById('mod-info-resenas').innerHTML = `<div class="resena-caja"><strong>"Hizo un excelente trabajo. Muy recomendada por el precio."</strong><br><span style="color:#999; font-size:0.75rem;">- Laura B.</span></div>`;
        btn.className = "btn-accion btn-llamar"; 
        btn.href = "tel:70012345"; 
        btn.innerHTML = "<i class='fa-solid fa-phone'></i> Llamar y Contratar"; 
        btn.onclick = null;
    }
    else if(tipo === 'negocio') {
        document.getElementById('mod-info-label-extra').innerText = "Servicios";
        document.getElementById('mod-info-resenas').innerHTML = `<div class="resena-caja"><strong>"Excelente atención, un lugar muy seguro e higiénico. Volveré."</strong><br><span style="color:#999; font-size:0.75rem;">- Patricia V.</span></div>`;
        btn.className = "btn-accion btn-llamar"; 
        btn.href = "tel:60098765"; 
        btn.innerHTML = "<i class='fa-solid fa-phone'></i> Ver Contacto"; 
        btn.onclick = null;

        document.getElementById('contenedor-mini-mapa').classList.remove('oculto');
        if(!mapaNegocioInstance) {
            mapaNegocioInstance = L.map('mapa-negocio').setView(coords, 16);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OS' }).addTo(mapaNegocioInstance);
        } else { 
            mapaNegocioInstance.setView(coords, 16); 
        }
        mapaNegocioInstance.eachLayer((layer) => { 
            if (layer instanceof L.Marker) mapaNegocioInstance.removeLayer(layer); 
        });
        L.marker(coords, {
            icon: L.divIcon({ 
                className: 'icono-marcador', 
                html: '<i class="fa-solid fa-location-dot" style="color: #e74c3c; font-size: 24px;"></i>', 
                iconSize: [24, 24] 
            })
        }).addTo(mapaNegocioInstance);
        setTimeout(() => { mapaNegocioInstance.invalidateSize(); }, 300);
    }
    document.getElementById('modal-info-dinamico').classList.add('mostrar');
}
