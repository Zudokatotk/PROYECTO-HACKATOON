// ==========================================
// COMUNIDAD
// ==========================================

function abrirSubvistaForo() { 
    document.getElementById('menu-comunidad').classList.add('oculto'); 
    document.getElementById('subvista-foro').classList.remove('oculto'); 
}

function cerrarSubvistaForo() { 
    document.getElementById('subvista-foro').classList.add('oculto'); 
    document.getElementById('menu-comunidad').classList.remove('oculto'); 
}

function renderizarChat() {
    const contChat = document.getElementById('contenedor-chat'); 
    contChat.innerHTML = '';
    
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

function publicarChat() {
    const texto = document.getElementById('texto-nuevo-chat').value.trim();
    const esAnonimo = document.getElementById('check-anonimo-chat').checked;
    
    if (texto === '') { 
        alert('Escribe un mensaje primero.'); 
        return; 
    }
    
    // Filtro de lenguaje ofensivo
    const palabrasProhibidas = ['fea', 'tonta', 'estupida', 'idiota', 'odio', 'matar', 'gorda', 'maldita'];
    if(palabrasProhibidas.some(p => texto.toLowerCase().includes(p))) { 
        alert('🛡️ IA BLOQUEÓ ESTE MENSAJE:\nContiene lenguaje ofensivo o discriminatorio. Esta app es un espacio seguro.'); 
        return; 
    }

    datosChat.unshift({
        nombre: esAnonimo ? "Usuaria Anónima" : "Valeria Gómez", 
        verificada: true, 
        avatar: esAnonimo ? "https://cdn-icons-png.flaticon.com/512/847/847969.png" : "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
        tiempo: "Justo ahora", 
        texto: texto
    });
    
    document.getElementById('texto-nuevo-chat').value = ''; 
    document.getElementById('check-anonimo-chat').checked = false;
    renderizarChat();
}
