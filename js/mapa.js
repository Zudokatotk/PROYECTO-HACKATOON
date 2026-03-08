// ==========================================
// MAPA Y ALERTAS
// ==========================================

let miMapa;
let marcadorUsuaria;

function inicializarMapa() {
    miMapa = L.map('mapa-interactivo').setView(coordActuales, 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        attribution: '© OpenStreetMap' 
    }).addTo(miMapa);
    
    const htmlMarcador = `<div class="contenedor-marcador-usuaria"><i class="fa-solid fa-person-dress icono-marcador-usuaria"></i></div>`;
    const iconoUsuaria = L.divIcon({ 
        className: 'icono-marcador', 
        html: htmlMarcador, 
        iconSize: [45, 45], 
        iconAnchor: [22, 45] 
    });
    
    marcadorUsuaria = L.marker(coordActuales, {icon: iconoUsuaria})
        .addTo(miMapa)
        .bindPopup("<b>Estás aquí</b>")
        .openPopup();
    
    renderizarDatosCoordinados();
}

function renderizarDatosCoordinados() {
    const contSeguros = document.getElementById('contenedor-puntos-seguros');
    const contAlertas = document.getElementById('contenedor-alertas');
    contSeguros.innerHTML = ''; 
    contAlertas.innerHTML = '';

    datosSeguros.forEach(punto => {
        let li = document.createElement('li'); 
        li.className = 'item-interactivo';
        li.onclick = () => miMapa.flyTo([punto.lat, punto.lng], 17, { duration: 1.5 });
        li.innerHTML = `<i class="fa-solid fa-map-pin pin-rosado"></i> ${punto.nombre} a ${punto.distancia}`;
        contSeguros.appendChild(li);
    });

    datosAlertas.forEach(alerta => {
        let check = alerta.verificada ? `<i class="fa-solid fa-circle-check" style="color: #f39c12;" title="Verificada"></i>` : '';
        let div = document.createElement('div'); 
        div.className = 'burbuja-comunidad burbuja-alerta item-interactivo';
        div.onclick = () => miMapa.flyTo([alerta.lat, alerta.lng], 17, { duration: 1.5 });
        div.innerHTML = `<div class="alerta-header"><img src="${alerta.avatar}" class="avatar-mini"><strong>${alerta.nombre} ${check}</strong><span class="tiempo">${alerta.tiempo}</span></div><p class="alerta-texto-comunidad">${alerta.texto}</p>`;
        contAlertas.appendChild(div);
    });
}

function publicarAlerta() {
    const texto = document.getElementById('texto-nueva-alerta').value.trim();
    const esAnonimo = document.getElementById('check-anonimo-alerta').checked;
    
    if (texto === '') { 
        alert('Escribe lo que sucede.'); 
        return; 
    }
    
    datosAlertas.unshift({
        nombre: esAnonimo ? "Usuaria Anónima" : "Valeria Gómez", 
        verificada: true, 
        avatar: esAnonimo ? "https://cdn-icons-png.flaticon.com/512/847/847969.png" : "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
        tiempo: "Justo ahora", 
        texto: texto, 
        lat: coordActuales[0], 
        lng: coordActuales[1]
    });
    
    document.getElementById('texto-nueva-alerta').value = ''; 
    document.getElementById('check-anonimo-alerta').checked = false;
    renderizarDatosCoordinados(); 
    alert('Tu alerta ha sido publicada en el mapa.');
}

let pasoSimulacion = 0;

function simularAvance() {
    if(!miMapa) return; 
    pasoSimulacion++;
    
    if(pasoSimulacion === 1) {
        coordActuales = [-19.0435, -65.2615]; 
        marcadorUsuaria.setLatLng(coordActuales); 
        miMapa.panTo(coordActuales); 
        datosSeguros = [
            { nombre: "Hospital Santa Bárbara", distancia: "80m", lat: -19.0430, lng: -65.2610 }, 
            { nombre: "Tienda 'El Sol'", distancia: "120m", lat: -19.0445, lng: -65.2618 }, 
            { nombre: "Centro Médico", distancia: "300m", lat: -19.0410, lng: -65.2630 }
        ];
        renderizarDatosCoordinados();
    } else if (pasoSimulacion === 2) {
        coordActuales = [-19.0440, -65.2640]; 
        marcadorUsuaria.setLatLng(coordActuales); 
        miMapa.panTo(coordActuales);
        datosSeguros = [
            { nombre: "Estación de Policía", distancia: "50m", lat: -19.0442, lng: -65.2635 }, 
            { nombre: "Supermercado SAS", distancia: "200m", lat: -19.0425, lng: -65.2650 }, 
            { nombre: "Parada Taxis Seguros", distancia: "250m", lat: -19.0450, lng: -65.2660 }
        ];
        renderizarDatosCoordinados(); 
        pasoSimulacion = 0;
    }
}
