# ✅ Checklist de Implementación AWS

Sigue estos pasos en orden. Marca cada uno cuando lo completes.

## Preparación (5 min)

- [✅] Tengo una cuenta de AWS (crear en aws.amazon.com si no tienes)
- [✅] Estoy logueado en la consola de AWS
- [✅] Tengo acceso a internet estable
- [✅] He leído el archivo `RESUMEN-RAPIDO.md`

## Paso 1: DynamoDB (2 min)

- [✅] Abrir consola de DynamoDB
- [✅] Click en "Crear tabla"
- [✅] Nombre: `ForoMujeres`
- [✅] Clave de partición: `id` (tipo String)
- [✅] Click en "Crear tabla"
- [✅] Esperar a que el estado sea "Activo" (1-2 min)

## Paso 2: Lambda (5 min)

### Crear función:
- [✅] Abrir consola de Lambda
- [✅] Click en "Crear función"
- [✅] Nombre: `ForoMujeresAPI`
- [✅] Runtime: Node.js 20.x (o la más reciente: 20.x, 22.x, 24.x)
- [✅] Click en "Crear función"

### Agregar código:
- [ ] Abrir el archivo `programa/aws/lambda-function.js`
- [ ] Copiar TODO el código
- [ ] Pegar en el editor de Lambda (reemplazar todo)
- [ ] Click en "Deploy" (botón naranja)
- [ ] Esperar mensaje "Successfully deployed"

### Dar permisos:
- [ ] Click en pestaña "Configuración"
- [ ] Click en "Permisos" (menú izquierdo)
- [ ] Click en el nombre del rol (link azul)
- [ ] Se abre IAM en nueva pestaña
- [ ] Click en "Agregar permisos" → "Asociar políticas"
- [ ] Buscar: `AmazonDynamoDBFullAccess`
- [ ] Marcar checkbox
- [ ] Click en "Agregar permisos"
- [ ] Cerrar pestaña de IAM

## Paso 3: API Gateway (7 min)

### Crear API:
- [ ] Abrir consola de API Gateway
- [ ] Click en "Crear API"
- [ ] Seleccionar "API REST" (no HTTP API)
- [ ] Click en "Crear"
- [ ] Nombre: `ForoMujeresAPI`
- [ ] Tipo: Regional
- [ ] Click en "Crear API"

### Crear recurso:
- [ ] Click en "Acciones" → "Crear recurso"
- [ ] Nombre: `mensajes`
- [ ] Ruta: `/mensajes`
- [ ] ✅ Marcar "Habilitar CORS de API Gateway"
- [ ] Click en "Crear recurso"

### Agregar método POST:
- [ ] Con `/mensajes` seleccionado
- [ ] Click en "Acciones" → "Crear método"
- [ ] Seleccionar "POST" del dropdown
- [ ] Click en el check ✓
- [ ] Tipo de integración: Función de Lambda
- [ ] ✅ Marcar "Usar integración de proxy de Lambda"
- [ ] Función: `ForoMujeresAPI`
- [ ] Click en "Guardar"
- [ ] Click en "Aceptar" (permisos)

### Agregar método GET:
- [ ] Con `/mensajes` seleccionado
- [ ] Click en "Acciones" → "Crear método"
- [ ] Seleccionar "GET" del dropdown
- [ ] Click en el check ✓
- [ ] Tipo de integración: Función de Lambda
- [ ] ✅ Marcar "Usar integración de proxy de Lambda"
- [ ] Función: `ForoMujeresAPI`
- [ ] Click en "Guardar"
- [ ] Click en "Aceptar"

### Habilitar CORS:
- [ ] Con `/mensajes` seleccionado
- [ ] Click en "Acciones" → "Habilitar CORS"
- [ ] Dejar valores por defecto
- [ ] Click en "Habilitar CORS y reemplazar..."
- [ ] Click en "Sí, reemplazar..."
- [ ] Esperar a que termine (todos con ✓)

### Desplegar API:
- [ ] Click en "Acciones" → "Implementar la API"
- [ ] Etapa: [Nueva etapa]
- [ ] Nombre: `prod`
- [ ] Click en "Implementar"
- [ ] **COPIAR la "URL de invocación"** (algo como: https://abc123.execute-api.us-east-1.amazonaws.com/prod)
- [ ] Guardar esta URL en un lugar seguro

## Paso 4: Probar API (3 min)

- [ ] Abrir `programa/aws/test-api.html` en el navegador
- [ ] Pegar tu URL + `/mensajes` en el campo
  - Ejemplo: `https://abc123.execute-api.us-east-1.amazonaws.com/prod/mensajes`
- [ ] Click en "Test Completo"
- [ ] Verificar que aparezca ✅ "Test completo exitoso!"

### Si hay errores:
- [ ] Revisar `GUIA-CONFIGURACION-AWS.md` sección "Solución de Problemas"
- [ ] Verificar que CORS esté habilitado
- [ ] Verificar que Lambda tenga permisos DynamoDB
- [ ] Redesplegar la API

## Paso 5: Integrar con tu App (2 min)

- [ ] Abrir `programa/js/comunidad.js`
- [ ] Buscar línea 5: `const API_URL = ...`
- [ ] Reemplazar con tu URL completa (incluyendo `/mensajes`)
- [ ] Guardar el archivo
- [ ] Abrir `programa/index.html` en el navegador
- [ ] Ir a la sección "Red de Apoyo Local"
- [ ] Click en "Foro de Mujeres"
- [ ] Escribir un mensaje de prueba
- [ ] Click en "Publicar"
- [ ] Verificar que aparezca el mensaje

## Paso 6: Prueba Multi-Dispositivo (5 min)

- [ ] Abrir la app en tu computadora
- [ ] Abrir la app en tu celular (mismo link)
- [ ] Publicar mensaje desde la computadora
- [ ] Refrescar en el celular
- [ ] Verificar que aparezca el mensaje
- [ ] Publicar desde el celular
- [ ] Refrescar en la computadora
- [ ] Verificar sincronización

## Paso 7: Preparar para Demo (2 min)

- [ ] Limpiar mensajes de prueba (opcional)
- [ ] Verificar que funcione en modo incógnito
- [ ] Probar con diferentes usuarios (anónimo y normal)
- [ ] Verificar filtro de palabras ofensivas
- [ ] Tener la URL lista para compartir con el jurado

## 🎉 ¡Listo para la Demo!

Tu app ahora:
- ✅ Guarda datos en la nube (DynamoDB)
- ✅ Sincroniza entre dispositivos
- ✅ Funciona desde cualquier celular/computadora
- ✅ Es escalable y profesional
- ✅ Usa arquitectura serverless de AWS

## Notas para la Presentación:

Puedes decir al jurado:
- "Implementamos una arquitectura serverless con AWS"
- "Usamos DynamoDB para almacenamiento NoSQL"
- "Lambda para la lógica de negocio"
- "API Gateway para exponer endpoints REST"
- "Los datos se sincronizan en tiempo real entre dispositivos"
- "Es escalable y puede soportar miles de usuarios"

## Contacto de Emergencia:

Si algo falla durante la demo:
1. Verifica conexión a internet
2. Revisa CloudWatch Logs en AWS
3. Usa datos locales como fallback (ya está en el código)

---

**Tiempo total estimado: 25-30 minutos**

¡Mucha suerte con tu presentación! 🚀
