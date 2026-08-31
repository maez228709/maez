# ENGRAVIS — ARQUITECTURA OBJETIVO

## 1. Capas

```text
Presentation / Web App
        ↓
Application Services
        ↓
Authorization Engine
        ↓
Domain Services
        ↓
Supabase PostgreSQL / Storage / Edge Functions
        ↓
External providers and future IoT/integrations
```

ARIA se integra por encima de Application Services y utiliza las mismas funciones autorizadas que la interfaz humana.

## 2. Multi-tenant

La empresa es el límite primario de aislamiento. Un usuario común opera dentro de una empresa. Superadmin y ARIA global tienen alcance global controlado. El acceso cruzado solo ocurre por grants explícitos o datos definidos como compartibles.

## 3. Entidades principales

- Company: organización/tenant.
- User/Profile: identidad y pertenencia.
- Asset: nombre técnico universal para objeto físico/digital; la interfaz puede presentar tipos como embarcación, vehículo, producto, prototipo, maquinaria, estructura, etc.
- Project: trabajo organizado sobre un Asset o contexto.
- Subproject: proyecto de proveedor/colaborador relacionado con un proyecto/Asset existente.
- System: agrupador funcional.
- Equipment: equipo dentro de sistemas.
- Model Component: representación conectada a geometría 3D y datos técnicos.
- Physical Space / Position: ubicación y contexto físico.
- Work Order / Activities: operación y mantenimiento.
- Documents: evidencia y conocimiento.

## 4. Autorización objetivo

Debe soportar:

- permiso por empresa;
- permiso por rol;
- permiso por usuario;
- permiso por proyecto;
- permiso por Asset;
- permiso por sistema;
- permiso por equipo;
- permiso por componente/documento;
- acciones VIEW/CREATE/EDIT/DELETE y acciones de dominio específicas;
- excepciones individuales;
- vigencia/expiración cuando sea necesario;
- auditoría.

El acceso compartido no debe convertir al usuario externo en miembro del tenant propietario.

## 5. Contexto compartido

El propietario configura qué información externa puede consultar un colaborador. El colaborador puede crear un subproyecto sobre el objeto autorizado y utilizar la información compartida para cotización, planificación, cronograma, ejecución y cierre.

## 6. Digital Twin

El modelo 3D es una representación. El Digital Twin es el grafo de relaciones entre objeto, geometría, sistemas, equipos, componentes, espacios, posiciones, documentos, proyectos, eventos y operación.

## 7. ARIA

ARIA debe acceder a datos mediante herramientas. Nunca debe saltarse Authorization Engine. Las herramientas deben ser funciones de plataforma auditables.

Capas cognitivas objetivo:

1. identidad y permisos;
2. contexto actual;
3. retrieval;
4. memoria autorizada;
5. planificación;
6. razonamiento;
7. ejecución de herramientas;
8. verificación;
9. seguimiento/proactividad.

## 8. Frontend

El monolito actual se conserva como fuente funcional mientras se extraen módulos de manera incremental. No se inicia una reescritura total hasta identificar dependencias y pruebas de regresión.

## 9. Staging

Toda evolución significativa debe probarse en rama/entorno de desarrollo antes de promoción a `main` y producción.
