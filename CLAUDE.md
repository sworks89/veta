# CLAUDE.md — Project Guide for AI Agents

## Project Overview

Veta is a **Web3 Data Wallet** on the Internet Computer. Users own, manage, and selectively share personal data via IC canisters. The project has a Motoko backend and a React frontend served by an IC asset canister.

## Architecture

```
┌─────────────────────────────────────────────┐
│  Frontend (veta_assets canister)            │
│  React 18 + MUI 6 + Berry dashboard        │
│  Built with Vite 6, served by asset canister│
├─────────────────────────────────────────────┤
│  Backend (vetawallet canister)              │
│  Motoko persistent actor + mo:core          │
│  Users, profiles, data registry, sharing    │
└─────────────────────────────────────────────┘
```

## Tech Stack

- **Backend**: Motoko (`persistent actor`, `mo:core` 2.3.1, moc 1.3.0)
- **Frontend**: React 18, MUI 6, Berry dashboard template, SCSS
- **Build**: Vite 6, mops (Motoko packages)
- **Auth**: Internet Identity via `@icp-sdk/auth`
- **CLI**: `icp-cli` (not `dfx` — never use `dfx` commands)
- **Config**: `icp.yaml` (not `dfx.json`), `mops.toml`

## Key Files

| File | Purpose |
|------|---------|
| `icp.yaml` | ICP CLI project config (canisters, networks) |
| `mops.toml` | Motoko package manager config (moc version, deps) |
| `vite.config.js` | Vite build config, dev server with ic_env cookie |
| `src/vetawallet/main.mo` | Backend canister (persistent actor) |
| `src/vetawallet/types.mo` | Shared Motoko type definitions |
| `src/veta_assets/index.html` | Frontend entry HTML (Vite root) |
| `src/veta_assets/src/index.jsx` | React entry point |
| `src/veta_assets/src/app.jsx` | Root React component (routing, theme) |
| `src/veta_assets/src/contexts/VetaIdentityContext.jsx` | Auth context (II integration) |
| `src/declarations/` | Canister binding stubs (replace with @icp-sdk/bindgen) |
| `.icp/data/mappings/ic.ids.json` | Mainnet canister IDs (commit this) |

## Commands

```bash
npm run dev          # Start Vite dev server (port 3001)
npm run build        # Production build → dist/veta_assets/
npm run preview      # Preview production build
npm test             # Run Vitest tests
icp network start -d # Start local IC replica
icp deploy           # Build + deploy all canisters
icp deploy vetawallet # Deploy backend only
```

## Motoko Conventions (ICP Skills)

Follow these rules from https://skills.internetcomputer.org:

1. **Always use `persistent actor`** — never plain `actor`. Required since moc 0.15.0.
2. **Import from `mo:core/`** — never `mo:base/`. Use `Map`, `List`, `Set` from mo:core (stable B-tree collections). Never use `HashMap`, `Buffer`, `TrieMap` from mo:base (they contain closures, are NOT stable).
3. **No `stable` keyword** — in persistent actors, all `let` and `var` are implicitly stable. Using `stable` produces warning M0218. Use `transient var` for data that should reset on upgrade.
4. **No `preupgrade`/`postupgrade`** — persistent actor handles state persistence automatically.
5. **Types inside actor body** — only `import` statements are allowed before `persistent actor`. All type definitions go inside.
6. **Reject anonymous callers** — check `Principal.isAnonymous(caller)` on all authenticated endpoints. Use `Runtime.trap()` to reject.
7. **Map API**: `Map.add(map, compare, key, value)`, `Map.get(map, compare, key)`, `Map.remove(map, compare, key)`, `Map.size(map)`, `Map.entries(map)`.

## Frontend Conventions

- **JSX files must have `.jsx` extension** — Vite does not process JSX in `.js` files
- **Imports use `@icp-sdk/auth`** and **`@icp-sdk/core`** — never `@dfinity/*`
- **II URLs**: `http://id.ai.localhost:8000` (local), `https://id.ai` (mainnet)
- **Canister IDs at runtime**: read from `ic_env` cookie via `safeGetCanisterEnv()` from `@icp-sdk/core/agent/canister-env` — never use `.env` files or `process.env.CANISTER_ID_*`
- **Auth context** (`VetaIdentityContext.jsx`): provides `principal`, `signInByICProvider()`, `signOut()`, `vetaWallet`, `refreshWallet()`
- **Layout**: `MainLayout` (authenticated, sidebar) and `MinimalLayout` (public pages)
- **Routing**: HashRouter, routes in `src/veta_assets/src/routes/`

## ICP CLI (not dfx)

Never use `dfx` commands. Always use `icp`:

| Task | Command |
|------|---------|
| Start local network | `icp network start -d` |
| Deploy all | `icp deploy` |
| Deploy to mainnet | `icp deploy -e ic` |
| Call canister | `icp canister call vetawallet method '(args)'` |
| Canister status | `icp canister status vetawallet` |

## Mainnet Canister IDs

- **vetawallet**: `k26ku-waaaa-aaaap-aahna-cai`
- **veta_assets**: `k3gdk-giaaa-aaaaj-aivfa-cai`
- **Frontend URL**: https://k3gdk-giaaa-aaaaj-aivfa-cai.ic0.app/

## Directory Structure

```
icp.yaml                          # ICP CLI config
mops.toml                         # Motoko packages
vite.config.js                    # Vite build + dev server
.icp/data/mappings/ic.ids.json    # Mainnet canister IDs (committed)
src/
├── vetawallet/                   # Motoko backend
│   ├── main.mo                  # persistent actor — users, profiles, registry
│   └── types.mo                 # Data types (UserData, Profile, Data, Record)
├── declarations/                 # Canister binding stubs
│   ├── vetawallet/index.js
│   ├── veta/index.js
│   └── vetacenter/index.js
└── veta_assets/                  # Frontend (Vite root)
    ├── index.html               # HTML entry point
    ├── assets/                  # Static files (publicDir)
    │   └── .ic-assets.json5     # SPA routing config
    └── src/
        ├── index.jsx            # React entry
        ├── app.jsx              # Root component (router + theme)
        ├── config.js            # App config
        ├── contexts/            # VetaIdentityContext (auth)
        ├── views/               # Pages
        │   ├── Dashboard/       # Main dashboard + KYC
        │   ├── DataCenter/      # Platform/data management
        │   ├── Profiles/        # User profiles + sharing
        │   ├── Platforms/       # Cryppo, SocialNetwork
        │   ├── Home/            # Landing page
        │   ├── Wallet/          # Wallet (placeholder)
        │   ├── QrCode/          # QR sharing (placeholder)
        │   └── Help/            # Help page
        ├── components/          # Reusable UI (cards, charts, profiles)
        ├── layout/              # MainLayout, MinimalLayout, sidebar
        ├── routes/              # Route definitions
        ├── services/            # Canister service wrappers
        ├── themes/              # MUI theme config
        ├── ui-component/        # Base UI components (cards, skeletons)
        ├── utils/               # Crypto (AES, SHA256)
        └── _assets/             # SCSS, images, logos
```

## Known Limitations / TODOs

- `src/declarations/` contains proxy stubs — replace with `@icp-sdk/bindgen` when canisters are deployed
- `src/veta_assets/src/utils/crypto.js` has a hardcoded encryption key (`'secret key 123'`) — must be replaced before production
- Cryppo platform services are entirely commented out (skeleton)
- No test suite yet (Vitest configured but no test files)
- `update()` endpoint doesn't verify caller owns the record being updated
