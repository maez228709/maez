# ENGRAVIS — AI HANDOFF / CONTINUIDAD DEL PROYECTO

> Documento operativo para cualquier IA o desarrollador que intervenga en ENGRAVIS. Leer antes de modificar código, base de datos, seguridad o arquitectura.

## 1. Identidad

ENGRAVIS es una plataforma SaaS de ciclo de vida para activos de ingeniería, con especialización inicial naval/marítima e industrial. El núcleo es un Digital Twin conectado a información técnica, operativa e histórica, con ARIA como inteligencia contextual y agente de operación.

## 2. Principio rector

No reescribir por reescribir. Primero entender, proteger, probar, modularizar y escalar. Preservar funcionalidades existentes salvo que una sustitución sea necesaria para cumplir la arquitectura objetivo.

## 3. Arquitectura actual conocida

- Frontend: HTML/JS monolítico en `index.html`.
- `index.html`: aproximadamente 930 KB; contiene documentación embebida y la aplicación principal.
- Auth: Supabase Auth.
- Database: Supabase PostgreSQL con RLS.
- Storage: Supabase Storage.
- 3D: Three.js + GLTFLoader; modelos GLB.
- IA: ARIA mediante Edge Functions; integración con proveedores LLM.
- Voz: Edge Function `aria-tts`.
- Geometría: `TRIMESH-PROXY`.
- Otras Edge Functions: `B2-PROXY`, `claude-proxy`, `INVITE-USER`.

## 4. Reglas de negocio confirmadas por el fundador

### 4.1 Aislamiento multi-tenant

Las empresas comunes A, B, C... N no pueden ver ni modificar información de otras empresas salvo información explícitamente compartida. El Superadmin y ARIA global pueden operar con alcance global. La organización ENGRAVIS tendrá una interfaz propia que todavía no está configurada.

### 4.2 Usuarios, roles y permisos

Cada usuario pertenece a una empresa y tiene un rol. El rol determina el acceso general. Un usuario puede ser editor/creador en los bloques bajo su responsabilidad y lector en otros. El administrador de cada empresa puede aterrizar permisos por rol y conceder excepciones específicas a usuarios concretos.

Ejemplo: `OPERADOR DE GRÚA 1` puede recibir acceso especial a un equipo X dentro del sistema Y para una maniobra, aunque su rol general no tenga edición sobre ese equipo.

### 4.3 Propiedad de la entidad física/digital

La entidad actualmente llamada `asset` representa el objeto/producto/vehículo/embarcación/prototipo/estructura/etc. y pertenece a una empresa propietaria. El nombre visible podrá evolucionar; `asset` puede mantenerse como nombre técnico universal.

Un proveedor puede crear un proyecto/subproyecto relacionado con un objeto propiedad de otra empresa, pero solamente mediante autorización y viendo la información que el propietario haya compartido.

### 4.4 Proyectos y subproyectos

Un objeto puede tener múltiples proyectos y subproyectos de diferentes empresas proveedoras. El proveedor trabaja sobre un contexto compartido del objeto/proyecto sin convertirse en miembro de la empresa propietaria.

### 4.5 Compartición de información

El propietario debe poder definir qué información de un objeto/proyecto puede ser vista desde fuera. Compartir no equivale a transferir propiedad ni a conceder acceso global al tenant.

### 4.6 Digital Twin

El Digital Twin conecta geometría, estructura, información técnica, operación e historial. Cada elemento relevante puede tener representación 3D y/o registro. Sistemas son entidades agregadoras y se relacionan con equipos, componentes, espacios, posiciones, documentos y demás información.

La primera fase admite carga manual por responsables de cada objeto, jefes de área y personal operativo. La arquitectura debe quedar preparada para futura ingestión desde sensores, cámaras, IoT, SCADA, GPS/AIS, ERP, CMMS, CAD/BIM y otras fuentes.

### 4.7 ARIA

ARIA global + Superadmin: alcance global autorizado sobre ENGRAVIS.

ARIA dentro de una empresa: solamente puede presentar y operar sobre el contexto autorizado de esa empresa. Puede usar patrones generales aprendidos de otros contextos sin revelar datos privados de otras empresas.

ARIA debe poder investigar, razonar, detectar riesgos, inconsistencias, atrasos y oportunidades, proponer acciones y ejecutar operaciones cuando estén autorizadas.

**Principio rector de ARIA:** la plataforma ejecuta; ARIA dispara. Toda capacidad determinista debe existir primero como función de plataforma y luego exponerse a ARIA como herramienta. ARIA/LLM se reserva para interpretación de lenguaje, investigación web, estructuración de datos ambiguos y sugerencias.

ARIA nunca debe tener una llave maestra de SQL sin control. Las acciones deben pasar por autorización, herramientas y auditoría.

## 5. Dirección de ARIA

Objetivo: pasar de chatbot torpe a agente contextual de alto desempeño.

Capacidades objetivo:
- Contexto de usuario/empresa/rol/proyecto/objeto/sistema/equipo.
- Memoria operacional y memoria empresarial separadas por autorización.
- Retrieval sobre datos, documentos, componentes, OT, historial y modelos.
- Planificación y descomposición de objetivos.
- Function calling para ejecutar funciones reales de la plataforma.
- Control del visor 3D.
- Auditoría interna y detección proactiva de problemas.
- Seguimiento de tareas y resultados.
- Voz natural como interfaz, no como sustituto de la lógica de negocio.

## 6. Estado conocido y problemas a revisar

- Monolito grande: debe modularizarse gradualmente, no reescribirse a ciegas.
- RLS: todas las tablas públicas tienen RLS habilitado, pero el diseño de políticas debe alinearse con el modelo de compartición granular.
- Deben revisarse funciones `SECURITY DEFINER`, `search_path`, Edge Functions sin JWT y configuración Auth.
- El acceso compartido por empresa/proyecto/recurso todavía no representa completamente los casos de negocio descritos por el fundador.
- `project_access` y `project_company_access` son piezas existentes que deben evolucionar sin romper compatibilidad.
- El mapeo mesh→componente y la jerarquía 3D son prioridades conocidas.

## 7. Política de cambios

1. Preferir rama de desarrollo/feature sobre cambios directos en `main`.
2. Cambios quirúrgicos y pequeños cuando se toque el monolito.
3. No eliminar funcionalidades existentes sin verificar dependencias.
4. Cada cambio arquitectónico importante debe documentarse.
5. Seguridad y aislamiento multi-tenant tienen prioridad sobre comodidad de implementación.
6. Toda nueva capacidad de plataforma que pueda ejecutar ARIA debe existir como función auditable.
7. No introducir secretos en el repositorio público.
8. Antes de modificar producción: comprobar impacto, migración, rollback y pruebas.

## 8. Entorno de trabajo inicial

Rama creada para esta fase: `dev/engravis-architecture`.

Base de referencia: `main` en el momento de creación de la rama.

## 9. Próxima secuencia

1. Auditoría completa del repositorio e historial.
2. Auditoría relacional y RLS de Supabase.
3. Auditoría de Storage y Edge Functions.
4. Definición del Authorization Engine.
5. Definición final del modelo de objeto/proyecto/subproyecto/compartición.
6. Arquitectura de ARIA 2.0.
7. Modularización progresiva del frontend.
8. Hardening de seguridad.
9. Staging y dominio propio.
10. Promoción controlada a producción.

## 10. Regla de continuidad

Si una IA nueva entra al proyecto, debe leer este archivo, `ENGRAVIS_VISION.md`, `ENGRAVIS_ARCHITECTURE.md`, `SECURITY.md` y `CHANGELOG.md` antes de proponer cambios estructurales.
