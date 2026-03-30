# Implementation Plan — Veta MVP

## Current State Assessment

The project has a polished frontend shell (Berry dashboard, landing page, routing) but **zero working backend connectivity**. All canister calls hit proxy stubs that return `undefined`. Several components have runtime errors that crash the app.

| Area | Status |
|------|--------|
| Landing page | Working |
| Auth (login/logout UI) | Working (mock identity) |
| Dashboard UI | Renders, but all canister calls fail silently |
| Profiles page | **Crashes** (reads `undefined.profiles`) |
| Data Center | Pure UI form, all buttons are no-ops |
| Profile sharing | UI exists, backend calls return undefined |
| AddProfileCard | **Crashes** (typos: `seOpen`, `setOpenShare`) |
| Cryppo platform | Logic errors, services 100% commented out |
| QR Code / Wallet / Help | Empty placeholders |
| Backend canister | Code is solid but never reached by frontend |

## MVP Definition

A working data wallet where a user can:
1. Log in with Internet Identity
2. Create their account and set their name
3. Add personal data entries to their wallet
4. View their data in a dashboard
5. Create profiles and attach data to them
6. Share a profile publicly via link
7. View a shared profile (no auth required)

**Out of scope for MVP**: KYC, Cryppo platform, Social Network, Wallet page, QR code page, data encryption with vetKD, multi-canister architecture.

---

## Phase 1: Fix Critical Bugs & Connect Backend

**Goal**: App doesn't crash. Backend canister is reachable from frontend.

### 1.1 Fix runtime errors in existing components
- [ ] `src/veta_assets/src/components/AddProfileCard.jsx` — fix `seOpen` → `setOpen`, `setOpenShare` → `setOpen`
- [ ] `src/veta_assets/src/views/Profiles/index.jsx` — add null guards for `vetaWallet?.profiles`, `vetaWallet?.name`
- [ ] `src/veta_assets/src/views/Platforms/Cryppo.jsx` — fix `setLoading(true)` at end of fetch → `setLoading(false)`
- [ ] `src/veta_assets/src/views/Dashboard/index.jsx` — add null guards for vetawallet calls

### 1.2 Generate canister bindings
- [ ] Add `@icp-sdk/bindgen` as dev dependency
- [ ] Generate `.did` file from `vetawallet` canister: build with `icp build vetawallet`, then commit the `.did`
- [ ] Add `icpBindgen()` to `vite.config.js` plugins
- [ ] Replace `src/declarations/vetawallet/index.js` stub with real generated bindings
- [ ] Remove `src/declarations/veta/` and `src/declarations/vetacenter/` (unused canisters)

### 1.3 Wire auth context to real canister
- [ ] In `VetaIdentityContext.jsx`, implement `handleVetaProfile()` — call `vetawallet.get(principal)` with authenticated actor
- [ ] Implement `refreshWallet()` — same pattern
- [ ] Create `src/veta_assets/src/services/actor.js` — shared actor factory using `safeGetCanisterEnv()`, `HttpAgent`, `createActor`
- [ ] Pass authenticated identity to actor on login

**Deliverable**: App loads without crashes. Logged-in user's data is fetched from the canister (empty default for new users).

---

## Phase 2: User Account & Data Management

**Goal**: Users can create an account, add data entries, and see them in the dashboard.

### 2.1 Account creation flow
- [ ] On first login (when `vetaWallet` is empty/default), show an onboarding dialog asking for display name
- [ ] Call `vetawallet.create()` with the user's name
- [ ] Refresh wallet state after creation
- [ ] Show the user's name in the dashboard header and sidebar profile section

### 2.2 Add data entries
- [ ] Implement the Data Center page buttons:
  - "ADD PLATFORM" — store platform principal + name in local state (platform registry is frontend-only for MVP)
  - "GENERATE DATA" — call `vetawallet.update()` to append a new Data entry to the user's data array
- [ ] Add a data entry dialog/form: fields for category (personal/social/financial), type, content
- [ ] Sign data with `signData()` from crypto utils before storing
- [ ] After adding, call `refreshWallet()` to update the UI

### 2.3 Dashboard data display
- [ ] Replace hardcoded dashboard content with real data from `vetaWallet`
- [ ] Show data entry count, category breakdown
- [ ] List recent data entries in a table or card list
- [ ] Show user verification status

### 2.4 Backend: add caller verification to `update()`
- [ ] In `main.mo`, verify `msg.caller == userData.id` in the `update()` function
- [ ] Add input size validation (limit `name` to 128 chars, `dataContent` to 10KB)

**Deliverable**: User creates account → adds data entries → sees them on dashboard. Data persists across page reloads (stored in canister).

