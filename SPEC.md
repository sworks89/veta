# SPEC.md — Veta Product & Technical Specification

## 1. Product Vision

Veta is a **decentralized personal data wallet** that gives users full ownership and control over their data. Built on the Internet Computer blockchain, it enables users to:

- Store personal, social, and financial data on-chain in their own canister
- Create multiple profiles for different contexts
- Share specific profiles publicly via unique IDs and QR codes
- Verify their identity through KYC integration
- Connect to external platforms (crypto, social networks) and manage data across them
- Cryptographically sign and encrypt sensitive data

**Tagline**: "Own your DATA."

## 2. User Roles

| Role | Description |
|------|-------------|
| **Visitor** | Unauthenticated user. Can view landing page, shared profiles, and public info. |
| **User** | Authenticated via Internet Identity. Can manage their data wallet, profiles, and sharing. |
| **Admin** | Reserved for future use. Admin principal list exists in backend but is currently empty. |

## 3. Core Features

### 3.1 Authentication

- **Method**: Internet Identity (passkey-based, no passwords)
- **Identity Provider**: `https://id.ai` (mainnet), `http://id.ai.localhost:8000` (local)
- **Session**: 8 hours via delegation (`maxTimeToLive`)
- **Principal**: Unique per-app — users get a different principal for Veta than for other IC apps
- **Fallback**: Mock identity for local development without IC replica

### 3.2 User Data Management

Users store structured data in the `vetawallet` canister:

```
UserData {
  id: Principal          # User's IC identity
  verified: Bool         # KYC verification status
  name: Text             # Display name
  profiles: [Profile]    # User's profiles
  data: [Data]           # User's data entries
}
```

