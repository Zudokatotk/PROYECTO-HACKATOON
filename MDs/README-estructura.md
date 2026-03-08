# Estructura del Proyecto - App Segura

## 📁 Organización de Archivos

### Archivo Principal
- **uni-organizado.html** - Archivo HTML principal con la estructura de la aplicación

### Estilos
- **uni-styles.css** - Todos los estilos CSS de la aplicación

### JavaScript - Módulos por Sección

#### 📊 **js/datos.js**
Contiene todas las bases de datos y datos estáticos:
- Coordenadas actuales
- Puntos seguros
- Alertas
- Mensajes del chat
- Trabajadoras
- Negocios

#### 🎨 **js/ui-modales.js**
Gestión de la interfaz de usuario y modales:
- Modal de perfil
- Modal de información dinámica
- Acordeones
- Funciones de UI compartidas

#### 🗺️ **js/mapa.js**
Funcionalidades del mapa de seguridad:
- Inicialización del mapa
- Renderizado de puntos seguros
- Gestión de alertas
- Simulación de movimiento

#### 🚗 **js/transporte.js**
Sistema de transporte seguro:
- Solicitud de transporte
- Mapa de rutas
- Lista de conductoras
- Cancelación de viajes

#### 💼 **js/servicios.js**
Empleo y directorio de negocios:
- Red de empleo (solicitar/ofrecer)
- Directorio de negocios
- Filtros de búsqueda
- Publicación de servicios

#### 👥 **js/comunidad.js**
Red de apoyo local:
- Foro de mujeres
- Chat comunitario
- Filtro de lenguaje ofensivo
- Publicación de mensajes

#### ⚙️ **js/configuracion.js**
Ajustes y configuración:
- Geocerca (alarma perimetral)
- Calendario inteligente
- Gestión de rutinas

#### 🧭 **js/navegacion.js**
Control de navegación y permisos:
- Cambio entre vistas
- Permisos de ubicación
- Inicialización de la app

## 🔄 Orden de Carga

Los scripts se cargan en el siguiente orden en `uni-organizado.html`:

1. **datos.js** - Primero, para que todos los módulos tengan acceso a los datos
2. **ui-modales.js** - Funciones de UI que otros módulos pueden usar
3. **mapa.js** - Funcionalidades del mapa
4. **transporte.js** - Sistema de transporte
5. **servicios.js** - Empleo y negocios
6. **comunidad.js** - Foro y chat
7. **configuracion.js** - Ajustes y calendario
8. **navegacion.js** - Último, inicializa la app cuando el DOM está listo

## 🎯 Ventajas de esta Estructura

✅ **Modularidad**: Cada archivo tiene una responsabilidad específica
✅ **Mantenibilidad**: Fácil encontrar y modificar código
✅ **Escalabilidad**: Agregar nuevas funcionalidades es más sencillo
✅ **Colaboración**: Varios desarrolladores pueden trabajar en diferentes módulos
✅ **Debugging**: Más fácil identificar y corregir errores

## 🚀 Cómo Usar

1. Abre `uni-organizado.html` en tu navegador
2. Todos los módulos se cargarán automáticamente
3. La aplicación funcionará igual que antes, pero con código más organizado

## 📝 Notas

- Todos los archivos JavaScript están en la carpeta `js/`
- Los estilos están centralizados en `uni-styles.css`
- El HTML está limpio y solo contiene la estructura
- Las dependencias externas (Leaflet, Font Awesome) se cargan desde CDN
