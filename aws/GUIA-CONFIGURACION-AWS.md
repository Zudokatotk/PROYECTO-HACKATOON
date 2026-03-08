# Guía de Configuración AWS para Foro de Comunidad

Esta guía te llevará paso a paso para configurar DynamoDB, Lambda y API Gateway.

## Paso 1: Crear Tabla en DynamoDB

1. Ve a la consola de AWS: https://console.aws.amazon.com/
2. Busca "DynamoDB" en el buscador superior
3. Click en "Crear tabla"
4. Configura así:
   - **Nombre de tabla**: `ForoMujeres`
   - **Clave de partición**: `id` (tipo: String)
   - Deja todo lo demás por defecto
5. Click en "Crear tabla"
6. Espera 1-2 minutos a que se cree

## Paso 2: Crear Función Lambda

1. Busca "Lambda" en el buscador de AWS
2. Click en "Crear función"
3. Selecciona "Crear desde cero"
4. Configura:
   - **Nombre de función**: `ForoMujeresAPI`
   - **Tiempo de ejecución**: Node.js 20.x (o cualquier versión disponible: 20.x, 22.x, 24.x)
   - **Arquitectura**: x86_64
5. En "Permisos", expande "Cambiar el rol de ejecución predeterminado"
6. Selecciona "Crear un nuevo rol con permisos básicos de Lambda"
7. Click en "Crear función"

### Configurar el código Lambda:

1. Una vez creada, verás el editor de código
2. Borra todo el código que aparece
3. Copia y pega el contenido del archivo `lambda-function.js` que creé
4. Click en "Deploy" (botón naranja arriba)

### Dar permisos a Lambda para acceder a DynamoDB:

1. Ve a la pestaña "Configuración"
2. Click en "Permisos" en el menú lateral
3. Click en el nombre del rol (algo como `ForoMujeresAPI-role-xxxxx`)
4. Se abrirá IAM en una nueva pestaña
5. Click en "Agregar permisos" → "Asociar políticas"
6. Busca `AmazonDynamoDBFullAccess`
7. Marca el checkbox y click en "Agregar permisos"

## Paso 3: Crear API Gateway

1. Busca "API Gateway" en AWS
2. Click en "Crear API"
3. Selecciona "API REST" (no HTTP API)
4. Click en "Crear"
5. Configura:
   - **Tipo de protocolo**: REST
   - **Crear nueva API**: Nueva API
   - **Nombre de API**: `ForoMujeresAPI`
   - **Tipo de punto de enlace**: Regional
6. Click en "Crear API"

### Configurar recursos y métodos:

#### Crear recurso para mensajes:

1. Click en "Acciones" → "Crear recurso"
2. Configura:
   - **Nombre del recurso**: `mensajes`
   - **Ruta del recurso**: `/mensajes`
   - Marca "Habilitar CORS de API Gateway"
3. Click en "Crear recurso"

#### Agregar método POST:

1. Con `/mensajes` seleccionado, click en "Acciones" → "Crear método"
2. Selecciona "POST" del dropdown y click en el check ✓
3. Configura:
   - **Tipo de integración**: Función de Lambda
   - **Usar integración de proxy de Lambda**: ✓ (marcado)
   - **Región de Lambda**: tu región (ej: us-east-1)
   - **Función de Lambda**: `ForoMujeresAPI`
4. Click en "Guardar"
5. Click en "Aceptar" cuando pregunte sobre permisos

#### Agregar método GET:

1. Con `/mensajes` seleccionado, click en "Acciones" → "Crear método"
2. Selecciona "GET" del dropdown y click en el check ✓
3. Configura igual que POST:
   - **Tipo de integración**: Función de Lambda
   - **Usar integración de proxy de Lambda**: ✓
   - **Función de Lambda**: `ForoMujeresAPI`
4. Click en "Guardar" y "Aceptar"

#### Habilitar CORS:

1. Con `/mensajes` seleccionado, click en "Acciones" → "Habilitar CORS"
2. Deja los valores por defecto
3. Click en "Habilitar CORS y reemplazar encabezados CORS existentes"
4. Click en "Sí, reemplazar encabezados CORS existentes"

### Desplegar la API:

1. Click en "Acciones" → "Implementar la API"
2. Configura:
   - **Etapa de implementación**: [Nueva etapa]
   - **Nombre de la etapa**: `prod`
3. Click en "Implementar"
4. **IMPORTANTE**: Copia la "URL de invocación" que aparece arriba (algo como: `https://xxxxxx.execute-api.us-east-1.amazonaws.com/prod`)

## Paso 4: Actualizar tu código JavaScript

Tu URL completa será: `https://xxxxxx.execute-api.us-east-1.amazonaws.com/prod/mensajes`

Reemplaza la URL en `comunidad.js` con tu URL real.

## Probar la API

### Desde el navegador (GET):
Abre en tu navegador: `https://TU-URL.execute-api.us-east-1.amazonaws.com/prod/mensajes`

Deberías ver: `{"success":true,"mensajes":[]}`

### Desde Postman o curl (POST):
```bash
curl -X POST https://TU-URL.execute-api.us-east-1.amazonaws.com/prod/mensajes \
  -H "Content-Type: application/json" \
  -d '{"usuario":"Test","mensaje":"Hola mundo","avatar":"https://example.com/avatar.png"}'
```

## Solución de Problemas Comunes

### Error 403 Forbidden:
- Verifica que habilitaste CORS correctamente
- Asegúrate de haber desplegado la API después de hacer cambios

### Error 500 Internal Server Error:
- Ve a CloudWatch Logs para ver los errores de Lambda
- Verifica que Lambda tenga permisos de DynamoDB
- Revisa que el nombre de la tabla sea correcto

### No se guardan los mensajes:
- Ve a DynamoDB y verifica que la tabla existe
- Revisa los logs de Lambda en CloudWatch

### CORS errors en el navegador:
- Asegúrate de habilitar CORS en API Gateway
- Despliega la API nuevamente después de habilitar CORS

## Costos

Con el nivel gratuito de AWS:
- DynamoDB: 25 GB de almacenamiento gratis
- Lambda: 1 millón de solicitudes gratis al mes
- API Gateway: 1 millón de llamadas gratis al mes

Para una demo, esto es completamente GRATIS.
