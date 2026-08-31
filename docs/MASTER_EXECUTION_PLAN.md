# ENGRAVIS — MASTER EXECUTION PLAN

**Version:** 1.0
**Date:** 2026-08-31
**Status:** Approved working baseline
**Branch:** `dev/engravis-architecture`

## 1. Mission

Transform the current ENGRAVIS prototype into a production-ready, multinational SaaS platform for engineering asset information, projects, digital twins, lifecycle operations, collaboration and AI-assisted execution.

The existing monolith is not to be discarded merely because it is large. Valuable business logic, UX decisions and domain knowledge will be preserved while functionality is progressively modularized.

## 2. Product definition

ENGRAVIS is a collaborative platform for managing information, projects and digital twins of engineering assets throughout their lifecycle.

Core value chain:

`Organization → Asset → Digital Twin → Information → Projects → Operations → Collaboration → ARIA → Performance`

The platform must support vessels, vehicles, machinery, products, prototypes, structures, facilities and other engineering objects without making the product dependent on the word "asset" as a user-facing concept.

## 3. Non-negotiable business rules

### 3.1 Multi-tenancy
- Ordinary companies are isolated from one another.
- A company cannot browse another company's private data.
- Superadmin has global authority.
- ARIA has global authority at the ENGRAVIS/global level but must respect contextual data boundaries when operating inside a company.
- ENGRAVIS corporate administration is a separate global layer and is not yet exposed as a normal tenant UI.

### 3.2 Users, roles and permissions
- Every user belongs to an organization and operates through an assigned role.
- Roles establish default permissions.
- Users may be readers in areas outside their responsibility and editors/creators in assigned areas.
- Company administrators can override role defaults for individual users.
- Access must be granular enough to authorize a specific user on a specific equipment item inside a specific system for a defined purpose and, when appropriate, time window.
- Authorization must be enforced server-side; UI hiding is never sufficient.

### 3.3 Ownership and collaboration
- The company is the owner of the engineering object.
- An engineering object may be referenced by multiple projects and supplier subprojects.
- A supplier may create its own project/subproject against an existing object owned by another company.
- Such access is explicitly granted by the owner and exposes only the information authorized for that collaboration.
- Shared context does not make the supplier a member of the owner's company.

### 3.4 Digital Twin
A digital twin is not only a 3D file. It combines geometry, structure, engineering information, documents, history, operations and relationships.

Conceptual hierarchy:

`Engineering Object → Systems → Equipment → Components`

plus:

`Spaces / Positions / Documents / Work Orders / Events / Projects / 3D representation`

Manual data acquisition is the initial operating model. The architecture must remain ready for later sensor, camera, SCADA, IoT, GPS/AIS and external-system integrations.

### 3.5 ARIA
ARIA is an agent integrated into ENGRAVIS, not merely a chat window.

ARIA must progressively be able to:
- understand user and company context;
- retrieve authorized information;
- reason over projects and engineering data;
- propose plans and decisions;
- create and modify records through controlled tools;
- operate project workflows;
- analyze documents and digital-twin context;
- control the 3D interface where supported;
- generate reports and summaries;
- identify risks, inconsistencies, missing information and performance bottlenecks;
- follow up on commitments and operational states;
- improve user performance through proactive, evidence-based assistance.

ARIA may execute only actions authorized for the requesting user and context. Global ARIA capabilities must not bypass the authorization engine.

## 4. Target architecture

```text
ENGRAVIS
├── Identity & Authentication
├── Organizations / Tenancy
├── Authorization Engine
├── Users / Roles / Grants
├── Engineering Objects
├── Projects / Subprojects
├── Digital Twin
│   ├── Systems
│   ├── Equipment
│   ├── Components
│   ├── Spaces / Positions
│   └── 3D representation
├── Work Management
├── Documents / Storage
├── Collaboration & Sharing
├── Analytics / Reporting
├── ARIA Agent Platform
└── Administration / SaaS Operations
```

The current monolith remains the working application during migration. New modules should be introduced incrementally behind stable interfaces rather than through a destructive rewrite.

## 5. Access model target

Authorization will eventually support:

`SUBJECT (user / role / company) + RESOURCE (company/project/object/system/equipment/component/document) + ACTION (view/create/edit/delete/execute) + SCOPE + CONDITIONS`

Examples:
- Company member → view assigned project.
- Maintenance role → edit maintenance equipment.
- Individual operator → temporary edit access to Equipment X in System Y.
- Supplier company → view only the project/object context explicitly shared by the owner.

The existing `project_access` and `project_company_access` concepts will be evaluated and evolved rather than blindly replaced.

