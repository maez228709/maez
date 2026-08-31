# ENGRAVIS — GAP REGISTER

**Version:** 1.0  
**Date:** 2026-08-31  
**Branch:** `dev/engravis-architecture`  
**Status:** Working baseline — derived from repository inspection and approved business rules.

## Purpose

This document compares the ENGRAVIS target model with the current implementation. It is the operational backlog for closing the highest-risk gaps without destroying working functionality.

## P0 — Must resolve before production SaaS

| ID | Area | Current state | Target | Status |
|---|---|---|---|---|
| G-001 | Multi-tenant RLS | Existing policies are documented as partially chaotic/incomplete | Server-side isolation between companies with explicit sharing | OPEN |
| G-002 | Authorization | Existing project/company access concepts are not yet granular enough for user + resource + action + scope | Central authorization layer | OPEN |
| G-003 | ARIA security | Current ARIA proxy architecture must be hardened before ARIA gains broad execution power | Authenticated, authorized tool execution with audit trail | OPEN |
| G-004 | Secrets | Repository documentation records a previously exposed ElevenLabs key | Rotate/revoke exposed credential and verify secret storage | OPEN |
| G-005 | Login/profile flow | Existing documentation identifies a pre-session profile-read issue | Secure authentication/profile bootstrap | OPEN |
| G-006 | Production separation | Current public GitHub Pages architecture is not yet a proper staging/production pipeline | Dev → staging → production with protected production path | OPEN |

## P1 — Core product capability

| ID | Area | Current state | Target | Status |
|---|---|---|---|---|
| G-101 | Engineering object | `asset` exists but user-facing terminology and generalized model need refinement | Universal engineering object with type/subtype | OPEN |
| G-102 | Project collaboration | Projects and access tables exist | Owner-controlled sharing and supplier subprojects | OPEN |
| G-103 | Digital Twin | Systems/equipment/components/3D concepts exist | Coherent connected information model | OPEN |
| G-104 | 3D mapping | Existing documentation reports mesh→layer mapping as broken/incomplete | Reliable component-to-geometry mapping | OPEN |
| G-105 | Work management | Work-order concepts exist but require lifecycle integration | OT/activity/event history tied to twin | OPEN |
| G-106 | Document context | Storage exists | Authorized document retrieval through project/object context | OPEN |
| G-107 | Company administration | Current UI/backend are not yet the full SaaS onboarding model | Self-service company administration | OPEN |

## P1 — ARIA 2.0

| ID | Capability | Target |
|---|---|---|
| A-001 | Context | Identify user, company, role, project, object and selected 3D context |
| A-002 | Retrieval | Search authorized structured data and documents |
| A-003 | Reasoning | Analyze project state, engineering information and risks |
| A-004 | Actions | Execute authorized create/edit/workflow operations through tools |
| A-005 | Planning | Convert goals into verified multi-step plans |
| A-006 | Verification | Check results after tool execution |
| A-007 | Audit | Record meaningful AI actions and decisions |
| A-008 | Proactivity | Detect blockers, missing data, delays and performance opportunities |
| A-009 | 3D interaction | Select, focus, isolate and explain twin context |

## P2 — Production and commercialization

- Custom domain and DNS.
- Dedicated staging URL.
- Production deployment pipeline.
- TLS and security headers.
- Error monitoring and operational logging.
- Public marketing site separated conceptually from the application.
- Registration/onboarding.
- Subscription/billing architecture.
- Usage and plan controls.
- Internationalization readiness.

## P3 — Future scale

- IoT/sensors.
- Camera/computer vision.
- SCADA/PLC integrations.
- ERP/CMMS/CAD/BIM integrations.
- Predictive maintenance.
- Event streaming.
- Advanced analytics.

## Current implementation evidence

The existing `main/index.html` identifies the application as a large single-page monolith and documents the real stack as GitHub Pages + Supabase PostgreSQL/RLS + Supabase Auth/Storage + Edge Functions for ARIA/voice/geometry/other services. It also records known partial/broken areas including RLS, mesh mapping, and incomplete GLB/account workflows.

The target execution plan is stored in `docs/MASTER_EXECUTION_PLAN.md` and takes precedence for future implementation decisions when it conflicts with older aspirational notes inside the monolith.

## Change rule

Every P0/P1 architectural change must update this register and `docs/AI_HANDOFF.md` when the project's operating assumptions change. The monolith's DOC 06 changelog should also be updated when code changes materially affect the existing application behavior.
