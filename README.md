# Challenge Técnico – Migración Oracle Forms

Aplicación que migra un formulario Oracle Forms a una API REST con NestJS + TypeORM (PostgreSQL) y un frontend Angular.

##  Tecnologías
- **Backend**: NestJS, TypeORM, PostgreSQL
- **Frontend**: Angular 17 (standalone), Bootstrap, Angular Material
- **Docker**: Docker Compose para orquestación

##  Levantar el proyecto con Docker

1. Clonar el repositorio.
2. Desde la raíz del proyecto, ejecutar:
   docker compose up -d --build
   Esperar a que todos los contenedores estén levantados (aproximadamente 30 segundos).
Acceder a:

Frontend: http://localhost:4200

Backend (API): http://localhost:3000/api/automotores

# Correr tests (backend)
bash
cd backend
npm test

# Endpoints principales
Método	Endpoint	Descripción
GET	/api/automotores	Lista automotores con dueño actual
GET	/api/automotores/:dominio	Detalle de un automotor
POST	/api/automotores	Crea/actualiza automotor y dueño
PUT	/api/automotores/:dominio	Actualiza automotor (reasigna dueño)
DELETE	/api/automotores/:dominio	Elimina automotor (cascada)
GET	/api/sujetos/by-cuit?cuit=	Obtiene sujeto por CUIT
POST	/api/sujetos	Crea sujeto (CUIT + denominación)
Credenciales de prueba (seeds)
Si se ejecutaron los seeds, el sistema incluye:

Sujeto: CUIT 20267565393, denominación "Juan Pérez"

Automotor: dominio ABC123, dueño el sujeto anterior.

# Estructura del proyecto

├── backend/               # API NestJS
│   ├── src/
│   │   ├── modules/       # Módulos automotores y sujetos
│   │   ├── common/        # Validadores y helpers
│   │   └── main.ts
├── frontend/              # Angular standalone
│   ├── src/app/
│   │   ├── components/    # Listado, formulario, diálogo
│   │   ├── service/       # Servicios HTTP
│   │   └── models/        # Interfaces TypeScript
├── docker-compose.yml
└── README.md

# Cumplimiento
Backend con todos los endpoints requeridos

Validaciones (dominio, CUIT, fecha) en servidor y cliente

Frontend con listado, creación, edición, eliminación

Manejo de dueño único activo

Docker compose con db, api, web

Tests unitarios de validadores

Documentación: DECISION_LOG.md, ESCALABILIDAD.md, IA_ACELERADORES.md

# Autor: Agustin Sala 

##  3. Levantar Docker y verificar

### Paso a paso
1. Asegúrate de que Docker Desktop esté corriendo (icono en la barra de tareas).
2. Abre una terminal en la **raíz del proyecto** (donde está `docker-compose.yml`).
3. Ejecuta:
   docker compose up -d --build
Espera a que termine la construcción. Verás logs de los tres servicios (db, api, web). Si no hay errores, continúa.

Abre tu navegador en http://localhost:4200. Deberías ver el listado de automotores.

Prueba algunos endpoints con Postman o en el navegador:

GET http://localhost:3000/api/automotores

POST http://localhost:3000/api/sujetos con JSON {"cuit": "20267565393", "denominacion": "Juan Perez"}

POST http://localhost:3000/api/automotores con JSON {"dominio": "ABC123", "fecha_fabricacion": 202503, "cuit_duenio": "20267565393"}



