# Especificaciones Técnicas del Sistema

## Descripción General

Sistema web de monitoreo en tiempo real de vuelos comerciales sobre la Ciudad de México, integrando:

- API pública de OpenSky Network
- Base de datos MongoDB
- Sistema de monitoreo Zabbix Cloud
- Interfaz web interactiva con React + TypeScript

## Arquitectura del Sistema

```
┌─────────────────┐
│   OpenSky API   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│  Backend Python │◄────►│   MongoDB    │
│  (Flask/FastAPI)│      │   Database   │
└────────┬────────┘      └──────────────┘
         │
         │◄────────────────┐
         │                 │
         ▼                 ▼
┌─────────────────┐   ┌──────────────┐
│  Zabbix Cloud   │   │  WebSocket   │
│   Monitoring    │   │   Server     │
└─────────────────┘   └──────┬───────┘
                             │
                             ▼
                      ┌──────────────┐
                      │  Frontend    │
                      │ React + TS   │
                      └──────────────┘
```

## Componentes Frontend

### Tecnologías Principales

| Tecnología       | Versión | Propósito               |
| ---------------- | ------- | ----------------------- |
| React            | 19.1.1  | Framework UI            |
| TypeScript       | 5.9.3   | Tipado estático         |
| Vite             | 7.1.7   | Build tool & dev server |
| Tailwind CSS     | 3.x     | Estilos                 |
| Leaflet          | 1.9.4   | Mapas interactivos      |
| Recharts         | 3.3.0   | Gráficos                |
| Socket.io Client | 4.8.1   | WebSocket               |
| Axios            | 1.13.2  | HTTP client             |

### Componentes Principales

#### 1. StatusCard

- **Propósito**: Mostrar estado del sistema (API, DB, Zabbix)
- **Props**: `status: SystemStatus | null`, `loading: boolean`
- **Features**:
  - Indicadores visuales de estado
  - Actualización automática cada 10s
  - Contador de registros totales

#### 2. FlightMap

- **Propósito**: Visualización geográfica de vuelos
- **Props**: `flights: FlightData[]`
- **Features**:
  - Mapa interactivo con Leaflet
  - Marcadores dinámicos de aviones
  - Popups con información detallada
  - Auto-zoom a área con vuelos
  - Centro: CDMX (19.4326, -99.1332)

#### 3. FlightList

- **Propósito**: Lista detallada de vuelos
- **Props**: `flights: FlightData[]`, `loading: boolean`
- **Features**:
  - Búsqueda y filtrado
  - Vista expandible por vuelo
  - Información detallada de cada vuelo
  - Scroll virtual para rendimiento

#### 4. FlightStatsChart

- **Propósito**: Estadísticas visuales
- **Props**: `flights: FlightData[]`
- **Features**:
  - Gráfico de barras (vuelos por país)
  - Gráfico de pastel (distribución)
  - Métricas calculadas en tiempo real
  - Responsive design

#### 5. ZabbixAlerts

- **Propósito**: Panel de alertas y notificaciones
- **Props**: `alerts: ZabbixAlert[]`, handlers
- **Features**:
  - 4 tipos de alertas (info, warning, error, success)
  - Timestamps relativos
  - Acciones asociadas
  - Limpieza individual y masiva

#### 6. ConnectionStatus

- **Propósito**: Indicador de conexión WebSocket
- **Features**:
  - Verificación cada 2s
  - Indicador visual animado
  - Estados: conectado/desconectado

### Custom Hooks

#### useFlights()

```typescript
{
  flights: FlightData[],
  loading: boolean,
  error: string | null,
  refetch: () => void
}
```

- Fetch inicial de vuelos
- Actualización automática cada 30s
- Escucha eventos WebSocket
- Manejo de errores

#### useSystemStatus()

```typescript
{
  status: SystemStatus | null,
  loading: boolean,
  refetch: () => void
}
```

- Fetch inicial de estado
- Actualización automática cada 10s
- Escucha eventos WebSocket

#### useZabbixAlerts()

```typescript
{
  alerts: ZabbixAlert[],
  clearAlerts: () => void,
  removeAlert: (id: string) => void
}
```

