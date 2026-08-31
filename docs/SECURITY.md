# ENGRAVIS — SEGURIDAD Y BASELINE

## Principios

1. Aislamiento estricto entre tenants.
2. Compartición explícita, granular y revocable.
3. ARIA nunca bypasses authorization.
4. Secretos fuera del repositorio público.
5. Cambios de seguridad con prueba y rollback.
6. Auditoría de acciones sensibles.

## Hallazgos iniciales a corregir/validar

- Revisar funciones `SECURITY DEFINER` y fijar `search_path` cuando corresponda.
- Revisar permisos de ejecución de funciones sensibles para `anon` y `authenticated`.
- Revisar Edge Functions que actualmente no verifican JWT (`ARIA-PROXY`, `claude-proxy`, `B2-PROXY`) y confirmar autenticación alternativa segura antes de cambiar comportamiento.
- Revisar CORS de ARIA y restringir orígenes cuando la arquitectura final lo permita.
- Revisar configuración de OTP y protección contra contraseñas comprometidas en Auth.
- Revisar Storage y políticas de objetos.
- Revisar todas las políticas RLS para que soporten aislamiento y compartición granular.

## Estado

Este documento es un baseline de auditoría. No implica que cada hallazgo sea una vulnerabilidad explotable; cada uno debe validarse antes de aplicar cambios.

## Regla de producción

No desplegar una modificación de autorización solamente porque compile. Debe probarse: acceso permitido, acceso denegado, acceso cruzado autorizado, revocación y comportamiento de ARIA.
