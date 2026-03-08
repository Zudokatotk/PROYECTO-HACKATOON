// ==========================================
// SERVICIOS (Empleo y Negocios)
// ==========================================

function abrirSubvistaServicio(tipo) {
    document.getElementById('menu-servicios').classList.add('oculto');
    document.getElementById('titulo-servicios').classList.add('oculto');
    
    if(tipo === 'empleo') { 
        document.getElementById('subvista-empleo').classList.remove('oculto'); 
        renderizarTrabajadoras(); 
    }
    if(tipo === 'directorio') { 
        document.getElementById('subvista-directorio').classList.remove('oculto'); 
        renderizarNegocios(); 
    }
}

function cerrarSubvistaServicio() {
    document.getElementById('subvista-empleo').classList.add('oculto'); 
    document.getElementById('subvista-directorio').classList.add('oculto');
    document.getElementById('menu-servicios').classList.remove('oculto'); 
    document.getElementById('titulo-servicios').classList.remove('oculto');
}

function cambiarTabEmpleo(tab) {
    document.getElementById('btn-tab-pedir').classList.remove('activo'); 
    document.getElementById('btn-tab-ofrecer').classList.remove('activo');
    document.getElementById('contenido-empleo-pedir').classList.add('oculto'); 
    document.getElementById('contenido-empleo-ofrecer').classList.add('oculto');
    document.getElementById('btn-tab-' + tab).classList.add('activo'); 
    document.getElementById('contenido-empleo-' + tab).classList.remove('oculto');
}

function renderizarTrabajadoras(filtro = "") {
    const cont = document.getElementById('lista-trabajadoras'); 
    cont.innerHTML = '';
    const filtroMinusculas = filtro.toLowerCase();
    
    datosTrabajadoras.forEach(t => {
        if (filtro === "" || t.categoria.toLowerCase().includes(filtroMinusculas) || t.especialidad.toLowerCase().includes(filtroMinusculas)) {
            cont.innerHTML += `
            <div class="tarjeta-perfil" onclick="mostrarModalInfo('trabajadora', '${t.nombre}', '${t.avatar}', '${t.especialidad}', '${t.estrellas}', '${t.trabajos}', null)">
                <img src="${t.avatar}" style="width: 50px;">
                <div>
                    <div class="categoria-chip" style="background:${t.color}; color:${t.fontColor};">${t.categoria}</div>
                    <h4 style="margin: 0; color: #333; font-size: 1rem;">${t.nombre} <i class="fa-solid fa-circle-check" style="color:#f39c12;"></i></h4>
                    <p style="color: #888; font-size: 0.8rem; margin-top: 3px;"><i class="fa-solid fa-star" style="color:#f39c12;"></i> ${t.estrellas}</p>
                </div>
            </div>`;
        }
    });
    
    if(cont.innerHTML === '') {
        cont.innerHTML = '<p style="color:#888; font-size:0.9rem; text-align:center;">No se encontraron trabajadoras para esa búsqueda.</p>';
    }
}

function filtrarTrabajadoras() { 
    renderizarTrabajadoras(document.getElementById('buscador-empleo').value); 
}

function publicarServicioPropio() {
    const titulo = document.getElementById('input-ofrecer-titulo').value.trim();
    const desc = document.getElementById('input-ofrecer-desc').value.trim();
    
    if(titulo === '' || desc === '') { 
        alert("Por favor llena los campos."); 
        return; 
    }
    
    datosTrabajadoras.unshift({
        nombre: "Valeria Gómez", 
        especialidad: desc, 
        categoria: titulo, 
        color: "#f4ecf7", 
        fontColor: "#9b59b6", 
        avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png", 
        estrellas: "Nuevo", 
        trabajos: "(0 trabajos)"
    });
    
    document.getElementById('input-ofrecer-titulo').value = ''; 
    document.getElementById('input-ofrecer-desc').value = '';
    cambiarTabEmpleo('pedir'); 
    renderizarTrabajadoras(); 
    alert("¡Tu servicio se publicó con éxito en la red de empleos!");
}

function renderizarNegocios(filtro = "") {
    const cont = document.getElementById('lista-negocios'); 
    cont.innerHTML = '';
    const f = filtro.toLowerCase();
    
    datosNegocios.forEach(n => {
        if (f === "" || n.tags.includes(f) || n.nombre.toLowerCase().includes(f)) {
            cont.innerHTML += `
            <div class="tarjeta-perfil" onclick="mostrarModalInfo('negocio', '${n.nombre}', '${n.avatar}', '${n.detalle}', '${n.estrellas}', '${n.tipo}', [${n.coords}])">
                <img src="${n.avatar}" style="width: 50px;">
                <div>
                    <div class="categoria-chip" style="background:${n.color}; color:${n.fontColor};">${n.tipo}</div>
                    <h4 style="margin: 0; color: #333; font-size: 1rem;">${n.nombre}</h4>
                    <p style="color: #888; font-size: 0.8rem; margin-top: 3px;"><i class="fa-solid fa-star" style="color:#f39c12;"></i> ${n.estrellas}</p>
                </div>
            </div>`;
        }
    });
    
    if(cont.innerHTML === '') {
        cont.innerHTML = '<p style="color:#888; font-size:0.9rem; text-align:center;">No se encontraron negocios relacionados.</p>';
    }
}

function filtrarNegocios() { 
    renderizarNegocios(document.getElementById('buscador-negocios').value); 
}
