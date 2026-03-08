# 📸 Escáner de Rostro - Documentación

## ✅ Implementación Completada

El sistema de escáner de rostro ha sido integrado en el proceso de registro de usuarios.

## 🎯 Características

### 1. Captura de Foto con Cámara
- Usa la API `getUserMedia` del navegador
- Accede a la cámara frontal automáticamente
- Captura en formato JPEG con calidad optimizada (80%)
- Almacena la imagen en formato Base64

### 2. Flujo de Usuario
1. Usuario completa los campos básicos (nombre, edad, correo, carnet)
2. Aparece automáticamente la sección de escáner
3. Usuario hace clic en "Activar cámara"
4. Se solicitan permisos de cámara
5. Usuario ve su rostro en tiempo real
6. Usuario hace clic en "Capturar foto"
7. Se muestra un preview de la foto capturada
8. Opción de "Tomar otra foto" si no está satisfecho
9. Al registrarse, la foto se guarda en el perfil

### 3. Verificación de Cuenta
- Si el usuario captura su foto → Cuenta VERIFICADA ✅
- Si omite la foto → Cuenta SIN VERIFICAR ⚠️
- El estado se muestra en el perfil con iconos distintivos

## 🔧 Archivos Modificados

### `programa/index.html`
- Agregada sección de cámara con video, canvas y preview
- Botones: Activar cámara, Capturar foto, Tomar otra foto
- Funciones JavaScript: `abrirCamara()`, `capturarFoto()`, `reintentarFoto()`
- La foto se guarda en variable `fotoCapturada` (Base64)

### `programa/js/sesion.js`
- Actualizado para mostrar la foto capturada en el header
- Actualizado para mostrar la foto en el modal de perfil
- Usa foto por defecto si no hay foto capturada

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome/Edge (Desktop y Mobile)
- ✅ Firefox (Desktop y Mobile)
- ✅ Safari (iOS 11+)
- ✅ Opera

### Requisitos
- **HTTPS o localhost**: La API de cámara solo funciona en conexiones seguras
- **Permisos**: El usuario debe autorizar el acceso a la cámara
- **Cámara disponible**: El dispositivo debe tener cámara frontal

## 🔒 Seguridad y Privacidad

### Almacenamiento
- La foto se guarda en `sessionStorage` (temporal)
- Se envía al backend PHP si está disponible
- No se almacena en cookies ni localStorage permanente

### Privacidad
- La cámara se desactiva automáticamente después de capturar
- El usuario puede omitir el registro y usar la app sin foto
- La foto solo se usa para verificación de identidad

## 🎨 Experiencia de Usuario

### Feedback Visual
- ✅ Mensaje de confirmación al capturar foto
- 🎥 Video en tiempo real antes de capturar
- 🖼️ Preview de la foto capturada
- 🔄 Opción de reintentar si no le gusta la foto

### Estados de Verificación
- **Verificada**: Icono verde ✅ + "Cuenta Verificada"
- **Sin Verificar**: Icono amarillo ⚠️ + "Sin Verificar"

## 🚀 Uso

### Para el Usuario
1. Completa el formulario de registro
2. Cuando aparezca la sección de cámara, haz clic en "Activar cámara"
3. Autoriza los permisos de cámara en tu navegador
4. Posiciona tu rostro en el centro
5. Haz clic en "Capturar foto"
6. Revisa el preview y toma otra si es necesario
7. Completa el registro

### Para Omitir la Foto
- Simplemente no actives la cámara
- O haz clic en "Continuar sin registrarme"
- La app funcionará normalmente sin foto

## 🐛 Solución de Problemas

### "No se pudo acceder a la cámara"
- Verifica que estés usando HTTPS o localhost
- Revisa los permisos de cámara en tu navegador
- Asegúrate de tener una cámara conectada
- Cierra otras apps que puedan estar usando la cámara

### La foto no se muestra en el perfil
- Verifica que hayas capturado la foto antes de registrarte
- Revisa la consola del navegador para errores
- Asegúrate de que `sessionStorage` esté habilitado

## 📊 Datos Técnicos

### Formato de Imagen
- **Tipo**: JPEG
- **Calidad**: 80%
- **Formato**: Base64 (data:image/jpeg;base64,...)
- **Resolución**: 640x480 (ideal)

### Tamaño Aproximado
- Una foto típica: ~50-100 KB en Base64
- Optimizada para almacenamiento y transmisión

## 🔮 Mejoras Futuras (Opcionales)

1. **Detección de rostro**: Validar que haya un rostro en la foto
2. **Filtros**: Agregar filtros o ajustes de brillo
3. **Recorte automático**: Centrar y recortar el rostro
4. **Comparación facial**: Verificar identidad en login
5. **Almacenamiento en nube**: Subir a AWS S3 o similar

## ✨ Conclusión

El escáner de rostro está completamente funcional y listo para usar. Proporciona una capa adicional de verificación de identidad mientras mantiene la opción de omitir para usuarios que prefieran no compartir su foto.