## 6. Execution phases

### Phase 0 — Baseline and forensic audit
**Status:** In progress.

Deliverables:
- repository map;
- monolith inventory;
- Supabase schema and relationship map;
- RLS audit;
- Storage audit;
- Edge Function audit;
- authentication/security audit;
- frontend/backend contract map;
- current ARIA architecture map;
- technical debt register.

Exit criterion: we can explain how current production behavior is implemented and identify the minimum safe change set.

### Phase 1 — Engineering foundation
**Target:** first implementation wave after audit.

Deliverables:
- authoritative architecture documents;
- development/staging workflow;
- production branch discipline;
- authorization design;
- security remediation plan;
- database migration strategy;
- automated validation baseline.

`main` is treated as production. Changes should be developed in isolated branches and promoted through review/testing. GitHub branch protection and required checks should be enabled where supported. GitHub documents branch protection as the mechanism for requiring reviews/status checks and preventing unsafe force pushes/deletions. 

### Phase 2 — SaaS core

Deliverables:
- organization onboarding;
- company administration;
- users;
- roles;
- granular permissions;
- user-specific grants;
- company/project sharing;
- audit trail;
- SaaS-ready identity flow.

Exit criterion: Company A cannot access private Company B data, while explicitly shared project/object context works correctly.

### Phase 3 — Digital Twin core

Deliverables:
- engineering-object model refinement;
- system/equipment/component relationships;
- 3D component mapping;
- information panels;
- documents;
- history;
- work orders;
- project/object relationships;
- controlled external collaboration.

Exit criterion: a real engineering object can be represented as an information-rich digital twin and maintained through its lifecycle.

### Phase 4 — ARIA 2.0

Architecture:

`User → Context → Authorization → Planner → Retrieval/Tools → Execution → Verification → Audit`

Capabilities will be introduced in layers:
1. contextual assistant;
2. retrieval and analysis;
3. controlled creation/modification;
4. planning and orchestration;
5. proactive performance intelligence;
6. 3D interaction;
7. cross-system integrations.

Exit criterion: ARIA can complete useful end-to-end workflows inside a company without bypassing permissions.

### Phase 5 — Production web

Deliverables:
- domain and DNS;
- production hosting/deployment;
- staging environment;
- TLS;
- production configuration/secrets;
- monitoring;
- error tracking;
- public landing page;
- registration/login;
- application entry point;
- transactional email/domain strategy.

The public website and application should be separated conceptually even if they initially share infrastructure.

### Phase 6 — Commercial SaaS

Deliverables:
- plans;
- billing architecture;
- usage limits;
- subscription state;
- company onboarding;
- trial flow;
- support/admin tooling;
- product analytics;
- internationalization readiness.

### Phase 7 — Scale and integrations

Future capabilities:
- IoT/sensors;
- cameras/computer vision;
- external CMMS/ERP/CAD/BIM systems;
- predictive maintenance;
- event streaming;
- advanced analytics;
- enterprise integrations;
- regional/global infrastructure optimization.

## 7. Domain and production decision

Move ENGRAVIS to a real domain during the production-foundation phase, not after every feature is complete.

Before committing to a domain, confirm the final public brand/domain choice. The domain should support:
- public marketing site;
- application subdomain or equivalent;
- API/service endpoints where needed;
- transactional email;
- future internationalization.

## 8. What will happen first

1. Complete repository/monolith audit.
2. Complete Supabase/RLS/Storage/Edge audit.
3. Compare actual implementation against the business rules in this document.
4. Publish the gap register.
5. Freeze the target architecture for the first implementation wave.
6. Harden security.
7. Implement the authorization foundation.
8. Begin SaaS/domain staging work.
9. Modularize the monolith incrementally.
10. Rebuild ARIA capabilities on top of the authorization/context/tool foundation.

## 9. Change control

Every significant architectural or product decision must be recorded in:
- `docs/AI_HANDOFF.md`
- `docs/CHANGELOG.md`
- the relevant architecture/security document.

No future assistant or developer should need to reconstruct project intent from chat history alone.

## 10. Definition of success

ENGRAVIS is considered production-ready when:

- tenant isolation is demonstrably enforced server-side;
- permissions are granular and auditable;
- shared collaboration works without leaking unrelated company data;
- the digital twin connects geometry with structured lifecycle information;
- ARIA can safely execute meaningful workflows;
- the application runs under the official domain with staging/production separation;
- new companies can onboard and operate without developer intervention;
- the architecture can evolve without returning to a single uncontrolled monolith.

---

**This document is the working execution baseline. It is expected to evolve through controlled changes documented in the changelog.**