- Gestión de alertas en tiempo real
- Límite configurable de alertas
- Limpieza manual

### Servicios

#### API Service (`services/api.ts`)

- Cliente HTTP con Axios
- Interceptores de error
- Endpoints tipados
- Timeout configurado (10s)

#### WebSocket Service (`services/websocket.ts`)

- Cliente Socket.io
- Gestión de conexión/desconexión
- Sistema de eventos pub/sub
- Reconexión automática
- Múltiples listeners por evento

### Utilidades

#### Formatters (`utils/formatters.ts`)

- `formatDate()`: Formateo de fechas
- `formatTimeAgo()`: Tiempo relativo
- `formatAltitude()`: Metros a pies
- `formatVelocity()`: m/s a km/h
- `formatHeading()`: Grados a dirección cardinal
- `formatCallsign()`: Normalización de códigos

## Tipos de Datos

### FlightData

```typescript
{
  icao24: string; // Código ICAO24 único
  callsign: string; // Código de vuelo
  origin_country: string; // País de origen
  latitude: number; // Coordenada latitud
  longitude: number; // Coordenada longitud
  altitude: number; // Altitud en metros
  velocity: number; // Velocidad en m/s
  heading: number; // Rumbo en grados
  on_ground: boolean; // Estado en tierra
  last_contact: Date; // Último contacto
}
```

### SystemStatus

```typescript
{
  api_status: "online" | "offline" | "error";
  database_status: "online" | "offline" | "error";
  zabbix_status: "online" | "offline" | "error";
  last_update: Date;
  total_records: number;
}
```

### ZabbixAlert

```typescript
{
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: Date;
  action?: string;
}
```

## Configuración

### Variables de Entorno

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### Tailwind Configuration

- Purge: `["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]`
- Plugins: Ninguno por defecto
- Theme: Default extendido

### TypeScript Configuration

- Target: ES2020
- Module: ESNext
- Strict mode: Habilitado
- JSX: react-jsx

## Performance

### Optimizaciones Implementadas

1. **Lazy loading**: Componentes cargados bajo demanda
2. **Memoization**: useMemo para cálculos costosos
3. **Debouncing**: Búsqueda en FlightList
4. **Virtual scrolling**: Listas grandes
5. **Code splitting**: Chunks automáticos con Vite

### Métricas Objetivo

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Bundle size: < 500KB (gzipped)

## Seguridad

### Medidas Implementadas

1. TypeScript para validación de tipos
2. Sanitización de inputs
3. HTTPS en producción (recomendado)
4. CORS configurado en backend
5. No almacenar datos sensibles en localStorage

### Recomendaciones Futuras

- Implementar autenticación JWT
- Rate limiting en API
- Validación de esquemas con Zod
- Content Security Policy

## Testing (Recomendado)

### Herramientas Sugeridas

- **Unit Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright
- **Component Tests**: Storybook

### Áreas Críticas para Testing

1. Servicios de API
2. Custom hooks
3. Componentes de visualización
4. WebSocket connections
5. Formatters

## Deployment

### Build para Producción

```bash
npm run build
```

### Optimizaciones de Build

- Minificación automática
- Tree shaking
- Asset optimization
- Source maps (opcional)

### Plataformas Recomendadas

- Vercel (recomendado)
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## Monitoreo y Logs

### Console Logs

- Conexión/desconexión WebSocket
- Errores de API
- Eventos recibidos (desarrollo)

### Métricas a Monitorear

- Tasa de error de API
- Latencia de WebSocket
- Tiempo de carga de componentes
- Errores de JavaScript

## Mantenimiento

### Actualizaciones Regulares

- Dependencias de npm (mensual)
- React y ecosystem (según releases)
- Parches de seguridad (inmediato)

### Backlog de Mejoras

- [ ] Modo oscuro
- [ ] Exportación de datos (CSV/JSON)
- [ ] Filtros avanzados
- [ ] Historial de vuelos
- [ ] Notificaciones push
- [ ] PWA support
- [ ] Internacionalización (i18n)

## Documentación de Referencia

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Leaflet Docs](https://leafletjs.com/reference.html)
- [Socket.io Client](https://socket.io/docs/v4/client-api/)
