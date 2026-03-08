// ==========================================
// SISTEMA DE ALERTAS DE EMERGENCIA
// Detección por toques consecutivos y voz
// ==========================================

// Variables globales del sistema de alertas
let ultimoToque = 0;
let contadorToques = 0;
let alertaEnProceso = false;
const tiempoEntreToques = 900;
const toquesNecesarios = 8;
let temporizador = null;
let tiempo = 10;
let reconocimiento = null;
let vozActiva = false;
let sistemaActivo = true; // Estado del sistema (encendido/apagado)

// ENVIAR ALERTA
const enviarAlerta = () => {
    const estado = document.getElementById("estado-alerta");
    if (estado) {
        estado.innerText = "⚠️ ALERTA DE EMERGENCIA ACTIVADA";
        estado.style.display = "block";
        estado.style.background = "#e74c3c";
    }
    
    console.log("ALERTA ACTIVADA");
    alert("⚠️ ALERTA DE EMERGENCIA ACTIVADA");
    
    // INTEGRACIÓN CON EL SISTEMA DE ALERTAS DEL MAPA
    const textoAlerta = document.getElementById('texto-nueva-alerta');
    const checkAnonimo = document.getElementById('check-anonimo-alerta');
    
    if (textoAlerta && typeof publicarAlerta === 'function') {
        textoAlerta.value = '🚨 ALERTA DE EMERGENCIA - Necesito ayuda urgente en mi ubicación actual';
        if (checkAnonimo) {
            checkAnonimo.checked = false;
        }
        publicarAlerta();
    }
    
    // INTEGRACIÓN CON EL CHAT DE COMUNIDAD
    const textoChat = document.getElementById('texto-nuevo-chat');
    if (textoChat && typeof publicarChat === 'function') {
        textoChat.value = '🚨 EMERGENCIA - Necesito ayuda inmediata';
        publicarChat();
    }
    
    alertaEnProceso = false;
    contadorToques = 0;
    
    setTimeout(() => {
        if (estado) {
            estado.innerText = "Sistema activo 📱";
            estado.style.background = "#2ecc71";
        }
    }, 5000);
};

// INICIAR CUENTA REGRESIVA
const iniciarCuentaRegresiva = () => {
    if(alertaEnProceso) return;
    
    alertaEnProceso = true;
    tiempo = 10;
    
    const ventana = document.getElementById("ventanaAlerta");
    if (ventana) {
        ventana.style.display = "flex";
    }
    
    temporizador = setInterval(() => {
        const contador = document.getElementById("contadorTexto");
        if (contador) {
            contador.innerText = "⚠️ Enviando alerta en " + tiempo + " segundos";
        }
        tiempo--;
        
        if(tiempo < 0) {
            clearInterval(temporizador);
            if (ventana) {
                ventana.style.display = "none";
            }
            enviarAlerta();
        }
    }, 1000);
};

// CANCELAR ALERTA
const cancelarAlerta = () => {
    clearInterval(temporizador);
    const ventana = document.getElementById("ventanaAlerta");
    if (ventana) {
        ventana.style.display = "none";
    }
    alertaEnProceso = false;
    contadorToques = 0;
    
    const estado = document.getElementById("estado-alerta");
    if (estado) {
        estado.innerText = "Alerta cancelada";
        estado.style.display = "block";
        estado.style.background = "#95a5a6";
        
        setTimeout(() => {
            estado.innerText = "Sistema activo 📱";
            estado.style.background = "#2ecc71";
        }, 3000);
    }
};

// DETECCIÓN POR TOQUES
const detectarToques = () => {
    if(alertaEnProceso || !sistemaActivo) return; // No detectar si el sistema está apagado
    
    const ahora = Date.now();
    if(ahora - ultimoToque <= tiempoEntreToques) {
        contadorToques++;
        
        // Mostrar feedback visual del progreso
        const estado = document.getElementById("estado-alerta");
        if (estado && contadorToques > 1) {
            estado.innerText = `Toques: ${contadorToques}/${toquesNecesarios} 📱`;
            estado.style.display = "block";
            estado.style.background = "#f39c12";
        }
    } else {
        contadorToques = 1;
    }
    
    ultimoToque = ahora;
    
    if(contadorToques >= toquesNecesarios) {
        iniciarCuentaRegresiva();
    }
};

