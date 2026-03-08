// ==========================================
// COMUNIDAD
// ==========================================

// URL de API Gateway configurada
const API_URL = 'https://jrumqjnz9b.execute-api.us-east-1.amazonaws.com/prod/mensajes';

// Variable para controlar la actualización automática
let intervaloActualizacion = null;

// Array para almacenar amigas (solo demostración)
let amigasConfianza = [
    { nombre: "María López", telefono: "70123456" },
    { nombre: "Ana Pérez", telefono: "71234567" }
];

// Array para almacenar alertas recibidas (solo demostración)
let alertasRecibidas = [
    {
        nombre: "María López",
        telefono: "70123456",
        mensaje: "¡Necesito ayuda urgente!",
        ubicacion: "Av. 6 de Agosto, La Paz",
        tiempo: "Hace 5 minutos",
        avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
    }
];

function abrirSubvistaForo() { 
    document.getElementById('menu-comunidad').classList.add('oculto'); 
    document.getElementById('subvista-foro').classList.remove('oculto'); 
    cargarMensajesDesdeAWS(); // Cargar mensajes al abrir el foro
    iniciarActualizacionAutomatica(); // Iniciar actualización automática
}

function cerrarSubvistaForo() { 
    document.getElementById('subvista-foro').classList.add('oculto'); 
    document.getElementById('menu-comunidad').classList.remove('oculto'); 
    detenerActualizacionAutomatica(); // Detener actualización al cerrar
}

// Iniciar actualización automática cada 10 segundos
function iniciarActualizacionAutomatica() {
    // Limpiar intervalo anterior si existe
    if (intervaloActualizacion) {
        clearInterval(intervaloActualizacion);
    }
    
    // Actualizar cada 10 segundos
    intervaloActualizacion = setInterval(() => {
        cargarMensajesDesdeAWS(true); // true = actualización silenciosa
    }, 10000); // 10000 ms = 10 segundos
}

// Detener actualización automática
function detenerActualizacionAutomatica() {
    if (intervaloActualizacion) {
        clearInterval(intervaloActualizacion);
        intervaloActualizacion = null;
    }
}

// Cargar mensajes desde AWS DynamoDB
async function cargarMensajesDesdeAWS(silencioso = false) {
    // Mostrar indicador de actualización
    const indicador = document.getElementById('indicador-actualizacion');
    if (indicador && silencioso) {
        indicador.style.display = 'inline';
    }
    
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.success && data.mensajes) {
            const mensajesAnteriores = datosChat.length;
            
            // Convertir formato AWS a formato local
            datosChat = data.mensajes.map(msg => ({
                nombre: msg.usuario,
                verificada: msg.verificada || true,
                avatar: msg.avatar,
                tiempo: calcularTiempoTranscurrido(msg.timestamp),
                texto: msg.mensaje
            }));
            
            renderizarChat();
            
            // Mostrar notificación si hay mensajes nuevos (solo en actualización automática)
            if (silencioso && datosChat.length > mensajesAnteriores) {
                mostrarNotificacionNuevosMensajes(datosChat.length - mensajesAnteriores);
            }
        }
    } catch (error) {
        console.error('Error al cargar mensajes:', error);
        // Si falla, usar datos locales
        if (!silencioso) {
            renderizarChat();
        }
    } finally {
        // Ocultar indicador después de 1 segundo
        if (indicador && silencioso) {
            setTimeout(() => {
                indicador.style.display = 'none';
            }, 1000);
        }
    }
}

