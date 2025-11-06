# Sistema de Monitoreo de Vuelos sobre Ciudad de México

Sistema web interactivo para monitorear vuelos comerciales sobre la Ciudad de México usando la API de OpenSky Network, con integración de Zabbix Cloud para monitoreo y alertas en tiempo real.

## 🚀 Características

- **Visualización en Tiempo Real**: Mapa interactivo con ubicación de vuelos activos
- **Estadísticas Detalladas**: Gráficos y métricas de vuelos en tiempo real
- **Integración con Zabbix**: Alertas y notificaciones del sistema de monitoreo
- **WebSocket**: Actualizaciones en tiempo real sin necesidad de recargar la página
- **Dashboard Completo**: Estado del sistema, API, base de datos y Zabbix
- **Diseño Responsive**: Funciona perfectamente en desktop y móvil

## 🛠️ Tecnologías

### Frontend

- **React 19** con TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **Recharts** - Gráficos y visualizaciones
- **Leaflet** - Mapas interactivos
- **Socket.io Client** - WebSockets
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos
- **date-fns** - Manejo de fechas

### Backend (Separado)

- Python + FastAPI/Flask
- MongoDB
- Zabbix Cloud Integration
- OpenSky API

## 📦 Instalación

### Requisitos Previos

- Node.js 18+
- npm o yarn

### Pasos de Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno:
   - Copiar `.env.example` a `.env`
   - Actualizar las URLs del backend según tu configuración

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
hack-itiz/
├── src/
│   ├── components/          # Componentes React
│   │   ├── ConnectionStatus.tsx
│   │   ├── FlightList.tsx
│   │   ├── FlightMap.tsx
│   │   ├── FlightStatsChart.tsx
│   │   ├── StatusCard.tsx
│   │   └── ZabbixAlerts.tsx
│   ├── hooks/              # Custom React Hooks
│   │   ├── useFlights.ts
│   │   ├── useSystemStatus.ts
│   │   └── useZabbixAlerts.ts
│   ├── services/           # Servicios de API y WebSocket
│   │   ├── api.ts
│   │   └── websocket.ts
│   ├── types/              # Definiciones de TypeScript
│   │   └── index.ts
│   ├── utils/              # Utilidades
│   │   └── formatters.ts
│   ├── App.tsx             # Componente principal
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── public/
├── .env                    # Variables de entorno
├── .env.example           # Ejemplo de variables de entorno
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🔌 API Endpoints Esperados

El frontend espera que el backend proporcione los siguientes endpoints:

### Vuelos

- `GET /api/flights/active` - Obtener vuelos activos
- `GET /api/flights/stats` - Estadísticas de vuelos
- `GET /api/flights/country/:country` - Vuelos por país
- `GET /api/flights/history?hours=24` - Historial de vuelos

### Sistema

- `GET /api/system/status` - Estado del sistema
- `GET /api/health` - Health check

### WebSocket Events

- `flight_update` - Actualización de vuelo individual
- `flights_batch` - Actualización masiva de vuelos
- `zabbix_alert` - Alertas de Zabbix
- `system_status` - Estado del sistema
- `flight_count_update` - Actualización del contador

## 🎨 Componentes Principales

### FlightMap

Mapa interactivo que muestra la ubicación de los vuelos sobre la CDMX usando Leaflet.

### FlightList

Lista detallada de todos los vuelos activos con búsqueda y filtros.

### FlightStatsChart

Gráficos estadísticos con información de vuelos por país, altitud promedio, velocidad, etc.

### StatusCard

Muestra el estado en tiempo real de la API, base de datos y Zabbix.

### ZabbixAlerts

Panel de alertas y notificaciones del sistema de monitoreo Zabbix.

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🌐 Configuración del Backend

Este frontend requiere un backend separado que:

1. **Consulte la API de OpenSky** para obtener vuelos sobre CDMX
2. **Almacene datos** en MongoDB
3. **Integre Zabbix Cloud** para monitoreo
4. **Proporcione WebSocket** para actualizaciones en tiempo real
5. **Exponga API REST** según los endpoints listados arriba

## 📝 Variables de Entorno

| Variable            | Descripción                    | Default                     |
| ------------------- | ------------------------------ | --------------------------- |
| `VITE_API_BASE_URL` | URL base de la API del backend | `http://localhost:5000/api` |
| `VITE_SOCKET_URL`   | URL del servidor WebSocket     | `http://localhost:5000`     |

## 🚀 Despliegue

### Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### Servir archivos estáticos

```bash
npm run preview
```

## 📊 Características del Sistema

### Monitoreo en Tiempo Real

- Actualización automática cada 30 segundos
- WebSocket para cambios instantáneos
- Indicador de estado de conexión

### Visualización de Datos

- Mapa interactivo con marcadores de vuelos
- Gráficos de barras y pastel
- Métricas en tiempo real

### Alertas de Zabbix

- Notificaciones en tiempo real
- Diferentes tipos de alertas (info, warning, error, success)
- Historial de alertas con timestamps

### Sistema de Búsqueda

- Búsqueda por código de vuelo
- Filtro por país
- Búsqueda por ICAO24

## 🤝 Integración con Backend

El frontend está diseñado para trabajar con un backend Python que:

1. Consulta OpenSky API cada cierto intervalo
2. Filtra vuelos sobre área de CDMX
3. Almacena datos en MongoDB
4. Emite eventos WebSocket para actualizaciones
5. Integra con Zabbix Cloud para monitoreo
6. Proporciona endpoints REST para consultas

## 📄 Licencia

Este proyecto fue desarrollado para el Hackathon ITIZ 2025.

## 👥 Equipo

Desarrollado con ❤️ para el reto de monitoreo de vuelos sobre CDMX.

---

**Nota**: Este es el proyecto frontend. El backend con Python, MongoDB y Zabbix debe configurarse por separado.