// RECONOCIMIENTO DE VOZ
const iniciarReconocimientoVoz = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if(!SpeechRecognition) {
        console.log("Reconocimiento de voz no soportado en este navegador");
        return;
    }
    
    reconocimiento = new SpeechRecognition();
    reconocimiento.lang = "es-ES";
    reconocimiento.continuous = true;
    reconocimiento.interimResults = false;
    
    reconocimiento.onresult = (event) => {
        const texto = event.results[event.results.length - 1][0].transcript.toLowerCase();
        console.log("Escuchado:", texto);
        
        if(texto.includes("alerta") || 
           texto.includes("ayuda") || 
           texto.includes("emergencia") ||
           texto.includes("auxilio") ||
           texto.includes("socorro")) {
            iniciarCuentaRegresiva();
        }
    };
    
    reconocimiento.onend = () => {
        if(vozActiva) {
            try {
                reconocimiento.start();
            } catch(e) {
                console.log("Error reiniciando reconocimiento de voz:", e);
            }
        }
    };
    
    reconocimiento.onerror = (error) => {
        console.log("Error de voz:", error);
        if(error.error === 'no-speech') {
            // Reintentar si no hay voz detectada
            if(vozActiva) {
                setTimeout(() => {
                    try {
                        reconocimiento.start();
                    } catch(e) {
                        console.log("Error reiniciando:", e);
                    }
                }, 1000);
            }
        }
    };
    
    try {
        reconocimiento.start();
        console.log("Reconocimiento de voz activado");
    } catch(e) {
        console.log("Error iniciando reconocimiento de voz:", e);
    }
};

// TOGGLE DEL SISTEMA (ENCENDER/APAGAR)
const toggleSistemaAlertas = () => {
    sistemaActivo = !sistemaActivo;
    const estado = document.getElementById("estado-alerta");
    
    if (sistemaActivo) {
        // Sistema ENCENDIDO
        estado.style.background = "#2ecc71";
        estado.innerText = vozActiva ? "Sistema activo 📱🎤" : "Sistema activo 📱";
        
        // Reiniciar reconocimiento de voz si estaba activo
        if (vozActiva && reconocimiento) {
            try {
                reconocimiento.start();
            } catch(e) {
                console.log("Reconocimiento ya activo");
            }
        }
        
        console.log("✅ Sistema de alertas ACTIVADO");
    } else {
        // Sistema APAGADO
        estado.style.background = "#95a5a6";
        estado.innerText = "Sistema desactivado ⏸️";
        
        // Detener reconocimiento de voz
        if (reconocimiento) {
            reconocimiento.stop();
        }
        
        // Resetear contador
        contadorToques = 0;
        
        console.log("⏸️ Sistema de alertas DESACTIVADO");
    }
};

// INICIALIZAR SISTEMA DE ALERTAS
const inicializarSistemaAlertas = () => {
    console.log("Inicializando sistema de alertas de emergencia...");
    
    // Activar detección de toques (funciona en móviles)
    document.addEventListener("touchstart", detectarToques);
    
    // También activar para clicks (funciona en desktop para pruebas)
    document.addEventListener("click", detectarToques);
    
    // Mostrar indicador de estado y hacerlo clickeable
    const estado = document.getElementById("estado-alerta");
    if (estado) {
        estado.style.display = "block";
        estado.innerText = "Sistema activo 📱";
        estado.style.cursor = "pointer";
        
        // Agregar evento click para toggle
        estado.addEventListener("click", (e) => {
            e.stopPropagation(); // Evitar que cuente como toque para alerta
            toggleSistemaAlertas();
        });
    }
    
    // Preguntar por reconocimiento de voz después de un pequeño delay
    setTimeout(() => {
        const activarVoz = confirm(
            "🎤 Sistema de Emergencia\n\n" +
            "¿Deseas activar el reconocimiento por voz?\n\n" +
            "Podrás activar una alerta diciendo:\n" +
            "• 'Alerta'\n" +
            "• 'Ayuda'\n" +
            "• 'Emergencia'\n" +
            "• 'Auxilio'\n" +
            "• 'Socorro'"
        );
        
        if(activarVoz) {
            vozActiva = true;
            iniciarReconocimientoVoz();
            
            const estado = document.getElementById("estado-alerta");
            if (estado) {
                estado.innerText = "Sistema activo 📱🎤";
            }
        }
    }, 2000);
    
    console.log("Sistema de alertas inicializado correctamente");
    console.log(`Toca la pantalla ${toquesNecesarios} veces en menos de ${tiempoEntreToques}ms para activar alerta`);
};

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarSistemaAlertas);
} else {
    // Si el DOM ya está listo, esperar un poco para que las vistas se carguen
    setTimeout(inicializarSistemaAlertas, 1000);
}
