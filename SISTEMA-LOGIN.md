# 🔐 Sistema de Login Integrado

## ¿Cómo funciona?

El sistema de login ahora está integrado ANTES de entrar a la app principal.

## 📋 Flujo de usuario:

```
1. Usuario abre la app
   ↓
2. Ve index.html (pantalla de registro/login)
   ↓
3. Opciones:
   a) Registrarse con datos completos
   b) Continuar sin registrarse (invitado)
   ↓
4. Entra a app.html (app principal)
   ↓
5. La app muestra su nombre y datos
```

## 🎯 Archivos creados/modificados:

### Nuevos archivos:
- `programa/index.html` - Pantalla de login/registro (se abre primero)
- `programa/app.html` - App principal (antes era index.html)
- `programa/js/sesion.js` - Gestión de sesión

## 🚀 Cómo usar:

### Opción 1: Con backend PHP (completo)

1. **Instala XAMPP** si no lo tienes
2. **Crea la base de datos:**
   ```sql
   CREATE DATABASE seguridad_app;
   USE seguridad_app;
   
   CREATE TABLE usuarios (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nombre_usuario VARCHAR(100) NOT NULL,
       edad INT NOT NULL,
       correo VARCHAR(150) UNIQUE NOT NULL,
       contrasena VARCHAR(255) NOT NULL,
       carnet VARCHAR(50) UNIQUE NOT NULL,
       foto_rostro VARCHAR(255),
       fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. **Copia el archivo API:**
   - Copia `villa/Api.php` a `C:/xampp/htdocs/seguridad_app/api.php`

4. **Inicia XAMPP:**
   - Apache
   - MySQL

5. **Abre la app:**
   - Abre `programa/index.html` (login)
   - Después de registrarte → `programa/app.html` (app principal)

### Opción 2: Sin backend (solo frontend)

Si no quieres usar PHP/MySQL, el sistema funciona igual pero sin validación de duplicados:

1. **Abre directamente:**
   - `programa/index.html`

2. **Registra un usuario:**
   - Los datos se guardan en `sessionStorage`
   - No se valida si el correo/carnet ya existe

3. **Funciona perfectamente** para la demo

## 📱 Características:

### En index.html (login):
- ✅ Registro de usuarios
- ✅ Validación en tiempo real (si hay backend)
- ✅ Opción "Continuar sin registrarme"
- ✅ Responsive (funciona en celular y PC)

### En app.html (app principal):
- ✅ Verifica sesión al cargar
- ✅ Muestra nombre del usuario en el header
- ✅ Modal de perfil con datos completos
- ✅ Opción de cerrar sesión

## 🔧 Personalización:

### Cambiar URL de la API:

En `programa/index.html`, línea 186:
```javascript
const API = "http://localhost/seguridad_app/api.php";
```

Cámbiala por tu URL si usas otro servidor.

### Agregar más campos:

1. Agrega el input en `index.html`
2. Agrega el campo al objeto en `sessionStorage`
3. Muéstralo en el modal de perfil

## 🎨 Integración con AWS:

Si quieres migrar el sistema de login a AWS (como el foro):

1. Crear tabla en DynamoDB
2. Crear función Lambda para registro/login
3. Actualizar `index.html` para usar la API de AWS

¿Quieres que lo haga? 🚀

## 🧪 Probar:

1. Abre `programa/index.html` (login)
2. Registra un usuario de prueba
3. Serás redirigido a `app.html`
4. Tu nombre aparecerá en el header
5. Click en tu foto → Ver perfil completo

## 📝 Notas:

- La sesión se guarda en `sessionStorage` (se borra al cerrar el navegador)
- Para sesión persistente, cambiar a `localStorage`
- El sistema funciona con o sin backend PHP
- Compatible con GitHub Pages

## 🌐 Para GitHub Pages:

Cuando subas a GitHub Pages:
- La URL será: `https://tu-usuario.github.io/tu-repo/`
- Se abrirá automáticamente `index.html` (login)
- Después de registrarse → `app.html` (app principal)

¡Listo para la demo! 🎉
