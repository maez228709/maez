# ENGRAVIS — DATABASE AUDIT

**Version:** 1.0  
**Date:** 2026-08-31  
**Branch:** `dev/engravis-architecture`  
**Status:** Initial structural audit

## Current public schema inventory

The connected Supabase project currently exposes 27 public base tables:

- `aria_context`
- `aria_reports`
- `asset`
- `block_template`
- `client`
- `company`
- `company_modules`
- `component_panel`
- `equipment`
- `lists`
- `model_component`
- `physical_space`
- `position`
- `position_system`
- `project`
- `project_access`
- `project_attributes`
- `project_block`
- `project_company_access`
- `record`
- `supplier`
- `system`
- `task_template`
- `user_attributes`
- `user_profile`
- `work_order`

This is a materially richer data model than the current single-page frontend suggests. The database already contains the beginnings of a domain model for organizations, assets, projects, engineering hierarchy, work management and ARIA.

## Current database helper functions

The public schema currently contains these relevant functions:

- `auth_company_id()` — SECURITY DEFINER
- `get_my_company_id()` — SECURITY DEFINER
- `is_company_admin()` — SECURITY DEFINER
- `is_superadmin()` — SECURITY DEFINER
- `update_model_component_timestamp()`
- `update_updated_at()`

The SECURITY DEFINER authorization helpers require a dedicated security review before expanding their use. Their search paths, ownership, grants and behavior must be verified before they become the foundation of the new authorization engine.

## Architectural interpretation

The existing schema supports the following conceptual layers:

```text
COMPANY / USER
      |
      +-- PROJECT
      |      |
      |      +-- PROJECT BLOCK / ATTRIBUTES
      |      +-- ACCESS
      |
      +-- ASSET
             |
             +-- SYSTEM
             +-- EQUIPMENT
             +-- PHYSICAL SPACE
             +-- POSITION
             +-- MODEL COMPONENT
             +-- WORK ORDER
```

The next schema audit must map every foreign key, index, unique constraint, nullable ownership field and RLS policy against the target ENGRAVIS authorization model.

## Critical findings

### DB-001 — Existing access model is insufficient for target granularity

`project_access` and `project_company_access` are useful foundations, but the target model requires access by subject (company, role, user), resource, action and scope, including temporary/special grants.

### DB-002 — Asset ownership and operational relationships must be separated

`asset` already contains ownership-related fields, but ownership, operation, collaboration and authorization must not be conflated. An operating company or supplier relationship must not automatically grant unrestricted access.

### DB-003 — RLS must become sharing-aware

Current RLS was designed primarily around company ownership/membership. The target model requires explicit cross-company sharing without breaking tenant isolation.

### DB-004 — ARIA requires a protected action boundary

ARIA should not receive unrestricted database authority. Tool execution must pass through authorization and produce an audit trail.

## Next database audit pass

1. Extract complete foreign-key graph.
2. Extract primary/unique/index definitions.
3. Extract all RLS policies and classify them against the target model.
4. Review SECURITY DEFINER functions for safe search path and grants.
5. Inventory Storage buckets and policies.
6. Map Edge Functions to database operations.
7. Design the minimum additive migration for authorization.
8. Test tenant isolation with representative A/B company scenarios before production deployment.

## Safety rule

No destructive schema migration is authorized by this document. Initial changes must be additive, reversible and tested against existing functionality.