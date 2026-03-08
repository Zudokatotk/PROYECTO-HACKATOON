// ==========================================
// CONFIGURACIÓN Y RUTINAS GEOCERCA CON MAPA
// ==========================================

let mapaGeocercaInstance;
let marcadorGeocerca;
let circuloGeocerca;

function inicializarMapaGeocerca() {
    if(!mapaGeocercaInstance) {
        mapaGeocercaInstance = L.map('mapa-geocerca').setView(coordActuales, 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
            attribution: '© OS' 
        }).addTo(mapaGeocercaInstance);
        
        mapaGeocercaInstance.on('click', function(e) {
            if(marcadorGeocerca) {
                marcadorGeocerca.setLatLng(e.latlng);
                circuloGeocerca.setLatLng(e.latlng);
            } else {
                const iconGeocerca = L.divIcon({ 
                    className: 'icono-marcador', 
                    html: '<i class="fa-solid fa-location-crosshairs" style="color: #e74c3c; font-size: 24px;"></i>', 
                    iconSize: [24, 24] 
                });
                marcadorGeocerca = L.marker(e.latlng, {icon: iconGeocerca}).addTo(mapaGeocercaInstance);
                circuloGeocerca = L.circle(e.latlng, {
                    color: '#e74c3c', 
                    fillColor: '#e74c3c', 
                    fillOpacity: 0.2, 
                    radius: 50
                }).addTo(mapaGeocercaInstance);
            }
        });
    }
}

function guardarRutina() {
    const lugar = document.getElementById('rutina-lugar').value.trim();
    const contacto = document.getElementById('rutina-contacto').value.trim();
    const tel = document.getElementById('rutina-tel').value.trim();
    
    if(!marcadorGeocerca) { 
        alert('Por favor, toca el mapa para marcar la ubicación del perímetro.'); 
        return; 
    }
    if(lugar === '' || contacto === '' || tel === '') { 
        alert('Por favor llena todos los datos de texto de la rutina.'); 
        return; 
    }
    
    const cont = document.getElementById('lista-rutinas');
    cont.innerHTML += `
        <div class="resena-caja" style="border-left-color: #e74c3c; display:flex; justify-content: space-between; align-items:center;">
            <div>
                <strong style="color:#351a42;">Zona Segura: ${lugar} (50m)</strong><br>
                <span style="font-size:0.75rem; color:#888;"><i class="fa-solid fa-location-crosshairs"></i> Al salir, alertar a: ${contacto}</span>
            </div>
            <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
    `;
    
    document.getElementById('rutina-lugar').value = '';
    document.getElementById('rutina-contacto').value = '';
    document.getElementById('rutina-tel').value = '';
    
    alert(`¡Geocerca Activada!\nSi sales del radio de 50 metros del punto seleccionado ("${lugar}"), enviaremos tu ubicación en tiempo real a ${contacto}.`);
}

// ==========================================
// CALENDARIO DINÁMICO
// ==========================================

let fechaApp = new Date();
let mesApp = fechaApp.getMonth();
let anioApp = fechaApp.getFullYear();
let inicioCicloGlobal = null; 
const mesesNombres = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function cambiarMesCalendario(direccion) {
    mesApp += direccion;
    if(mesApp > 11) { 
        mesApp = 0; 
        anioApp++; 
    }
    else if(mesApp < 0) { 
        mesApp = 11; 
        anioApp--; 
    }
    generarCalendarioReal();
}

function generarCalendarioReal() {
    const cuadricula = document.getElementById('cuadricula-dias');
    cuadricula.innerHTML = '';
    document.getElementById('mes-anio-texto').innerText = mesesNombres[mesApp] + ' ' + anioApp;

    // 0 = domingo, 1 = lunes. Ajustamos para que la semana empiece en Lunes
    let primerDia = new Date(anioApp, mesApp, 1).getDay();
    let espaciosVacios = primerDia === 0 ? 6 : primerDia - 1;
    let diasEnMes = new Date(anioApp, mesApp + 1, 0).getDate();

    for(let i=0; i<espaciosVacios; i++) {
        cuadricula.innerHTML += '<div class="dia dia-vacio"></div>';
    }

    for(let dia=1; dia<=diasEnMes; dia++) {
        let claseExtra = '';
        if(inicioCicloGlobal) {
            let fechaEsteDia = new Date(anioApp, mesApp, dia);
            let diffTiempo = fechaEsteDia.getTime() - inicioCicloGlobal.getTime();
            let diffDias = Math.floor(diffTiempo / (1000 * 3600 * 24));
            
            if(diffDias >= 0) {
                let diaDelCiclo = (diffDias % 28) + 1;
                if(diaDelCiclo >= 1 && diaDelCiclo <= 5) claseExtra = ' fase-periodo';
                else if(diaDelCiclo >= 11 && diaDelCiclo <= 16) claseExtra = ' fase-fertil';
                else if(diaDelCiclo <= 28) claseExtra = ' fase-infertil';
            }
        }
        cuadricula.innerHTML += `<div class="dia${claseExtra}" onclick="procesarCicloIA_Global(${dia})">${dia}</div>`;
    }
}

function procesarCicloIA_Global(dia) {
    inicioCicloGlobal = new Date(anioApp, mesApp, dia);
    generarCalendarioReal();
    document.getElementById('resultado-ia').style.display = 'block';
    document.getElementById('texto-consejo-ia').innerHTML = "<strong>¡Sincronizado!</strong><br>💡 <strong>Días rojos:</strong> Mantente hidratada. El té ayuda con cólicos.<br>💡 <strong>Días celestes:</strong> Tu energía estará a tope, ideal para ejercitarte.";
}
