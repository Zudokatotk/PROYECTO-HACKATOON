# 🏗️ Arquitectura del Sistema

## Flujo de Datos

```
┌─────────────────┐
│   Celular del   │
│     Jurado      │
└────────┬────────┘
         │
         │ HTTPS Request
         │ POST /mensajes
         ▼
┌─────────────────────────────────────┐
│      API Gateway (AWS)              │
│  https://xxx.execute-api...         │
│                                     │
│  Endpoints:                         │
│  • POST /mensajes (crear)           │
│  • GET  /mensajes (leer)            │
└────────┬────────────────────────────┘
         │
         │ Invoca
         ▼
┌─────────────────────────────────────┐
│      Lambda Function                │
│   ForoMujeresAPI                    │
│                                     │
│  • Valida datos                     │
│  • Procesa lógica                   │
│  • Maneja errores                   │
└────────┬────────────────────────────┘
         │
         │ SDK de AWS
         ▼
┌─────────────────────────────────────┐
│      DynamoDB                       │
│   Tabla: ForoMujeres                │
│                                     │
│  Estructura:                        │
│  • id (String) - Primary Key        │
│  • usuario (String)                 │
│  • mensaje (String)                 │
│  • avatar (String)                  │
│  • timestamp (String)               │
│  • verificada (Boolean)             │
└─────────────────────────────────────┘
         │
         │ Respuesta
         ▼
┌─────────────────┐
│   Todos los     │
│   Dispositivos  │
│   (sincronizado)│
└─────────────────┘
```

## Ejemplo de Flujo Completo

### Cuando el jurado publica una reseña:

1. **Usuario escribe mensaje** en su celular
   ```
   "Excelente iniciativa para apoyar a las mujeres"
   ```

2. **Frontend envía POST** a API Gateway
   ```javascript
   POST https://xxx.execute-api.../prod/mensajes
   {
     "usuario": "Jurado María",
     "mensaje": "Excelente iniciativa...",
     "avatar": "https://..."
   }
   ```

3. **API Gateway** recibe y valida CORS, luego invoca Lambda

4. **Lambda procesa**:
   - Valida que tenga usuario y mensaje
   - Genera ID único: `1234567890`
   - Agrega timestamp: `2024-03-08T10:30:00Z`
   - Guarda en DynamoDB

5. **DynamoDB almacena**:
   ```json
   {
     "id": "1234567890",
     "usuario": "Jurado María",
     "mensaje": "Excelente iniciativa...",
     "avatar": "https://...",
     "timestamp": "2024-03-08T10:30:00Z",
     "verificada": true
   }
   ```

6. **Lambda responde** a API Gateway:
   ```json
   {
     "success": true,
     "mensaje": "Mensaje publicado correctamente"
   }
   ```

7. **API Gateway responde** al frontend con status 200

8. **Frontend actualiza** la vista mostrando el nuevo mensaje

### Cuando otro dispositivo abre el foro:

1. **Frontend envía GET** a API Gateway
   ```
   GET https://xxx.execute-api.../prod/mensajes
   ```

2. **Lambda consulta** DynamoDB (scan)

3. **DynamoDB devuelve** todos los mensajes

4. **Lambda ordena** por timestamp (más recientes primero)

5. **Frontend recibe** y muestra todos los mensajes, incluyendo el del jurado

## Ventajas de esta arquitectura:

✅ **Serverless** - No necesitas mantener servidores  
✅ **Escalable** - Soporta miles de usuarios simultáneos  
✅ **Económico** - Solo pagas por uso (gratis para demo)  
✅ **Sincronizado** - Todos ven los mismos datos en tiempo real  
✅ **Seguro** - AWS maneja la seguridad de infraestructura  
✅ **Global** - Funciona desde cualquier parte del mundo  

## Seguridad:

- **HTTPS** - Todas las comunicaciones encriptadas
- **CORS** - Solo dominios permitidos pueden acceder
- **IAM** - Lambda solo tiene permisos específicos
- **Validación** - Lambda valida datos antes de guardar

## Monitoreo:

- **CloudWatch Logs** - Todos los logs de Lambda
- **CloudWatch Metrics** - Métricas de uso y errores
- **API Gateway Dashboard** - Estadísticas de llamadas

## Costos estimados (nivel gratuito):

| Servicio | Límite Gratis | Costo después |
|----------|---------------|---------------|
| DynamoDB | 25 GB | $0.25/GB/mes |
| Lambda | 1M requests | $0.20/1M requests |
| API Gateway | 1M calls | $3.50/1M calls |

Para una demo con 100-1000 mensajes: **$0.00** (gratis)
