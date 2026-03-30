# Implementation Plan — Veta MVP

## Status: COMPLETE

All four phases have been implemented and merged into `develop`.

| Phase | Status | PR |
|-------|--------|----|
| Phase 1: Fix crashes & connect backend | Done | #3 |
| Phase 2: User accounts & data management | Done | #4 |
| Phase 3: Profiles & sharing | Done | #5 |
| Phase 4: Polish & deploy | Done | #6 |

---

## MVP Definition

A working data wallet where a user can:
1. Log in with Internet Identity
2. Create their account and set their name
3. Add personal data entries to their wallet
4. View their data in a dashboard
5. Create profiles and attach data to them
6. Share a profile publicly via link / QR code
7. View a shared profile (no auth required)

---

## What Was Built

### Phase 1: Fix Critical Bugs & Connect Backend
- [x] Fixed crash bugs in AddProfileCard, Profiles page, Cryppo, Dashboard
- [x] Wrote `vetawallet.did` Candid interface file
- [x] Created `actor.js` service layer with manual IDL factory
- [x] Wired `VetaIdentityContext` to real canister calls (create actor on login, fetch profile)
- [x] Removed dead code: declaration stubs, wrapper.js, CryppoServices, unused components

### Phase 2: User Account & Data Management
- [x] Onboarding dialog for new users (name prompt → `actor.create()`)
- [x] Data Center rewrite: platform management + data entry creation with signing
- [x] Dashboard rewrite: stat cards, recent data table, category breakdown
- [x] Backend: caller ownership check on `update()`, input validation
- [x] Added Data Center to sidebar and routes

### Phase 3: Profiles & Sharing
- [x] AddProfileCard rewrite with proper create flow
- [x] Profile detail page (`/dashboard/profiles/:id`) with data attach/detach
- [x] ProfileCard sharing with QR code + copy link
- [x] ViewSharedProfile styled public view (no auth)
- [x] QR Code page listing all profiles with QR codes and share buttons

### Phase 4: Polish & Deploy
- [x] Replace hardcoded encryption key with principal-derived key
- [x] Deep input validation: dataContent ≤ 10KB, dataType ≤ 128, profileName ≤ 128, profile data ≤ 500
- [x] Sidebar cleaned: removed Wallet, Cryppo, Social Network (non-MVP)
- [x] Test suite: 11 tests (crypto roundtrip, key isolation, actor service, OnboardingDialog)
- [x] All tests passing, build succeeds

### Deployment (manual steps remaining)
- [ ] Install `icp-cli` and `ic-mops` in deploy environment
- [ ] Run `mops install` to fetch Motoko packages
- [ ] Build and deploy: `icp deploy -e ic`
- [ ] Verify on `https://k3gdk-giaaa-aaaaj-aivfa-cai.ic0.app/`
- [ ] Test Internet Identity login on mainnet
- [ ] Set freezing threshold to 90 days: `icp canister settings update vetawallet --freezing-threshold 7776000 -e ic`

---

## Architecture Decisions

1. **Single canister** — everything in `vetawallet`. Multi-canister is post-MVP.
2. **Data in user record** — entries live inside `UserData.data[]` (atomic updates). Post-MVP: separate data canister.
3. **Principal-derived encryption key** — SHA256 of principal. Post-MVP: replace with vetKD.
4. **Frontend-only platform registry** — platforms stored in localStorage, not the canister.
5. **No pagination** — acceptable for MVP data volumes. Add before scaling.

## Post-MVP Roadmap

1. Replace `actor.js` IDL factory with `@icp-sdk/bindgen` generated bindings
2. Implement vetKD for proper encryption key derivation
3. Add pagination on data queries (2MB response limit at scale)
4. Cryppo platform — connect to real DeFi protocols
5. ICRC signer integration for wallet-based transaction approval
6. Multi-canister architecture for scaling
7. CI/CD pipeline for automated testing and deployment
