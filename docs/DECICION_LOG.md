# Decisiones de diseño

## 1. Uso de TypeORM con entidades
Se optó por TypeORM para mantener compatibilidad con PostgreSQL y facilitar migraciones.
## 2. Estructura de módulos
Se separó en automotores y sujetos para mantener cohesión.
## 3. Validaciones
Se implementaron validadores comunes reutilizables y se lanzan excepciones 422.
## 4. Transacciones
Se usó QueryRunner para garantizar atomicidad en alta/actualización de automotor con asignación de dueño.