# Navegación y Modos de Operación

## 🏠 Páginas Disponibles

### Homepage (Landing Page)

- **Ruta**: `/`
- **Descripción**: Página de inicio elegante con diseño inspirado en aviación de negocios
- **Características**:
  - Paleta de colores tierra/oro
  - Animación de entrada con avión
  - Tipografía serif elegante (Playfair Display)
  - Información de contacto
  - Botón para acceder al Dashboard

### Dashboard

- **Ruta**: `/dashboard`
- **Descripción**: Panel de monitoreo de vuelos en tiempo real
- **Características**:
  - Mapa interactivo con Leaflet
  - Lista de vuelos con búsqueda
  - Gráficas estadísticas
  - Estado del sistema (API, MongoDB, Zabbix)
  - Alertas de Zabbix
  - Indicador de conexión WebSocket

## 🔄 Modos de Operación

### Modo DEMO (Actual)

Usa datos simulados sin necesidad de backend.

**Archivo activo**: `index.html` → `src/main.demo.tsx` → `DashboardPage.demo.tsx`

### Modo REAL (Con Backend)

Conecta a los servicios reales (OpenSky API, MongoDB, Zabbix Cloud).

**Para activar**:

1. Edita `index.html`
2. Cambia la línea:
   ```html
   <script type="module" src="/src/main.demo.tsx"></script>
   ```
   Por:
   ```html
   <script type="module" src="/src/main.tsx"></script>
   ```

## 🎨 Personalización de Colores

### Paleta Oro/Tierra (Homepage)

```js
// Tailwind config
colors: {
  gold: {
    500: '#D4AF37', // Oro principal
  },
  earth: {
    500: '#8B7355', // Tierra principal
  }
}
```

### Uso en componentes

```tsx
// Fondo degradado oro/tierra
className = "bg-gradient-to-br from-amber-900 via-stone-800 to-neutral-900";

// Texto dorado
className = "text-amber-400";

// Botones
className = "bg-amber-600 hover:bg-amber-500";
```

## 🚀 Comandos

### Desarrollo

```bash
npm run dev
```

Inicia servidor en `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 📱 Navegación

### Desde Homepage → Dashboard

```tsx
navigate("/dashboard");
```

### Desde Dashboard → Homepage

```tsx
navigate("/");
```

## 🎭 Animaciones (Framer Motion)

### Entrada de página

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

### Avión flotante

```tsx
<motion.div
  animate={{
    y: [0, -20, 0],
    rotate: [0, 2, 0]
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
```

### Hover en botones

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

## 📂 Estructura de Archivos

```
src/
├── pages/
│   ├── HomePage.tsx           # Landing page elegante
│   ├── DashboardPage.tsx      # Dashboard con datos reales
│   └── DashboardPage.demo.tsx # Dashboard con datos simulados
├── components/               # Componentes reutilizables
├── hooks/                    # Custom hooks
├── services/                 # API y WebSocket
├── utils/                    # Utilidades y datos mock
├── main.tsx                  # Entry point modo REAL
└── main.demo.tsx             # Entry point modo DEMO
```

## 🔧 Próximos Pasos

1. **Backend Python**: Implementar servidor con FastAPI/Flask
2. **MongoDB**: Configurar base de datos y conexión
3. **Zabbix Cloud**: Integrar alertas y monitoreo
4. **OpenSky API**: Conectar flujo de datos en tiempo real
5. **WebSocket**: Implementar servidor Socket.io
6. **Autenticación**: Agregar login/registro si es necesario

Ver `BACKEND_INTEGRATION.md` para más detalles sobre la integración del backend.