**Operations**:
- `create(userData)` — Register a new user (binds to caller's principal)
- `update(userData)` — Update user's data
- `get(userId)` — Retrieve user data (returns empty default if not found)

### 3.3 Profiles

Users can create multiple profiles for different contexts (work, personal, public):

```
Profile {
  id: UID (Text)         # Unique profile identifier (UUID)
  profileName: Text      # Display name
  isDefault: Bool        # Whether this is the default profile
  data: [Data]           # Data entries attached to this profile
  userId: Principal      # Owner
}
```

**Sharing**:
- `shareProfile(profile)` — Publish a profile to the shared registry
- `getSharedProfile(id)` — Retrieve a shared profile by UUID (public, no auth required)
- QR code generation for sharing profile links

### 3.4 Data Entries

Individual data items with categorization and cryptographic signing:

```
Data {
  dataId: UID            # Unique data identifier
  uid: Principal         # Owner
  platformId: Principal  # Source platform
  signature: Text        # SHA256 signature (Base64)
  date: Timestamp        # Creation timestamp
  dataCategory:          # personal | social | financial
  dataType: Text         # Free-form type label
  dataContent: Text      # The actual data (may be AES-encrypted)
}
```

### 3.5 Data Registry

Provenance records that track data ownership and origin:

```
Record {
  recordId: UID          # Unique record identifier
  userId: Principal      # Data owner
  platformId: Principal  # Source platform
  dataId: UID            # Reference to the data entry
  date: Timestamp        # Registration timestamp
  signature: Text        # Cryptographic signature
}
```

**Operations**:
- `addRecord(record)` — Register a data provenance record
- `getRecord(id)` — Retrieve a record by ID

### 3.6 KYC Integration

Identity verification via the Identomat service:
- External API: `https://us-central1-thanhpage-d.cloudfunctions.net/api/v1`
- Embedded Identomat widget in the Dashboard
- Extracts: name, date of birth, nationality, document details, facial recognition
- Sets `verified: true` on the user's `UserData` after successful KYC

### 3.7 Platforms

Extensible platform architecture for connecting to external data sources:

- **Cryppo** — Cryptocurrency portfolio tracker (skeleton: holdings, transactions, assets)
- **Social Network** — Social profile and activity display (mock data)
- Future platforms can be added by creating new views in `src/veta_assets/src/views/Platforms/`

### 3.8 Encryption & Signing

- **Signing**: SHA256 hash → Base64 encoding (via `crypto-js`)
- **Encryption**: AES symmetric encryption for sensitive data content
- **Key Management**: Currently uses a hardcoded key (`'secret key 123'`) — must be replaced with a proper key derivation scheme (e.g., vetKD from Internet Computer) before production

## 4. Backend Architecture

### 4.1 Canister: `vetawallet`

- **Language**: Motoko
- **Actor type**: `persistent actor` (mo:core, moc 1.3.0)
- **Storage**: `mo:core/Map` (B-tree, stable across upgrades)
- **State**:
  - `userDB: Map<Principal, UserData>` — User accounts
  - `sharedProfiles: Map<UID, Profile>` — Publicly shared profiles
  - `dataRegistry: Map<UID, Record>` — Data provenance records
- **Security**: Anonymous principal rejection on all mutating endpoints
- **Mainnet ID**: `k26ku-waaaa-aaaap-aahna-cai`

### 4.2 Canister: `veta_assets`

- **Type**: Asset canister (serves frontend)
- **Recipe**: `@dfinity/asset-canister@v2.1.0`
- **SPA Routing**: `.ic-assets.json5` with `enable_aliasing: true`
- **Mainnet ID**: `k3gdk-giaaa-aaaaj-aivfa-cai`

### 4.3 Public API

| Method | Auth | Description |
|--------|------|-------------|
| `healthcheck()` | No | Returns `true` |
| `create(UserData)` | Yes | Create user account |
| `update(UserData)` | Yes | Update user data |
| `get(UserId)` | No | Get user data (returns default if not found) |
| `shareProfile(Profile)` | Yes | Publish profile to shared registry |
| `getSharedProfile(UID)` | No | Retrieve shared profile |
| `addRecord(Record)` | Yes | Register data provenance record |
| `getRecord(UID)` | No | Retrieve record |
| `getOwnId()` | No | Returns caller's principal |

## 5. Frontend Architecture

### 5.1 Framework

- React 18 with HashRouter
- MUI 6 (Material UI) with Berry free dashboard template
- Vite 6 for build and dev server
- SCSS for custom styles

### 5.2 Pages

| Route | Component | Layout | Auth | Description |
|-------|-----------|--------|------|-------------|
| `/` | Home | Minimal | No | Landing page with feature showcase |
| `/center` | DataCenter | Minimal | No | Public data management interface |
| `/profile/:id` | ViewSharedProfile | Minimal | No | View a shared profile |
| `/dashboard` | Dashboard | Main | Yes | User dashboard with KYC |
| `/dashboard/profiles` | Profiles | Main | Yes | Manage profiles |
| `/dashboard/wallet` | Wallet | Main | Yes | Wallet (placeholder) |
| `/dashboard/qrcode` | QrCode | Main | Yes | QR code sharing |
| `/dashboard/help` | Help | Main | Yes | Help page |
| `/dashboard/platforms` | — | Main | Yes | Platform hub |
| `/dashboard/platforms/cryppo` | Cryppo | Main | Yes | Crypto platform |
| `/dashboard/platforms/socialnetwork` | SocialNetwork | Main | Yes | Social platform |

### 5.3 State Management

- **Auth**: `VetaIdentityContext` (React Context) — provides principal, auth methods, wallet data
- **Layout**: `MainLayoutContext` — sidebar state, customization
- No external state library (Redux, Zustand, etc.)

### 5.4 Canister Communication

Currently using stub proxies in `src/declarations/`. When canisters are deployed:

1. Generate `.did` files: `icp build vetawallet`
2. Generate TypeScript bindings: `@icp-sdk/bindgen` Vite plugin
3. Read canister IDs from `ic_env` cookie: `safeGetCanisterEnv()`
4. Create authenticated actors with identity from `AuthClient`

## 6. Security Considerations

| Area | Status | Notes |
|------|--------|-------|
| Anonymous rejection | Done | All mutating endpoints check `Principal.isAnonymous()` |
| Caller verification on `update()` | Missing | Should verify `msg.caller == userData.id` |
| Encryption key | Hardcoded | Replace `'secret key 123'` with vetKD or user-derived key |
| Raw domain access | Disabled | `.ic-assets.json5` sets `allow_raw_access: false` |
| Input validation | Missing | No size limits on user-supplied Text fields |
| Rate limiting | Missing | No per-user storage quotas |
| Admin system | Skeleton | Admin list exists but is empty |

## 7. Deployment

### Local Development

```bash
npm install
npm i -g ic-mops && mops install
icp network start -d    # Starts local replica with Internet Identity
icp deploy              # Deploy vetawallet + veta_assets
npm run dev             # Vite dev server on port 3001
```

### Mainnet Deployment

```bash
icp deploy -e ic        # Deploy to mainnet
```

### Environment Configuration

- `ICP_ENVIRONMENT=local|ic` — controls which environment the Vite dev server targets
- No `.env` files — canister IDs come from `ic_env` cookie at runtime

## 8. Data Model Diagram

```
Principal (Internet Identity)
    │
    ├── UserData
    │   ├── name
    │   ├── verified (KYC status)
    │   ├── profiles[] ──────────┐
    │   │   ├── Profile          │
    │   │   │   ├── id (UUID)    │
    │   │   │   ├── profileName  │
    │   │   │   ├── isDefault    │
    │   │   │   └── data[] ──────┼──┐
    │   │   └── ...              │  │
    │   └── data[] ──────────────┘  │
    │       ├── Data                │
    │       │   ├── dataId (UUID)   │
    │       │   ├── platformId      │
    │       │   ├── signature       │
    │       │   ├── dataCategory    │
    │       │   ├── dataType        │
    │       │   └── dataContent     │
    │       └── ...                 │
    │                               │
    └── Records[]                   │
        ├── Record                  │
        │   ├── recordId (UUID)     │
        │   ├── dataId ────────────►┘
        │   ├── platformId
        │   ├── signature
        │   └── date
        └── ...

Shared Profiles (public, keyed by UUID):
    Profile → accessible via getSharedProfile(id)
```

## 9. Future Roadmap

1. **Replace declaration stubs** with `@icp-sdk/bindgen` generated bindings
2. **Implement vetKD** for proper encryption key derivation
3. **Add input validation** and per-user storage quotas
4. **Caller verification** on `update()` — ensure users can only modify their own data
5. **Pagination** on data queries to avoid 2MB response limits at scale
6. **Cryppo platform** — connect to real DeFi protocols for portfolio tracking
7. **ICRC signer integration** — wallet-based transaction approval (see wallet-integration ICP skill)
8. **Test suite** — add Vitest tests for frontend components and service layer
9. **CI/CD pipeline** — automated testing and deployment on push
10. **Multi-canister architecture** — split user data and registry into separate canisters for scaling
