# 📁 Carpeta AWS - Foro de Comunidad

Esta carpeta contiene todo lo necesario para implementar la sincronización de datos entre dispositivos usando AWS.

## 📄 Archivos en esta carpeta:

### 🚀 Para empezar:
1. **`CHECKLIST.md`** ⭐ **EMPIEZA AQUÍ**
   - Lista paso a paso de todo lo que debes hacer
   - Marca cada paso cuando lo completes
   - Tiempo estimado: 25-30 minutos

2. **`RESUMEN-RAPIDO.md`**
   - Vista rápida de los 4 pasos principales
   - Perfecto para tener a mano mientras configuras

### 📚 Documentación detallada:
3. **`GUIA-CONFIGURACION-AWS.md`**
   - Guía completa con capturas de pantalla descritas
   - Incluye solución de problemas comunes
   - Consulta si tienes dudas específicas

4. **`ARQUITECTURA.md`**
   - Diagrama de cómo funciona todo el sistema
   - Flujo de datos explicado
   - Útil para entender la arquitectura

### 💻 Código:
5. **`lambda-function.js`**
   - Código de la función Lambda
   - Copia y pega este código en AWS Lambda
   - Ya está listo para usar

6. **`test-api.html`**
   - Página web para probar tu API
   - Úsala ANTES de integrar con tu app
   - Te ayuda a detectar errores rápido

## 🎯 Flujo de trabajo recomendado:

```
1. Lee CHECKLIST.md
   ↓
2. Sigue los pasos uno por uno
   ↓
3. Usa test-api.html para probar
   ↓
4. Si hay errores, consulta GUIA-CONFIGURACION-AWS.md
   ↓
5. Una vez que funcione, actualiza comunidad.js
   ↓
6. ¡Listo! Tu app sincroniza datos
```

## ⚡ Quick Start (si tienes prisa):

```bash
# 1. Crear tabla DynamoDB
Nombre: ForoMujeres
Clave: id (String)

# 2. Crear Lambda
Nombre: ForoMujeresAPI
Código: copiar de lambda-function.js
Permisos: AmazonDynamoDBFullAccess

# 3. Crear API Gateway
Tipo: REST API
Recurso: /mensajes
Métodos: GET, POST
CORS: Habilitado
Desplegar: prod

# 4. Copiar URL y pegar en comunidad.js línea 5
```

## 🆘 ¿Problemas?

### Error 403:
- Habilita CORS en API Gateway
- Redesplega la API

### Error 500:
- Verifica permisos Lambda → DynamoDB
- Revisa CloudWatch Logs

### No sincroniza:
- Verifica la URL en comunidad.js
- Prueba con test-api.html primero

## 💰 Costos:

**GRATIS** para demo (nivel gratuito AWS):
- DynamoDB: 25 GB gratis
- Lambda: 1M requests gratis
- API Gateway: 1M calls gratis

## 🎓 Lo que aprenderás:

- ✅ Arquitectura serverless
- ✅ APIs REST
- ✅ Bases de datos NoSQL
- ✅ Cloud computing
- ✅ Integración frontend-backend

## 📞 Recursos adicionales:

- [Documentación AWS Lambda](https://docs.aws.amazon.com/lambda/)
- [Documentación DynamoDB](https://docs.aws.amazon.com/dynamodb/)
- [Documentación API Gateway](https://docs.aws.amazon.com/apigateway/)

## 🎉 Resultado final:

Cuando termines, tu aplicación:
- Guardará mensajes en la nube
- Sincronizará entre todos los dispositivos
- Funcionará desde cualquier celular/computadora
- Será escalable y profesional
- Impresionará al jurado

---

**¿Listo para empezar?** Abre `CHECKLIST.md` y sigue los pasos.

**¿Tienes dudas?** Consulta `GUIA-CONFIGURACION-AWS.md`.

**¿Quieres probar?** Usa `test-api.html`.

¡Éxito con tu proyecto! 🚀