// Mostrar notificación de nuevos mensajes
function mostrarNotificacionNuevosMensajes(cantidad) {
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #2ecc71, #27ae60);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4);
        z-index: 1000;
        font-size: 0.9rem;
        font-weight: bold;
        animation: slideDown 0.3s ease-out;
    `;
    notificacion.innerHTML = `<i class="fa-solid fa-bell"></i> ${cantidad} mensaje${cantidad > 1 ? 's nuevos' : ' nuevo'}`;
    
    document.body.appendChild(notificacion);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}

// Calcular tiempo transcurrido desde un timestamp
function calcularTiempoTranscurrido(timestamp) {
    const ahora = new Date();
    const fecha = new Date(timestamp);
    const diferencia = Math.floor((ahora - fecha) / 1000); // segundos
    
    if (diferencia < 60) return 'Justo ahora';
    if (diferencia < 3600) return `Hace ${Math.floor(diferencia / 60)} min`;
    if (diferencia < 86400) return `Hace ${Math.floor(diferencia / 3600)} hora${Math.floor(diferencia / 3600) > 1 ? 's' : ''}`;
    return `Hace ${Math.floor(diferencia / 86400)} día${Math.floor(diferencia / 86400) > 1 ? 's' : ''}`;
}

// Función para agregar amiga (solo demostración visual)
function agregarAmiga() {
    const numero = document.getElementById('input-numero-amiga').value.trim();
    const nombre = document.getElementById('input-nombre-amiga').value.trim();

    if (numero === '') {
        alert('Por favor ingresa un número de teléfono.');
        return;
    }

    if (numero.length < 8) {
        alert('Ingresa un número válido (mínimo 8 dígitos).');
        return;
    }

    const nombreFinal = nombre === '' ? 'Contacto sin nombre' : nombre;

    amigasConfianza.push({
        nombre: nombreFinal,
        telefono: numero
    });

    document.getElementById('input-numero-amiga').value = '';
    document.getElementById('input-nombre-amiga').value = '';

    renderizarAmigasConfianza();
}

// Función para eliminar amiga
function eliminarAmiga(index) {
    if (confirm('¿Estás segura de eliminar este contacto?')) {
        amigasConfianza.splice(index, 1);
        renderizarAmigasConfianza();
    }
}

// Función para renderizar lista de amigas
function renderizarAmigasConfianza() {
    const lista = document.getElementById('lista-amigas-confianza');
    
    if (amigasConfianza.length === 0) {
        lista.innerHTML = `
            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center; color: #999; font-size: 0.85rem; margin-top: 15px;">
                <i class="fa-solid fa-user-plus" style="font-size: 2rem; color: #ddd; display: block; margin-bottom: 8px;"></i>
                No has agregado contactos aún
            </div>`;
        return;
    }

    lista.innerHTML = '';
    amigasConfianza.forEach((amiga, index) => {
        lista.innerHTML += `
            <div class="tarjeta-conductora" style="margin-top: 15px; border-left: 4px solid #e056fd;">
                <div style="background: #f4ecf7; width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #e056fd;">
                    <i class="fa-solid fa-user"></i>
                </div>
                <div class="info-conductora">
                    <div class="nombre-conductora" style="color: #351a42;">
                        ${amiga.nombre}
                    </div>
                    <div class="auto-conductora">
                        <i class="fa-solid fa-phone" style="color: #9b59b6;"></i> ${amiga.telefono}
                    </div>
                </div>
                <button onclick="eliminarAmiga(${index})" style="background: none; border: none; color: #e74c3c; font-size: 1.2rem; cursor: pointer; padding: 5px;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>`;
    });
}

// Función para renderizar alertas recibidas
function renderizarAlertasRecibidas() {
    const lista = document.getElementById('lista-alertas-recibidas');
    const sinAlertasMensaje = document.getElementById('sin-alertas-mensaje');

    if (alertasRecibidas.length === 0) {
        sinAlertasMensaje.style.display = 'block';
        lista.innerHTML = '';
        return;
    }

    sinAlertasMensaje.style.display = 'none';
    lista.innerHTML = '';

    alertasRecibidas.forEach((alerta, index) => {
        lista.innerHTML += `
            <div class="burbuja-comunidad burbuja-alerta" style="border-left-color: #ff6b6b; background: #fff5f5;">
                <div class="alerta-header">
                    <img src="${alerta.avatar}" class="avatar-mini">
                    <strong style="color: #c0392b;">${alerta.nombre}</strong>
                    <span class="tiempo">${alerta.tiempo}</span>
                </div>
                <p style="color: #333; margin: 8px 0; font-weight: 500;">
                    <i class="fa-solid fa-triangle-exclamation" style="color: #ff6b6b;"></i> ${alerta.mensaje}
                </p>
                <p style="color: #666; font-size: 0.85rem; margin-top: 8px;">
                    <i class="fa-solid fa-map-marker-alt" style="color: #e74c3c;"></i> ${alerta.ubicacion}
                </p>
                <div style="display: flex; gap: 8px; margin-top: 12px;">
                    <a href="tel:${alerta.telefono}" class="btn-accion btn-llamar" style="flex: 1; margin: 0; padding: 8px; font-size: 0.85rem;">
                        <i class="fa-solid fa-phone"></i> Llamar
                    </a>
                    <button onclick="verUbicacionAlerta()" class="btn-accion" style="flex: 1; margin: 0; padding: 8px; font-size: 0.85rem;">
                        <i class="fa-solid fa-location-dot"></i> Ver Mapa
                    </button>
                </div>
            </div>`;
    });
}

