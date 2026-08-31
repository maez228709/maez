# ENGRAVIS — REPOSITORY AUDIT

**Date:** 2026-08-31  
**Branch:** `dev/engravis-architecture`  
**Status:** Phase 0 — active forensic audit

## 1. Verified repository baseline

The repository currently contains a large single-page application centered on `index.html`, plus a separate `auth.html`, local Three.js/GLTFLoader assets, `worker.js`, `wrangler.toml`, foundational ENGRAVIS documents, and the `docs/` continuity layer.

`index.html` is approximately 930 KB. The repository's own embedded documentation describes it as a monolithic SPA and records Supabase as the backend and Three.js/GLTF as the 3D stack.

## 2. Architecture observations

### Frontend
- Main application remains concentrated in `index.html`.
- Authentication has a separate `auth.html` entry point.
- Three.js and GLTFLoader are stored locally in the repository.
- A Cloudflare Worker (`worker.js`) serves GLB objects from an R2 bucket.

### Backend
- Supabase PostgreSQL is the primary data layer.
- Supabase Auth is the identity layer.
- Supabase Storage is part of the existing architecture.
- Edge Functions provide ARIA, voice, geometry, Claude and B2 integrations.

### Documentation
- ENGRAVIS now has an external continuity/documentation layer under `docs/`.
- `AI_HANDOFF.md` is the canonical context-transfer document.
- `MASTER_EXECUTION_PLAN.md` is the current execution baseline.
- `GAP_REGISTER.md` is the implementation gap backlog.
- `CHANGELOG.md` records project evolution.

## 3. Important security observation

`worker.js` currently exposes GLB objects through a public CORS policy (`Access-Control-Allow-Origin: *`) and retrieves objects directly from an R2 bucket by URL path. This must be evaluated against the future multi-tenant authorization model before production. Public delivery may be acceptable for deliberately public assets, but private/company-scoped geometry must not rely on unrestricted object paths.

## 4. Monolith strategy

The monolith will not be rewritten wholesale. The first goal is to identify logical boundaries and dependencies, then extract modules incrementally. Candidate boundaries include:

- authentication/session bootstrap;
- organization/user administration;
- authorization/access control;
- projects;
- engineering objects;
- systems/equipment/components;
- work management;
- documents/storage;
- 3D/twin viewer;
- ARIA client/orchestration;
- reporting/analytics.

## 5. Audit rule

No production code is to be changed solely to improve style. Changes must have a documented architectural, security, reliability or product reason and must preserve behavior unless the target architecture explicitly replaces it.

## 6. Next forensic actions

1. Complete full `index.html` functional inventory.
2. Map frontend Supabase calls to tables/functions.
3. Map all ARIA/tool calls to Edge Functions.
4. Reconcile RLS policies against the approved multi-tenant rules.
5. Audit storage and GLB access paths.
6. Identify exposed secrets/configuration risks.
7. Produce a first implementation-wave design for Authorization Engine.
8. Establish the staging/production deployment path before risky migrations.

## 7. Evidence trail

This document is intentionally committed to the development branch so future assistants and developers can distinguish verified observations from assumptions. Subsequent findings must update this file or linked architecture/security documents rather than remaining only in chat history.
