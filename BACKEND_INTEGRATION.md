# Guía de Integración Backend - Frontend

Esta guía explica cómo integrar el frontend con el backend Python.

## Configuración del Backend

El backend debe exponer los siguientes endpoints y eventos WebSocket.

### Endpoints REST

#### 1. Obtener Vuelos Activos

```
GET /api/flights/active
```

**Respuesta esperada:**

```json
{
  "success": true,
  "data": [
    {
      "icao24": "a12345",
      "callsign": "AM123",
      "origin_country": "Mexico",
      "latitude": 19.4326,
      "longitude": -99.1332,
      "altitude": 10000,
      "velocity": 250,
      "heading": 45,
      "on_ground": false,
      "last_contact": "2025-11-06T18:00:00.000Z"
    }
  ]
}
```

#### 2. Obtener Estadísticas

```
GET /api/flights/stats
```

**Respuesta esperada:**

```json
{
  "success": true,
  "data": {
    "total_flights": 15,
    "active_flights": 12,
    "average_altitude": 10500,
    "average_velocity": 250,
    "countries": {
      "Mexico": 5,
      "United States": 4,
      "Spain": 2,
      "Canada": 1
    }
  }
}
```

#### 3. Estado del Sistema

```
GET /api/system/status
```

**Respuesta esperada:**

```json
{
  "success": true,
  "data": {
    "api_status": "online",
    "database_status": "online",
    "zabbix_status": "online",
    "last_update": "2025-11-06T18:00:00.000Z",
    "total_records": 1523
  }
}
```

#### 4. Health Check

```
GET /api/health
```

**Respuesta esperada:**

```json
{
  "status": "ok"
}
```

### WebSocket Events

El backend debe emitir los siguientes eventos a través de Socket.io:

#### 1. Actualización de Vuelo Individual

```javascript
socket.emit("flight_update", {
  icao24: "a12345",
  callsign: "AM123",
  origin_country: "Mexico",
  latitude: 19.4326,
  longitude: -99.1332,
  altitude: 10000,
  velocity: 250,
  heading: 45,
  on_ground: false,
  last_contact: "2025-11-06T18:00:00.000Z",
});
```

#### 2. Actualización Masiva de Vuelos

```javascript
socket.emit("flights_batch", [
  {
    /* flight 1 */
  },
  {
    /* flight 2 */
  },
  // ... más vuelos
]);
```

#### 3. Alertas de Zabbix

```javascript
socket.emit("zabbix_alert", {
  id: "unique-id-123",
  type: "info", // "info" | "warning" | "error" | "success"
  message: "Nuevo vuelo detectado: AM123",
  timestamp: "2025-11-06T18:00:00.000Z",
  action: "Registro automático en base de datos", // opcional
});
```

#### 4. Actualización de Estado del Sistema

```javascript
socket.emit("system_status", {
  api_status: "online",
  database_status: "online",
  zabbix_status: "online",
  last_update: "2025-11-06T18:00:00.000Z",
  total_records: 1523,
});
```

#### 5. Actualización del Contador de Vuelos

```javascript
socket.emit("flight_count_update", 15);
```

## Ejemplo de Backend con Python

### Usando Flask + Flask-SocketIO

```python
from flask import Flask, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Endpoint REST
@app.route('/api/flights/active')
def get_active_flights():
    # Aquí iría la lógica para obtener vuelos de MongoDB
    flights = [
        {
            "icao24": "a12345",
            "callsign": "AM123",
            "origin_country": "Mexico",
            "latitude": 19.4326,
            "longitude": -99.1332,
            "altitude": 10000,
            "velocity": 250,
            "heading": 45,
            "on_ground": False,
            "last_contact": datetime.now().isoformat()
        }
    ]
    return jsonify({"success": True, "data": flights})

@app.route('/api/system/status')
def get_system_status():
    status = {
        "api_status": "online",
        "database_status": "online",
        "zabbix_status": "online",
        "last_update": datetime.now().isoformat(),
        "total_records": 1523
    }
    return jsonify({"success": True, "data": status})

@app.route('/api/health')
def health_check():
    return jsonify({"status": "ok"})

# WebSocket
@socketio.on('connect')
def handle_connect():
    print('Client connected')
    # Emitir datos iniciales
    emit('flights_batch', get_flights_from_db())

def emit_flight_update(flight_data):
    """Función para emitir actualizaciones de vuelos"""
    socketio.emit('flight_update', flight_data)

def emit_zabbix_alert(alert_data):
    """Función para emitir alertas de Zabbix"""
    socketio.emit('zabbix_alert', alert_data)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
```

## Configuración de CORS

Asegúrate de que el backend permita peticiones desde el frontend:

```python
from flask_cors import CORS

CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type"]
    }
})
```

## Variables de Entorno en el Frontend

Crea un archivo `.env` en la raíz del proyecto frontend:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Para producción:

```env
VITE_API_BASE_URL=https://tu-backend.com/api
VITE_SOCKET_URL=https://tu-backend.com
```

## Flujo de Datos

```
OpenSky API
    ↓
Backend Python
    ↓
MongoDB (almacenamiento)
    ↓
Zabbix (monitoreo) → Alertas
    ↓
WebSocket + REST API
    ↓
Frontend React
```

## Testing de la Integración

### 1. Verificar Backend está corriendo

```bash
curl http://localhost:5000/api/health
```

### 2. Probar Endpoint de Vuelos

```bash
curl http://localhost:5000/api/flights/active
```

### 3. Probar WebSocket

Usar una herramienta como [Socket.IO Client Tool](https://amritb.github.io/socketio-client-tool/) para conectarse a `http://localhost:5000` y escuchar eventos.

## Troubleshooting

### Error: "Network Error" o "CORS"

- Verifica que el backend tenga CORS habilitado
- Asegúrate de que las URLs en `.env` sean correctas
- Revisa que el backend esté corriendo en el puerto correcto

### Error: "WebSocket connection failed"

- Verifica que Socket.IO esté configurado en el backend
- Asegúrate de que el puerto WebSocket esté abierto
- Revisa los logs del backend para errores

### No se muestran datos

- Verifica que el backend esté devolviendo datos en el formato correcto
- Abre la consola del navegador (F12) para ver errores de JavaScript
- Revisa la pestaña Network para ver las peticiones HTTP

## Próximos Pasos

1. Implementar autenticación (JWT)
2. Agregar caché en el frontend (React Query)
3. Implementar reconexión automática de WebSocket
4. Agregar más métricas y visualizaciones
5. Implementar exportación de datos (CSV, JSON)
