// ==========================================
// BASE DE DATOS PRINCIPAL
// ==========================================

let coordActuales = [-19.0431, -65.2592]; 

let datosSeguros = [
    { nombre: "Farmacia 'La Paz'", distancia: "200m", lat: -19.0415, lng: -65.2580 }, 
    { nombre: "Centro Apoyo Mujer", distancia: "400m", lat: -19.0425, lng: -65.2620 }, 
    { nombre: "Estación Policial", distancia: "1km", lat: -19.0460, lng: -65.2610 }
];

let datosAlertas = [
    { nombre: "Camila R.", verificada: true, avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png", tiempo: "Hace 5 min", texto: "Falta de iluminación en el callejón de la calle Calvo.", lat: -19.0481, lng: -65.2570 },
    { nombre: "Sofía M.", verificada: true, avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140046.png", tiempo: "Hace 45 min", texto: "Hay un grupo de personas bebiendo cerca del Mercado Central.", lat: -19.0390, lng: -65.2560 },
    { nombre: "Mariana L.", verificada: false, avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140045.png", tiempo: "Hace 1 hora", texto: "Tráfico muy pesado por la plazuela Zudáñez, mejor tomen desvíos.", lat: -19.0420, lng: -65.2540 }
];

let datosChat = [
    { nombre: "Andrea V.", verificada: true, avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140043.png", tiempo: "Hace 10 min", texto: "Chicas, acabo de usar la app para pedir transporte y la conductora Elena es súper amable. ¡Me sentí muy segura!" },
    { nombre: "Carla T.", verificada: true, avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140041.png", tiempo: "Hace 20 min", texto: "Chicas, ¿alguien conoce una buena dermatóloga por la zona central?" },
    { nombre: "Lucía P.", verificada: true, avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140039.png", tiempo: "Hace 30 min", texto: "¡Hola a todas! Me acabo de unir a la app y me parece genial tener esta red de apoyo entre nosotras." },
    { nombre: "Usuaria Anónima", verificada: true, avatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png", tiempo: "Hace 1 hora", texto: "¿Alguien sabe si la farmacia del centro sigue abierta? Necesito ir pero me da miedo caminar sola." }
];

let datosTrabajadoras = [
    { nombre: "Marta Llanos", especialidad: "Plomería y Reparaciones del Hogar", categoria: "Plomería", color: "#e8daef", fontColor: "#8e44ad", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140039.png", estrellas: "4.8", trabajos: "(45 trabajos)" },
    { nombre: "Julia C.", especialidad: "Niñera certificada con primeros auxilios", categoria: "Niñera", color: "#e0f7fa", fontColor: "#00838f", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140041.png", estrellas: "5.0", trabajos: "(120 trabajos)" },
    { nombre: "Rosmery S.", especialidad: "Niñera para cuidado nocturno", categoria: "Niñera", color: "#e0f7fa", fontColor: "#00838f", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140042.png", estrellas: "4.9", trabajos: "(80 trabajos)" },
    { nombre: "Claudia P.", especialidad: "Niñera y apoyo escolar básico", categoria: "Niñera", color: "#e0f7fa", fontColor: "#00838f", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140043.png", estrellas: "4.7", trabajos: "(34 trabajos)" },
    { nombre: "Sonia T.", especialidad: "Venta de ropa importada de segunda mano", categoria: "Venta de Ropa", color: "#fce4ec", fontColor: "#c2185b", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140045.png", estrellas: "4.9", trabajos: "(50 ventas)" },
    { nombre: "Luciana V.", especialidad: "Venta de ropa deportiva para mujer", categoria: "Venta de Ropa", color: "#fce4ec", fontColor: "#c2185b", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140046.png", estrellas: "5.0", trabajos: "(200 ventas)" },
    { nombre: "Daniela R.", especialidad: "Venta de ropa tejida a mano", categoria: "Venta de Ropa", color: "#fce4ec", fontColor: "#c2185b", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png", estrellas: "4.8", trabajos: "(15 ventas)" }
];

let datosNegocios = [
    { nombre: "Dra. Verónica M.", tags: "salud ginecologia doctora", detalle: "Ginecología y Obstetricia. Atención empática.", tipo: "Ginecología", color: "#ffebee", fontColor: "#c62828", avatar: "https://cdn-icons-png.flaticon.com/512/3421/3421063.png", estrellas: "4.9", coords: [-19.045, -65.260] },
    { nombre: "Dra. Elena S.", tags: "salud dermatologia doctora", detalle: "Dermatología clínica y estética.", tipo: "Dermatóloga", color: "#ffebee", fontColor: "#c62828", avatar: "https://cdn-icons-png.flaticon.com/512/3421/3421063.png", estrellas: "5.0", coords: [-19.041, -65.258] },
    { nombre: "Centro Médico Mujer", tags: "salud clinica", detalle: "Atención integral de salud para mujeres.", tipo: "Clínica", color: "#ffebee", fontColor: "#c62828", avatar: "https://cdn-icons-png.flaticon.com/512/3421/3421063.png", estrellas: "4.8", coords: [-19.048, -65.262] },
    { nombre: "Salón Divas", tags: "belleza salon uñas peluqueria", detalle: "Especialistas en uñas acrílicas y tintes.", tipo: "Peluquería", color: "#fce4ec", fontColor: "#c2185b", avatar: "https://cdn-icons-png.flaticon.com/512/1973/1973688.png", estrellas: "4.7", coords: [-19.040, -65.255] },
    { nombre: "Spa Relax", tags: "belleza spa masajes", detalle: "Masajes relajantes y faciales.", tipo: "Spa", color: "#fce4ec", fontColor: "#c2185b", avatar: "https://cdn-icons-png.flaticon.com/512/1973/1973688.png", estrellas: "4.9", coords: [-19.038, -65.250] },
    { nombre: "Studio Makeup", tags: "belleza maquillaje", detalle: "Maquillaje profesional para eventos.", tipo: "Maquillaje", color: "#fce4ec", fontColor: "#c2185b", avatar: "https://cdn-icons-png.flaticon.com/512/1973/1973688.png", estrellas: "5.0", coords: [-19.046, -65.265] },
    { nombre: "Café Florín", tags: "cafeteria cafe postres restaurante", detalle: "Cafetería acogedora con wifi.", tipo: "Cafetería", color: "#fff3e0", fontColor: "#d84315", avatar: "https://cdn-icons-png.flaticon.com/512/3128/3128219.png", estrellas: "4.8", coords: [-19.043, -65.259] },
    { nombre: "La Taverne", tags: "restaurante comida almuerzo cena", detalle: "Comida local en un ambiente seguro.", tipo: "Restaurante", color: "#e8f5e9", fontColor: "#2e7d32", avatar: "https://cdn-icons-png.flaticon.com/512/3170/3170733.png", estrellas: "4.7", coords: [-19.044, -65.260] },
    { nombre: "Hostal Independencia", tags: "hotel hostal alojamiento", detalle: "Céntrico y con recepción 24hrs.", tipo: "Hotel", color: "#e3f2fd", fontColor: "#1565c0", avatar: "https://cdn-icons-png.flaticon.com/512/2933/2933772.png", estrellas: "4.9", coords: [-19.042, -65.257] }
];
