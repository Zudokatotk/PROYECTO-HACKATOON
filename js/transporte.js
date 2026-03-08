// ==========================================
// TRANSPORTE
// ==========================================

let mapaTransporte;

function solicitarTransporte() {
    const destino = document.getElementById('input-destino').value;
    
    if(destino.trim() === '') { 
        alert('Por favor, ingresa a dónde quieres ir.'); 
        return; 
    }
    
    document.getElementById('formulario-transporte').style.display = 'none'; 
    document.getElementById('resultados-transporte').style.display = 'block';
    
    if(!mapaTransporte) {
        mapaTransporte = L.map('mapa-transporte').setView(coordActuales, 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
            attribution: '© OpenStreetMap' 
        }).addTo(mapaTransporte);
        
        // Marcador de origen
        L.marker(coordActuales, { 
            icon: L.divIcon({ 
                className: 'icono-marcador', 
                html: '<i class="fa-solid fa-person-dress" style="color: #8e44ad; font-size: 24px;"></i>', 
                iconSize: [24, 24] 
            }) 
        }).addTo(mapaTransporte);
        
        // Marcador de destino
        let destinoCoord = [-19.0350, -65.2500]; 
        L.marker(destinoCoord, { 
            icon: L.divIcon({ 
                className: 'icono-marcador', 
                html: '<i class="fa-solid fa-location-dot" style="color: #e74c3c; font-size: 24px;"></i>', 
                iconSize: [24, 24] 
            }) 
        }).addTo(mapaTransporte);
        
        // Línea de ruta
        L.polyline([coordActuales, [-19.0400, -65.2550], destinoCoord], {
            color: '#9b59b6', 
            weight: 4, 
            dashArray: '10, 10'
        }).addTo(mapaTransporte);
    }
    
    setTimeout(() => { mapaTransporte.invalidateSize(); }, 100);
    
    // Renderizar lista de conductoras
    const contenedor = document.getElementById('lista-conductoras'); 
    contenedor.innerHTML = '';
    
    const conductoras = [
        { 
            nombre: "Elena Rojas", 
            auto: "Toyota Corolla Blanco • 2839-XYZ", 
            precio: "Bs. 15", 
            tiempo: "3 min", 
            avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140040.png" 
        },
        { 
            nombre: "Carmen M.", 
            auto: "Suzuki Swift Plata • 4421-ABC", 
            precio: "Bs. 18", 
            tiempo: "5 min", 
            avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140042.png" 
        }
    ];
    
    conductoras.forEach(c => {
        contenedor.innerHTML += `
            <div class="tarjeta-conductora" onclick="mostrarModalInfo('conductora', '${c.nombre}', '${c.avatar}', '<i class=\\'fa-solid fa-car\\'></i> ${c.auto}', '4.9', '(120 viajes)', '${c.precio}')">
                <img src="${c.avatar}" class="avatar-conductora">
                <div class="info-conductora">
                    <div class="nombre-conductora">${c.nombre} <i class="fa-solid fa-circle-check" style="color: #f39c12;"></i></div>
                    <div class="auto-conductora"><i class="fa-solid fa-car"></i> ${c.auto}</div>
                    <div style="font-size: 0.8rem; color: #888; margin-top: 3px;">
                        <i class="fa-solid fa-clock"></i> Llegada en ${c.tiempo}
                    </div>
                </div>
                <div class="precio-conductora">${c.precio}</div>
            </div>`;
    });
}

function cancelarTransporte() { 
    document.getElementById('resultados-transporte').style.display = 'none'; 
    document.getElementById('formulario-transporte').style.display = 'block'; 
    document.getElementById('input-destino').value = ''; 
}
