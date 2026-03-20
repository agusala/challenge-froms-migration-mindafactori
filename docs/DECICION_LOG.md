# Decisiones Técnicas (ADR)

## 1. Elección del Stack
- **NestJS**: Framework modular que facilita la organización en capas y la inyección de dependencias.  
- **TypeORM**: ORM con soporte nativo para PostgreSQL, permite migraciones y transacciones.  
- **Angular**: Framework frontend con componentes standalone, que simplifica la estructura y la inyección de servicios.
## 2. Estructura de Módulos
- Separación en `automotores` y `sujetos` para mantener cohesión y evitar acoplamiento.
- Cada módulo agrupa entidad, servicio, controlador y DTOs.
## 3. Manejo de Dueño Único Activo
- Se utiliza un índice parcial en la base de datos (`uq_vso_owner_actual`) para garantizar que un automotor tenga un solo dueño responsable activo.
- En la lógica de negocio, al reasignar dueño se cierra el vínculo anterior (actualizando `vso_fecha_fin`) antes de crear el nuevo.
## 4. Transacciones
- Se emplea `QueryRunner` de TypeORM para asegurar atomicidad en operaciones que involucran múltiples tablas (creación/actualización de automotor, cierre de vínculo, inserción de nuevo dueño).
## 5. Validaciones
- **Dominio**: Expresión regular que acepta `AAA999` y `AA999AA`.
- **CUIT**: Algoritmo de módulo 11, replicado exactamente del PL/SQL original.
- **Fecha fabricación**: Formato YYYYMM, mes entre 1 y 12, no futura y año >= 1900 (se agregó validación adicional).
## 6. Manejo de Errores
- Se utilizan excepciones HTTP de NestJS con `UnprocessableEntityException` (422) para reglas de negocio, diferenciándolas de errores de infraestructura (500).
## 7. Frontend Standalone
- Componentes standalone para evitar NgModules innecesarios.
- Servicios con `providedIn: 'root'` e inyección mediante `HttpClientModule` en los imports de cada componente.
## 8. Dockerización
- Multi‑stage en `Dockerfile` del backend para reducir tamaño de imagen.
- `docker-compose.yml` con servicios `db`, `api` y `web`, usando variables de entorno.
- Healthcheck en la base de datos para asegurar disponibilidad antes de iniciar la API.