---

## Phase 3: Profiles & Sharing

**Goal**: Users can create profiles, attach data, share them, and others can view shared profiles.

### 3.1 Fix and implement Profiles page
- [ ] Fix the Profiles page to handle empty/null `vetaWallet` gracefully
- [ ] Display existing profiles from `vetaWallet.profiles`
- [ ] Fix AddProfileCard — fix typos, implement the create flow:
  - Generate UUID for profile ID
  - Call `vetawallet.update()` with the new profile appended to `profiles[]`
  - Refresh wallet

### 3.2 Profile detail view
- [ ] Create a profile detail page (`/dashboard/profiles/:id`)
- [ ] Show profile name, attached data entries
- [ ] Allow attaching/detaching data entries to/from the profile

### 3.3 Profile sharing
- [ ] Fix ProfileCard share button — call `vetawallet.shareProfile()` with the profile data
- [ ] Generate a shareable link: `/#/profile/{profileId}`
- [ ] Show QR code in the share dialog (already using qrcode.react)
- [ ] Fix ViewSharedProfile — call `vetawallet.getSharedProfile()` and display the result
- [ ] Style the public profile view (no auth required, minimal layout)

### 3.4 QR Code page
- [ ] Implement QR Code page to list all shared profiles with their QR codes
- [ ] Each QR code links to the public profile view

**Deliverable**: User creates profile → attaches data → shares it → recipient scans QR or clicks link → sees the profile.

---

## Phase 4: Polish & Deploy

**Goal**: Production-ready MVP deployed to IC mainnet.

### 4.1 Security hardening
- [ ] Replace hardcoded encryption key in `crypto.js` with a user-derived key (e.g., derived from principal)
- [ ] Add input validation on all Motoko endpoints (text length limits, array size limits)
- [ ] Add per-user storage quotas in the canister
- [ ] Audit all frontend forms for XSS (sanitize user-generated content on display)

### 4.2 UX polish
- [ ] Add loading states for all canister calls (show spinners)
- [ ] Add error handling with user-friendly toast/snackbar messages
- [ ] Add empty states for pages with no data ("You haven't added any data yet")
- [ ] Update sidebar menu to only show MVP pages (hide Cryppo, Social Network, Wallet)
- [ ] Update landing page CTAs to point to working features

### 4.3 Testing
- [ ] Add Vitest tests for:
  - `crypto.js` — sign, encrypt, decrypt roundtrip
  - `VetaIdentityContext` — mock auth flow
  - Key UI components — StatCard renders, ProfileCard renders
- [ ] Test canister locally: create user → add data → create profile → share → view shared

### 4.4 Deploy to mainnet
- [ ] Install `icp-cli` and `ic-mops` in CI/deploy environment
- [ ] Run `mops install` to fetch Motoko packages
- [ ] Build and deploy: `icp deploy -e ic`
- [ ] Verify all features work on `https://k3gdk-giaaa-aaaaj-aivfa-cai.ic0.app/`
- [ ] Test Internet Identity login on mainnet
- [ ] Monitor cycles balance and set freezing threshold to 90 days

### 4.5 Remove dead code
- [ ] Remove `src/declarations/veta/` and `src/declarations/vetacenter/` stubs
- [ ] Remove `src/veta_assets/src/services/wrapper.js` (dead code)
- [ ] Remove `CryppoServices.ic.js` (100% commented out)
- [ ] Remove or hide non-MVP pages behind a feature flag

---

## Effort Estimates

| Phase | Scope | Complexity |
|-------|-------|------------|
| Phase 1 | Bug fixes + canister binding | Low-Medium |
| Phase 2 | Account + data management | Medium |
| Phase 3 | Profiles + sharing | Medium |
| Phase 4 | Polish + deploy | Medium |

## Dependency Graph

```
Phase 1 (connect backend)
    │
    ├── Phase 2 (data management)
    │       │
    │       └── Phase 3 (profiles & sharing)
    │
    └── Phase 4 (polish & deploy)
         depends on Phase 2 + Phase 3
```

Phase 1 is the critical path — nothing else works until the frontend can talk to the canister.

## Architecture Decisions for MVP

1. **Single canister** — keep everything in `vetawallet`. Multi-canister is post-MVP.
2. **Data in user record** — data entries live inside `UserData.data[]` (updated atomically via `update()`). Post-MVP: separate data canister.
3. **No encryption at rest for MVP** — data is stored as plaintext in the canister. Encryption key management (vetKD) is post-MVP.
4. **Frontend-only platform registry** — platforms are just labels, not separate canisters.
5. **No pagination** — acceptable for MVP data volumes. Add before scaling.
