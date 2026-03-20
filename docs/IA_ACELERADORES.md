# Uso de IA (ChatGPT) en el Desarrollo

## Prompts Utilizados
1. **Generación de entidades TypeORM**  
   *Prompt:* "Genera una entidad TypeORM para la tabla 'Automotores' con los campos: atr_id (bigserial), atr_ovp_id (bigint), atr_dominio (varchar 8), atr_numero_chasis (varchar 25), atr_numero_motor (varchar 25), atr_color (varchar 40), atr_fecha_fabricacion (integer), atr_fecha_alta_registro (timestamptz). Incluye relaciones con ObjetoDeValor y VinculoSujetoObjeto."  
   *Validación:* Se verificó que los decoradores y nombres de columna coincidan con el esquema SQL.

2. **Validación de CUIT (módulo 11)**  
   *Prompt:* "Implementa una función en TypeScript que valide CUIT argentino usando el algoritmo de módulo 11, según el código PL/SQL del siguiente fragmento: ..."  
   *Validación:* Se probó con CUITs conocidos y se comparó con calculadoras online.

3. **Configuración de Docker multi‑stage**  
   *Prompt:* "Escribe un Dockerfile multi‑stage para una app NestJS que use TypeORM y se conecte a PostgreSQL."  
   *Validación:* Se construyó la imagen y se probó localmente con `docker compose`.

4. **Manejo de errores en Angular**  
   *Prompt:* "Cómo manejar en Angular un error 404 al consultar un CUIT inexistente para mostrar un diálogo de creación."  
   *Validación:* Se implementó la lógica en `formulario.component.ts` y se probó manualmente.

## Riesgos y Mitigaciones
- **Riesgo:** Código generado con IA puede no seguir las mejores prácticas o contener errores de sintaxis.  
  **Mitigación:** Revisión manual exhaustiva de cada archivo generado, ejecución de pruebas unitarias y pruebas de integración.

- **Riesgo:** La IA puede no entender el contexto completo del dominio (ej. reglas de negocio del XML).  
  **Mitigación:** Se validó cada regla contra el código PL/SQL original, y se ajustó manualmente donde la IA fallaba.

- **Riesgo:** Dependencia excesiva de la IA puede reducir la comprensión del código.  
  **Mitigación:** Se documentaron las decisiones en este archivo y se incluyeron comentarios en el código explicando las partes críticas.

## Justificación del Enfoque
El uso de IA aceleró el desarrollo al generar código repetitivo (entidades, DTOs, scaffolding) y resolver problemas comunes (validación de CUIT, configuración de Docker) de manera rápida. Esto permitió enfocarse en la lógica de negocio específica del dominio y en la integración entre frontend y backend. La combinación de IA + revisión manual resultó en un producto final robusto y alineado con los requisitos.