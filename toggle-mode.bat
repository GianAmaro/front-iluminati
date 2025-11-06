@echo off
REM Script para cambiar entre modo Demo y Produccion
REM Uso: toggle-mode.bat [demo|prod]

SET MODE=%1

IF "%MODE%"=="" (
    echo Uso: toggle-mode.bat [demo^|prod]
    echo.
    echo   demo - Activar modo demo con datos simulados
    echo   prod - Activar modo produccion con backend
    exit /b 1
)

IF "%MODE%"=="demo" (
    echo Activando modo DEMO...
    powershell -Command "(Get-Content src\main.tsx) -replace 'import App from ''\.\/App\.tsx''', '// import App from ''./App.tsx''' | Set-Content src\main.tsx"
    powershell -Command "(Get-Content src\main.tsx) -replace '\/\/ import App from ''\.\/App\.demo\.tsx''', 'import App from ''./App.demo.tsx''' | Set-Content src\main.tsx"
    echo.
    echo ✓ Modo DEMO activado
    echo   Ahora ejecuta: npm run dev
    exit /b 0
)

IF "%MODE%"=="prod" (
    echo Activando modo PRODUCCION...
    powershell -Command "(Get-Content src\main.tsx) -replace '\/\/ import App from ''\.\/App\.tsx''', 'import App from ''./App.tsx''' | Set-Content src\main.tsx"
    powershell -Command "(Get-Content src\main.tsx) -replace 'import App from ''\.\/App\.demo\.tsx''', '// import App from ''./App.demo.tsx''' | Set-Content src\main.tsx"
    echo.
    echo ✓ Modo PRODUCCION activado
    echo   Asegurate de que el backend este corriendo
    echo   Ahora ejecuta: npm run dev
    exit /b 0
)

echo Error: Modo invalido. Use 'demo' o 'prod'
exit /b 1
