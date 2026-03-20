# Escalabilidad: Migración de 500 Formularios Oracle Forms

## Arquitectura Propuesta
Para manejar la migración de cientos de formularios, se propone un **pipeline automatizado** que transforme los XML a código TypeScript/NestJS.

### 1. Parsing del XML → Modelo Intermedio
- Se utiliza una herramienta de parsing XML (ej. `xml2js` en Node) para extraer:
  - **Blocks**: Entidades principales (tablas).
  - **Items**: Columnas y sus validaciones.
  - **Triggers**: Reglas de negocio.
  - **Program Units**: Procedimientos almacenados (lógica de negocio compleja).
- Se genera un **JSON canónico** que representa la estructura del formulario (ej. entidades, relaciones, validaciones).

**Ejemplo de modelo intermedio (pseudo-JSON):**
```json:
{
  "entity": "Automotor",
  "table": "automotores",
  "fields": [
    { "name": "dominio", "type": "string", "validation": "regex(^[A-Z]{3}[0-9]{3}$|^[A-Z]{2}[0-9]{3}[A-Z]{2}$)" },
    { "name": "fecha_fabricacion", "type": "number", "validation": "YYYYMM and not future" }
  ],
  "relationships": [
    { "field": "owner", "type": "many-to-one", "target": "Sujeto", "through": "Vinculo_Sujeto_Objeto" }
  ],
  "triggers": {
    "when-validate-item": [
      { "item": "dominio", "action": "validateDominio" },
      { "item": "cuit", "action": "validateCUIT" }
    ]
  }
}
2. Codegen con Templates
Se utilizan templates (por ejemplo, con Handlebars o Mustache) para generar:

Entidades TypeORM (*.entity.ts)

DTOs (create-*.dto.ts)

Servicios (lógica de negocio)

Controladores (endpoints)

Cada template contiene la estructura base, y los datos del modelo intermedio completan los espacios.

Mini‑template de entidad:

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('{{tableName}}')
export class {{entityName}} {
  @PrimaryGeneratedColumn()
  id: number;

  {{#each fields}}
  @Column({ type: '{{type}}', nullable: {{nullable}} })
  {{name}}: {{type}};
  {{/each}}
}

3. CLI/Workflow Reproducible
Se desarrolla un comando CLI: migrate-forms --input path/to/xmls --output path/to/generated.

El pipeline incluye:

Escaneo de archivos XML.
Parsing y validación del modelo.
Generación de código en carpeta destino.
Creación de migraciones de base de datos.

4. Observabilidad
Se registran métricas:

Número de formularios procesados.

Tiempo de migración.

Errores de parsing o codegen.

Se genera un reporte HTML con resumen de éxitos/fallos y links a los archivos generados.

5. Ejemplo de Implementación
Pseudo‑comando:

migrate-forms --input ./forms/*.xml --output ./src/modules --report ./migration-report.html
Reporte HTML:

Formularios procesados: 500
Éxitos: 498
Fallos: 2
- ALTA_CLIENTE.xml: campo "telefono" no mapeable.
- BAJA_PEDIDO.xml: trigger con lógica no soportada.
```
# Conclusión
Este enfoque permite migrar cientos de formularios de forma automatizada, manteniendo consistencia y trazabilidad, y reduciendo drásticamente el trabajo manual.