// Función para simular ver ubicación en mapa
function verUbicacionAlerta() {
    alert('📍 Abriendo ubicación en el mapa...\n(Esta es una demostración visual)');
}

// Función para inicializar la vista de comunidad
function inicializarVistaComunidad() {
    if (document.getElementById('lista-amigas-confianza')) {
        renderizarAmigasConfianza();
    }
    if (document.getElementById('lista-alertas-recibidas')) {
        renderizarAlertasRecibidas();
    }
}

function renderizarChat() {
    const contChat = document.getElementById('contenedor-chat'); 
    contChat.innerHTML = '';
    
    if (datosChat.length === 0) {
        contChat.innerHTML = '<p style="text-align:center; color:#888; padding:20px;">No hay mensajes aún. ¡Sé la primera en compartir!</p>';
        return;
    }
    
    datosChat.forEach(msg => {
        let check = msg.verificada ? `<i class="fa-solid fa-circle-check" style="color: #f39c12;" title="Verificada"></i>` : '';
        contChat.innerHTML += `
            <div class="burbuja-comunidad">
                <div class="alerta-header">
                    <img src="${msg.avatar}" class="avatar-mini">
                    <strong>${msg.nombre} ${check}</strong>
                    <span class="tiempo">${msg.tiempo}</span>
                </div>
                <p class="alerta-texto-comunidad">${msg.texto}</p>
            </div>`;
    });
}

async function publicarChat() {
    const texto = document.getElementById('texto-nuevo-chat').value.trim();
    const esAnonimo = document.getElementById('check-anonimo-chat').checked;

    if (texto === '') { 
        alert('Escribe un mensaje primero.'); 
        return; 
    }

    // Filtro de IA contra lenguaje ofensivo
    const palabrasProhibidas = ['fea', 'tonta', 'estupida', 'idiota', 'odio', 'matar', 'gorda', 'maldita'];
    if(palabrasProhibidas.some(p => texto.toLowerCase().includes(p))) { 
        alert('🛡️ IA BLOQUEÓ ESTE MENSAJE:\nContiene lenguaje ofensivo o discriminatorio. Esta app es un espacio seguro.'); 
        return; 
    }

    // Obtener datos del usuario actual
    const usuario = window.usuarioActual || JSON.parse(sessionStorage.getItem('usuario') || '{}');
    const nombre = esAnonimo ? "Usuaria Anónima" : (usuario.nombre || "Usuario");
    const avatar = esAnonimo
        ? "https://cdn-icons-png.flaticon.com/512/847/847969.png"
        : (usuario.foto || "https://cdn-icons-png.flaticon.com/512/4140/4140047.png");

    // Mostrar indicador de carga
    const btnPublicar = document.querySelector('.btn-enviar-morado');
    const textoOriginal = btnPublicar.innerHTML;
    btnPublicar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Publicando...';
    btnPublicar.disabled = true;

    try {
        // ENVIAR A AWS DynamoDB
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: nombre,
                mensaje: texto,
                avatar: avatar
            })
        });

        const data = await response.json();

        if (data.success) {
            // Agregar mensaje al inicio de la lista local
            datosChat.unshift({
                nombre: nombre,
                verificada: true,
                avatar: avatar,
                tiempo: "Justo ahora",
                texto: texto
            });

            // Limpiar formulario
            document.getElementById('texto-nuevo-chat').value = '';
            document.getElementById('check-anonimo-chat').checked = false;

            // Actualizar vista
            renderizarChat();
            
            // Mensaje de éxito
            console.log('✅ Mensaje publicado en AWS DynamoDB');
        } else {
            throw new Error('Error al publicar mensaje');
        }
    } catch (error) {
        console.error('Error al publicar:', error);
        alert('⚠️ No se pudo publicar el mensaje. Verifica tu conexión o la configuración de AWS.');
    } finally {
        // Restaurar botón
        btnPublicar.innerHTML = textoOriginal;
        btnPublicar.disabled = false;
    }
}
