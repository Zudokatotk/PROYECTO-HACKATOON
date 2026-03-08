// ==========================================
// GESTIÓN DE SESIÓN DE USUARIO
// ==========================================

// Verificar sesión al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    verificarSesion();
});

function verificarSesion() {
    const usuarioJSON = sessionStorage.getItem('usuario');
    
    // Si no hay sesión, redirigir al login
    if (!usuarioJSON) {
        window.location.href = 'index.html';
        return;
    }
    
    // Cargar datos del usuario
    try {
        const usuario = JSON.parse(usuarioJSON);
        cargarDatosUsuario(usuario);
    } catch (e) {
        console.error('Error al cargar datos del usuario:', e);
        sessionStorage.removeItem('usuario');
        window.location.href = 'index.html';
    }
}

function cargarDatosUsuario(usuario) {
    // Actualizar header
    const headerNombre = document.querySelector('.info-perfil h2');
    if (headerNombre) {
        const icono = usuario.verificado 
            ? '<i class="fa-solid fa-circle-check" style="color: #f39c12; font-size: 1rem;"></i>'
            : '';
        headerNombre.innerHTML = `Hola, ${usuario.nombre} ${icono}`;
    }
    
    // Actualizar foto de perfil en el header
    const fotoPerfil = document.getElementById('mi-foto-perfil');
    if (fotoPerfil) {
        fotoPerfil.src = usuario.foto || 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png';
    }
    
    // Guardar datos globalmente para uso en modales
    window.usuarioActual = usuario;
}

function abrirModalPerfil() {
    const usuario = window.usuarioActual;
    if (!usuario) return;
    
    // Actualizar modal con datos del usuario
    const modalNombre = document.getElementById('modal-nombre');
    const modalCorreo = document.getElementById('modal-correo');
    const modalEdad = document.getElementById('modal-edad');
    const modalCarnet = document.getElementById('modal-carnet');
    const modalEstado = document.getElementById('modal-estado');
    const modalFoto = document.getElementById('modal-foto-perfil');
    
    if (modalNombre) modalNombre.textContent = usuario.nombre;
    if (modalCorreo) modalCorreo.textContent = usuario.correo || 'No registrado';
    if (modalEdad) modalEdad.textContent = usuario.edad > 0 ? `${usuario.edad} años` : 'No especificada';
    if (modalCarnet) modalCarnet.textContent = usuario.carnet || 'No registrado';
    
    if (modalEstado) {
        if (usuario.verificado) {
            modalEstado.innerHTML = '<i class="fa-solid fa-shield-check"></i> Cuenta Verificada';
            modalEstado.style.color = '#2ecc71';
        } else {
            modalEstado.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Sin Verificar';
            modalEstado.style.color = '#f39c12';
        }
    }
    
    if (modalFoto) {
        modalFoto.src = usuario.foto || 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png';
    }
    
    // Mostrar modal
    const modal = document.getElementById('modal-perfil');
    if (modal) {
        modal.classList.add('mostrar');
    }
}

function cerrarModalPerfil() {
    const modal = document.getElementById('modal-perfil');
    if (modal) {
        modal.classList.remove('mostrar');
    }
}

function cerrarSesion() {
    if (confirm('¿Estás segura de que quieres cerrar sesión?')) {
        sessionStorage.removeItem('usuario');
        window.location.href = 'index.html';
    }
}
