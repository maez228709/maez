# ENGRAVIS — CHANGELOG

## 2026-08-31 — Architecture baseline

### Added
- Development branch `dev/engravis-architecture` created from `main`.
- Centralized AI handoff document.
- Product vision document.
- Target architecture document.
- Security baseline document.
- Master execution plan.
- Initial gap register.
- Repository forensic audit baseline.

### Confirmed product directives
- Strict multi-tenant isolation for normal companies.
- Global controlled access for Superadmin and global ARIA.
- Granular role/user/resource permissions.
- Explicit cross-company sharing.
- Provider subprojects linked to owner-company objects/projects.
- Asset retained as technical universal entity, with future user-facing types.
- Digital Twin defined as data + structure + geometry + lifecycle, not only 3D.
- ARIA must become contextual, proactive and action-capable while using platform authorization.
- Deterministic platform functions execute operations; ARIA interprets and triggers them.

### Audit observations
- Current frontend is a large single-page `index.html` monolith (approximately 930 KB).
- Repository also contains a separate `auth.html`, local Three.js/GLTFLoader assets and a Cloudflare Worker for GLB delivery.
- Existing Supabase schema already contains Company, Project, Asset, System, Equipment, Model Component, access and ARIA concepts.
- Existing RLS is enabled on public tables, but policies require alignment with the intended granular cross-company sharing model.
- Security review is required for SECURITY DEFINER functions, search_path, Edge Functions without JWT verification, CORS and Auth settings.
- `worker.js` currently serves R2 GLB objects with wildcard CORS and path-based object lookup; private geometry must not depend on unrestricted public object paths in production.

### Current evidence trail
- Repository forensic baseline committed as `603073fb4ed13c8622095f5b95f09426d4d0debd`.
- Prior architecture, gap-register and Supabase-audit commits remain in the development branch history.

### Next
- Complete repository/history audit.
- Map frontend modules and dependencies.
- Complete Supabase relationship/RLS/Storage audit.
- Review Edge Function authentication and tool boundaries.
- Design Authorization Engine.
- Design ARIA 2.0 execution/context architecture.
- Establish staging/production path and domain strategy.
