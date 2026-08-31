# ENGRAVIS — CHANGELOG

## 2026-08-31 — Architecture baseline

### Added
- Development branch `dev/engravis-architecture` created from `main`.
- Centralized AI handoff document.
- Product vision document.
- Target architecture document.
- Security baseline document.

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
- Current frontend is a large single-page `index.html` monolith.
- Existing Supabase schema already contains Company, Project, Asset, System, Equipment, Model Component, access and ARIA concepts.
- Existing RLS is enabled on public tables, but policies require alignment with the intended granular cross-company sharing model.
- Security review is required for SECURITY DEFINER functions, search_path, Edge Functions without JWT verification, CORS and Auth settings.

### Next
- Complete repository/history audit.
- Map frontend modules and dependencies.
- Complete Supabase relationship/RLS/Storage audit.
- Review Edge Function authentication and tool boundaries.
- Design Authorization Engine.
- Design ARIA 2.0 execution/context architecture.
