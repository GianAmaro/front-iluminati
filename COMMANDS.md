# Comandos Útiles para Desarrollo

## Instalación y Setup Inicial

```bash
# Instalar dependencias
npm install

# Instalar Tailwind CSS (si no está instalado)
npm install -D tailwindcss postcss autoprefixer

# Verificar que todo está instalado correctamente
npm list --depth=0
```

## Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Iniciar en un puerto específico
npm run dev -- --port 3000

# Iniciar y abrir automáticamente en el navegador
npm run dev -- --open
```

## Testing y Calidad

```bash
# Ejecutar linter
npm run lint

# Ejecutar linter y corregir automáticamente
npm run lint -- --fix

# Verificar tipos de TypeScript
npx tsc --noEmit
```

## Build y Producción

```bash
# Build para producción
npm run build

# Previsualizar build de producción
npm run preview

# Limpiar y rebuilder
rm -rf dist && npm run build
```

## Gestión de Dependencias

```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar todas las dependencias
npm update

# Actualizar una dependencia específica
npm install axios@latest

# Auditar seguridad
npm audit

# Corregir vulnerabilidades
npm audit fix
```

## Desarrollo con Backend

```bash
# Verificar que el backend está corriendo
curl http://localhost:5000/api/health

# Ver logs del backend mientras desarrollas (en otra terminal)
# (Comando específico del backend Python)

# Probar endpoints de la API
curl http://localhost:5000/api/flights/active
curl http://localhost:5000/api/system/status
```

## Git (Control de Versiones)

```bash
# Inicializar repositorio (si no existe)
git init

# Agregar archivos
git add .

# Commit
git commit -m "feat: implementar dashboard de vuelos"

# Push a repositorio remoto
git push origin main
```

## Modo Demo vs Producción

### Activar Modo Demo (datos simulados)

Edita `src/main.tsx`:

```typescript
// Comentar esta línea:
// import App from './App.tsx'

// Descomentar esta línea:
import App from "./App.demo.tsx";
```

### Volver a Modo Producción

Edita `src/main.tsx`:

```typescript
// Descomentar esta línea:
import App from "./App.tsx";

// Comentar esta línea:
// import App from './App.demo.tsx'
```

## Debugging

```bash
# Iniciar con debug de Vite
npm run dev -- --debug

# Ver bundle analysis
npm run build -- --mode analyze

# Limpiar caché de Vite
rm -rf node_modules/.vite
```

## Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar variables de entorno (Windows)
notepad .env

# Editar variables de entorno (Linux/Mac)
nano .env
```

## Solución de Problemas Comunes

### Problemas con node_modules

```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problemas con caché de Vite

```bash
# Limpiar caché
rm -rf node_modules/.vite
npm run dev
```

### Puerto ocupado

```bash
# Cambiar puerto
npm run dev -- --port 5174
```

### Problemas con TypeScript

```bash
# Verificar errores
npx tsc --noEmit

# Reiniciar servidor TypeScript en VS Code
# Ctrl+Shift+P > TypeScript: Restart TS Server
```

## Productividad

```bash
# Instalar extensiones de VS Code recomendadas
# - ESLint
# - Tailwind CSS IntelliSense
# - TypeScript Vue Plugin (Volar)
# - Auto Rename Tag
# - Path Intellisense
```

## Deployment

### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy a producción
netlify deploy --prod
```

### Build Manual

```bash
# Build
npm run build

# Los archivos estarán en ./dist
# Subir el contenido de ./dist a tu hosting
```

## Monitoreo

```bash
# Ver tamaño del bundle
npm run build
ls -lh dist/assets

# Analizar bundle (requiere plugin)
npm install -D rollup-plugin-visualizer
# Agregar en vite.config.ts y ejecutar build
```

## Datos de Desarrollo

```bash
# Generar datos mock adicionales
# Edita src/utils/mockData.ts y agrega más vuelos

# Simular alertas de Zabbix
# Puedes agregar más alertas en mockData.ts
```

## Tips

1. **Hot Module Replacement (HMR)**: Los cambios se reflejan automáticamente sin recargar
2. **TypeScript**: Presta atención a los errores de tipo en tu editor
3. **Tailwind**: Usa la extensión de VS Code para autocompletar clases
4. **React DevTools**: Instala la extensión del navegador para debugging
5. **Network Tab**: Usa F12 → Network para ver peticiones HTTP y WebSocket

## Shortcuts de VS Code

- `Ctrl + P`: Búsqueda rápida de archivos
- `Ctrl + Shift + F`: Buscar en todo el proyecto
- `Ctrl + Shift + P`: Paleta de comandos
- `F12`: Ir a definición
- `Alt + Shift + F`: Formatear documento
- `Ctrl + /`: Comentar/descomentar línea

## Referencias Rápidas

- Vite: https://vitejs.dev
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Tailwind: https://tailwindcss.com
- Socket.io: https://socket.io
