# 🚀 Inicio Rápido

## Opción 1: Modo Demo (Sin Backend)

Para ver la aplicación funcionando con datos simulados:

1. Abrir `src/main.tsx`
2. Comentar la línea: `import App from './App.tsx'`
3. Descomentar la línea: `import App from './App.demo.tsx'`
4. Ejecutar:

```bash
npm run dev
```

## Opción 2: Modo Producción (Con Backend)

### Prerequisitos

- Backend Python corriendo en `http://localhost:5000`
- MongoDB configurado
- Zabbix Cloud configurado

### Pasos

1. **Configurar variables de entorno**

```bash
# Copiar el archivo de ejemplo
copy .env.example .env

# Editar .env con tus configuraciones
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

2. **Instalar dependencias** (si aún no lo hiciste)

```bash
npm install
```

3. **Iniciar servidor de desarrollo**

```bash
npm run dev
```

4. **Abrir en el navegador**

```
http://localhost:5173
```

## Comandos Disponibles

### Desarrollo

```bash
npm run dev          # Inicia servidor de desarrollo
```

### Producción

```bash
npm run build        # Construye para producción
npm run preview      # Previsualiza build de producción
```

### Calidad de Código

```bash
npm run lint         # Ejecuta ESLint
```

## Verificación del Backend

Antes de iniciar la aplicación, verifica que el backend esté funcionando:

```bash
# Health check
curl http://localhost:5000/api/health

# Obtener vuelos
curl http://localhost:5000/api/flights/active

# Estado del sistema
curl http://localhost:5000/api/system/status
```

## Problemas Comunes

### 1. "Network Error" al cargar

- ✅ Verifica que el backend esté corriendo
- ✅ Revisa las URLs en el archivo `.env`
- ✅ Asegúrate de que CORS esté habilitado en el backend

### 2. Mapa no se muestra

- ✅ Verifica que los vuelos tengan coordenadas válidas
- ✅ Abre la consola del navegador para ver errores

### 3. WebSocket no conecta

- ✅ Verifica que Socket.IO esté configurado en el backend
- ✅ Revisa que `VITE_SOCKET_URL` sea correcta
- ✅ Comprueba que no haya firewall bloqueando la conexión

## Estructura de Carpetas

```
src/
├── components/     # Componentes React reutilizables
├── hooks/         # Custom hooks de React
├── services/      # Servicios de API y WebSocket
├── types/         # Tipos de TypeScript
├── utils/         # Funciones de utilidad
├── App.tsx        # Aplicación principal (con backend)
└── App.demo.tsx   # Aplicación demo (sin backend)
```

## Próximos Pasos

1. ✅ Configurar el backend Python
2. ✅ Configurar MongoDB
3. ✅ Integrar Zabbix Cloud
4. ✅ Conectar OpenSky API
5. ✅ Probar la aplicación completa

## Recursos

- [Documentación de Integración Backend](./BACKEND_INTEGRATION.md)
- [README Principal](./README.md)
- [OpenSky API Documentation](https://openskynetwork.github.io/opensky-api/)
- [Zabbix Cloud](https://www.zabbix.com/cloud)

## Soporte

Para problemas o preguntas, revisa:

1. Los logs del navegador (F12 → Console)
2. Los logs del backend
3. La documentación en `BACKEND_INTEGRATION.md`
