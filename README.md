# Veta — Web3 Data Wallet

**Own your DATA.** Veta is a decentralized data wallet built on the [Internet Computer](https://internetcomputer.org/). Store, manage, and selectively share your personal data — without relying on centralized platforms.

## Features

- **Data Ownership** — Store personal, social, and financial data in your own IC canister
- **User Profiles** — Create multiple profiles, share them publicly via unique IDs and QR codes
- **KYC Integration** — Identity verification via Identomat widget
- **Data Registry** — Track data ownership and provenance with cryptographic signatures
- **Platform Extensibility** — Pluggable platform architecture (Cryppo, Social Network)
- **Authentication** — Internet Identity via `@icp-sdk/auth` (passkeys, no passwords)
- **Privacy** — AES encryption for sensitive data, SHA256 signing
- **Persistent Storage** — `persistent actor` with `mo:core` stable collections
- **Modern Stack** — React 18, MUI 6, Vite 6, icp-cli

## Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Backend    | Motoko (`persistent actor`, `mo:core` 2.3.1)  |
| Frontend   | React 18, MUI 6, Berry dashboard template     |
| Build      | Vite 6, mops (Motoko package manager)         |
| Auth       | Internet Identity via `@icp-sdk/auth`         |
| CLI        | `icp-cli` (modern replacement for `dfx`)      |

## Quick Start

```bash
npm install
npm i -g ic-mops && mops install
icp network start -d
icp deploy
npm run dev
```

The app runs at `http://localhost:3001`.

## Mainnet

Deployed canisters:
- **vetawallet**: `k26ku-waaaa-aaaap-aahna-cai`
- **veta_assets**: `k3gdk-giaaa-aaaaj-aivfa-cai`
- **URL**: https://k3gdk-giaaa-aaaaj-aivfa-cai.ic0.app/

## Project Structure

```
icp.yaml                     # ICP CLI project config
mops.toml                    # Motoko package manager config
src/
├── vetawallet/              # Motoko backend canister
│   ├── main.mo             # persistent actor — users, profiles, data registry
│   └── types.mo            # Shared data types
├── declarations/            # Canister binding stubs (replace with @icp-sdk/bindgen)
└── veta_assets/             # React frontend
    ├── index.html
    ├── assets/              # Static assets (favicon, images)
    └── src/
        ├── components/      # Reusable UI components
        ├── contexts/        # React contexts (VetaIdentityContext)
        ├── layout/          # MainLayout, MinimalLayout, sidebar, header
        ├── views/           # Pages (Dashboard, DataCenter, Profiles, Platforms, etc.)
        ├── services/        # Canister service adapters
        ├── themes/          # MUI theme configuration
        └── utils/           # Crypto utilities
```

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |
| `npm test`        | Run tests                |

## License

MIT
