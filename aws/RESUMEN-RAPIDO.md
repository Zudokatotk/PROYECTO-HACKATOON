# 🚀 Resumen Rápido - Configuración AWS

## Lo que creamos:

1. **DynamoDB** - Base de datos para guardar mensajes
2. **Lambda** - Función que maneja la lógica (crear/leer mensajes)
3. **API Gateway** - API REST que expone endpoints HTTPS

## Pasos en orden:

### 1️⃣ DynamoDB (2 minutos)
- Crear tabla `ForoMujeres`
- Clave: `id` (String)

### 2️⃣ Lambda (5 minutos)
- Crear función `ForoMujeresAPI`
- Runtime: Node.js 20.x (o la versión más reciente disponible: 20.x, 22.x, 24.x)
- Copiar código de `lambda-function.js`
- Dar permisos DynamoDB (IAM → AmazonDynamoDBFullAccess)

### 3️⃣ API Gateway (5 minutos)
- Crear API REST `ForoMujeresAPI`
- Crear recurso `/mensajes`
- Agregar métodos POST y GET
- Conectar con Lambda
- Habilitar CORS
- Desplegar en etapa `prod`
- **COPIAR LA URL**

### 4️⃣ Actualizar código (1 minuto)
En `programa/js/comunidad.js`, línea 5:
```javascript
const API_URL = 'TU-URL-AQUI/mensajes';
```

## Probar:

1. Abre `programa/aws/test-api.html` en tu navegador
2. Pega tu URL de API Gateway
3. Haz click en "Test Completo"
4. Si ves ✅ = Todo funciona!

## Tu URL será algo como:
```
https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/mensajes
```

## Errores comunes:

| Error | Solución |
|-------|----------|
| 403 Forbidden | Habilitar CORS y redesplegar API |
| 500 Internal | Verificar permisos Lambda → DynamoDB |
| No se guarda | Verificar nombre tabla = `ForoMujeres` |
| CORS error | Redesplegar API después de habilitar CORS |

## Ver logs de errores:
1. Ve a CloudWatch en AWS
2. Busca `/aws/lambda/ForoMujeresAPI`
3. Revisa los logs más recientes

## Costo:
**GRATIS** con nivel gratuito de AWS (suficiente para demo)

## Siguiente paso:
Una vez que funcione el test, tu app sincronizará datos entre todos los dispositivos automáticamente. El jurado podrá dejar reseñas desde su celular y se verán en tiempo real en todos los dispositivos.
