// ==========================================
// FUNCIÓN LAMBDA PARA FORO DE COMUNIDAD
// ==========================================
// Esta función maneja las operaciones del foro (crear y leer mensajes)

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'ForoMujeres'; // Nombre de tu tabla DynamoDB

export const handler = async (event) => {
    
    // Headers CORS para permitir acceso desde cualquier origen
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };
    
    // Manejar preflight request (OPTIONS)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: headers,
            body: ''
        };
    }
    
    try {
        // POST: Crear nuevo mensaje
        if (event.httpMethod === 'POST') {
            const body = JSON.parse(event.body);
            
            // Validar datos
            if (!body.usuario || !body.mensaje) {
                return {
                    statusCode: 400,
                    headers: headers,
                    body: JSON.stringify({ error: 'Faltan datos requeridos' })
                };
            }
            
            // Crear item para DynamoDB
            const item = {
                id: Date.now().toString(), // ID único basado en timestamp
                usuario: body.usuario,
                mensaje: body.mensaje,
                avatar: body.avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
                timestamp: new Date().toISOString(),
                verificada: true
            };
            
            // Guardar en DynamoDB
            await dynamodb.send(new PutCommand({
                TableName: TABLE_NAME,
                Item: item
            }));
            
            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({ 
                    success: true, 
                    mensaje: 'Mensaje publicado correctamente',
                    data: item
                })
            };
        }
        
        // GET: Obtener todos los mensajes
        if (event.httpMethod === 'GET') {
            const result = await dynamodb.send(new ScanCommand({
                TableName: TABLE_NAME,
                Limit: 50 // Limitar a 50 mensajes más recientes
            }));
            
            // Ordenar por timestamp descendente (más recientes primero)
            const mensajes = result.Items.sort((a, b) => 
                new Date(b.timestamp) - new Date(a.timestamp)
            );
            
            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({ 
                    success: true,
                    mensajes: mensajes
                })
            };
        }
        
        // Método no permitido
        return {
            statusCode: 405,
            headers: headers,
            body: JSON.stringify({ error: 'Método no permitido' })
        };
        
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ 
                error: 'Error interno del servidor',
                details: error.message 
            })
        };
    }
};
