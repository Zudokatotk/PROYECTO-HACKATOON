# 🚀 Guía Rápida - App Segura Modular

## ✅ Archivo Principal a Usar

```
index.html  ← ABRE ESTE ARCHIVO
```

## 📂 Estructura Completa

```
📁 Proyecto/
│
├── 📄 index.html                    ← ARCHIVO PRINCIPAL
├── 📄 uni-styles.css                ← Estilos
│
├── 📁 html/                         ← Vistas HTML separadas
│   ├── modales.html                 (Modales)
│   ├── vista-permiso.html           (Permisos)
│   ├── vista-mapa.html              (🗺️ Mapa)
│   ├── vista-transporte.html        (🚗 Transporte)
│   ├── vista-servicios.html         (💼 Servicios)
│   ├── vista-comunidad.html         (👥 Comunidad)
│   └── vista-configuracion.html     (⚙️ Configuración)
│
├── 📁 js/                           ← Módulos JavaScript
    ├── datos.js                     (Base de datos)
    ├── ui-modales.js                (Modales)
    ├── mapa.js                      (🗺️ Funciones del mapa)
    ├── transporte.js                (🚗 Funciones de transporte)
    ├── servicios.js                 (💼 Funciones de servicios)
    ├── comunidad.js                 (👥 Funciones de comunidad)
    ├── configuracion.js             (⚙️ Funciones de config)
    ├── sistema-alertas.js           (🚨 Sistema de emergencia)
    ├── navegacion.js                (Navegación)
    └── cargar-vistas.js             (Cargador de vistas)
```

## 🎯 ¿Qué Archivo Editar?

### Para modificar el CONTENIDO de una sección:
- **Mapa** → `html/vista-mapa.html`
- **Transporte** → `html/vista-transporte.html`
- **Servicios** → `html/vista-servicios.html`
- **Comunidad** → `html/vista-comunidad.html`
- **Configuración** → `html/vista-configuracion.html`

### Para modificar la FUNCIONALIDAD de una sección:
- **Mapa** → `js/mapa.js`
- **Transporte** → `js/transporte.js`
- **Servicios** → `js/servicios.js`
- **Comunidad** → `js/comunidad.js`
- **Configuración** → `js/configuracion.js`

### Para modificar ESTILOS:
- **Todos los estilos** → `uni-styles.css`

### Para modificar DATOS:
- **Puntos seguros, alertas, trabajadoras, etc.** → `js/datos.js`

## 🚀 Cómo Ejecutar

### Opción 1: Python (Recomendado)
```bash
python -m http.server 8000
```
Luego abre: `http://localhost:8000`

### Opción 2: VS Code Live Server
1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

### Opción 3: Node.js
```bash
npx http-server
```

⚠️ **IMPORTANTE**: No abras el archivo directamente con `file://` porque no funcionará la carga dinámica de vistas.

## 🎨 Ventajas de esta Estructura

| Antes | Ahora |
|-------|-------|
| 1 archivo HTML gigante | 7 archivos HTML pequeños |
| 1 archivo JS gigante | 9 módulos JS organizados |
| Difícil de mantener | Fácil de mantener |
| Difícil encontrar código | Código organizado por sección |

## 📝 Ejemplo de Edición

### Quiero cambiar el texto del mapa:
1. Abre `html/vista-mapa.html`
2. Busca el texto que quieres cambiar
3. Guarda
4. Recarga el navegador

### Quiero cambiar cómo funciona el transporte:
1. Abre `js/transporte.js`
2. Modifica la función que necesitas
3. Guarda
4. Recarga el navegador

### Quiero cambiar los colores:
1. Abre `uni-styles.css`
2. Busca el color que quieres cambiar
3. Guarda
4. Recarga el navegador

## ❌ Archivos Obsoletos (Puedes Borrar)

```
❌ uni.html
❌ uni-script.js
❌ uni-organizado.html
```

Estos archivos ya no se usan. Todo está ahora en la estructura modular.

## ✅ Checklist de Archivos Necesarios

- [ ] index.html
- [ ] uni-styles.css
- [ ] html/modales.html
- [ ] html/vista-permiso.html
- [ ] html/vista-mapa.html
- [ ] html/vista-transporte.html
- [ ] html/vista-servicios.html
- [ ] html/vista-comunidad.html
- [ ] html/vista-configuracion.html
- [ ] js/datos.js
- [ ] js/ui-modales.js
- [ ] js/mapa.js
- [ ] js/transporte.js
- [ ] js/servicios.js
- [ ] js/comunidad.js
- [ ] js/configuracion.js
- [ ] js/sistema-alertas.js
- [ ] js/navegacion.js
- [ ] js/cargar-vistas.js

## 🎉 ¡Listo!

Ahora tienes una aplicación completamente modular y profesional.
