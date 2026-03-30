# Production Readiness Analysis

## Current State

The MVP is functionally complete — users can log in, create accounts, add data, create profiles, attach data to profiles, share profiles publicly via QR/link, and view shared profiles. All 4 MVP phases are shipped with 11 passing tests and a clean build.

However, several areas need work before this is production-grade.

---

## Critical (Must fix before mainnet launch)

### 1. Backend Error Handling — Use Result Types Instead of Traps

**Problem**: Every validation failure calls `Runtime.trap()` which kills the canister call with an opaque error. The frontend gets a generic rejection with no useful message.

**Fix**: Return `Result<T, Text>` from all mutating endpoints. Reserve `Runtime.trap()` for truly unrecoverable states (anonymous caller).

```motoko
// Before (MVP):
public shared(msg) func create(userData : UserData) : async () {
  validateText(userData.name, 128, "name"); // traps on failure
};

// After (production):
public shared(msg) func create(userData : UserData) : async Result.Result<(), Text> {
  if (userData.name.size() > 128) return #err("Name must be 128 characters or less");
  ...
  #ok()
};
```

**Scope**: Rewrite `create()`, `update()`, `shareProfile()`, `addRecord()` to return Results. Update the `.did` file and `actor.js` IDL factory to match. Update all frontend call sites to handle `#ok`/`#err`.

### 2. Create Idempotency — Prevent Duplicate Accounts

**Problem**: Calling `create()` twice with the same principal silently overwrites the first account. A user could lose all their data with a double-click.

**Fix**: Check if user exists before creating:
```motoko
if (Map.get(userDB, Principal.compare, msg.caller) != null) {
  return #err("Account already exists");
};
```

### 3. Session Expiry Handling

**Problem**: The auth session (8-hour delegation from II) expires silently. The user stays "logged in" in the UI but all canister calls fail with cryptic errors.

**Fix**:
- Check `authClient.isAuthenticated()` before canister calls
- Add a session countdown/warning component
- Automatically redirect to login on 401-type rejections
- Add a "Session expired" dialog with re-login button

### 4. Mock Auth Leak to Production

**Problem**: When `AuthClient.create()` fails (e.g. no `indexedDB`), the context falls back to a mock principal (`dev-xxxxx`). This could happen on some browsers in production.

**Fix**: Only enable mock fallback when `import.meta.env.DEV` is true. In production, show an error message instead.

### 5. Route Protection

**Problem**: All dashboard routes render even when not authenticated. The `MainLayout` shows "Please connect your identity" but the routes are still accessible.

**Fix**: Add a route guard component that redirects unauthenticated users to the landing page:
```jsx
const ProtectedRoute = ({ children }) => {
  const { principal } = useVetaIdentity();
  if (!principal) return <Navigate to="/" />;
  return children;
};
```

---

## High Priority (Should fix before scaling)

### 6. Missing CRUD Operations

| Operation | Current | Needed |
|-----------|---------|--------|
| Delete data entry | Not possible | Remove from `userData.data[]` by dataId |
| Update data entry | Not possible | Replace entry in array by dataId |
| Delete profile | Not possible | Remove from `profiles[]` by id |
| Delete account | Not possible | Remove from `userDB` |
| Revoke shared profile | Not possible | Remove from `sharedProfiles` map |

These can all be implemented as frontend operations that call `actor.update()` with the modified arrays, except revoke share which needs a new `unshareProfile(id)` backend endpoint.

### 7. Pagination

**Problem**: `get(userId)` returns the entire `UserData` including all data entries and profiles. At 1000 entries with 10KB content each, that's ~10MB — well over the 2MB IC response limit.

**Fix**: Add paginated query endpoints:
```motoko
public query func listData(userId : UserId, offset : Nat, limit : Nat) : async [Data] { ... };
public query func dataCount(userId : UserId) : async Nat { ... };
```

### 8. Replace Manual IDL with @icp-sdk/bindgen

**Problem**: `actor.js` has 70 lines of hand-written Candid IDL that must be kept in sync with `main.mo` and `vetawallet.did`. Any mismatch causes silent encoding failures.

**Fix**:
1. Add `@icp-sdk/bindgen` as dev dependency
2. Add `icpBindgen({ didFile: "src/vetawallet/vetawallet.did", outDir: "./src/bindings" })` to vite.config.js
3. Replace manual IDL in `actor.js` with generated `createActor` from bindings
4. Delete the manual IDL factory code

### 9. CI/CD Pipeline

**Minimum viable pipeline** (GitHub Actions):
```yaml
on: push
jobs:
  test:
    - npm ci
    - npm test
    - npm run build
```

Add branch protection rules requiring the CI check to pass before merging.

### 10. Error Monitoring

**Problem**: All errors go to `console.warn`/`console.error`. In production, these are invisible.

**Fix**: Add a lightweight error boundary that reports to a logging service. Options for IC:
- Write errors to a canister-side log (IC has no Sentry equivalent)
- Use `canister_inspect_message` for request logging
- Frontend: add a global error handler that shows a toast and logs to a diagnostic endpoint

---

## Medium Priority (Quality of life)

### 11. Code Splitting

**Problem**: Single 1.7MB JS bundle loads everything upfront — Cryppo charts, Social Network, all MUI components.

**Fix**: Lazy load routes:
```jsx
const Dashboard = Loadable(lazy(() => import('../views/Dashboard')));
const DataCenter = Loadable(lazy(() => import('../views/DataCenter')));
```
The `Loadable` wrapper already exists in the codebase but is only used for `SamplePage`.

### 12. Content Sanitization

**Problem**: User-generated content (profile names, data content) is rendered directly in JSX. While React escapes HTML by default, defense-in-depth is warranted.

**Fix**: Add `DOMPurify` for any content that could contain markup. Add Content-Security-Policy headers in `.ic-assets.json5`.

### 13. Platform Principal Validation

**Problem**: Data Center accepts any string as a platform Principal ID. Invalid principals will cause encoding errors when sent to the canister.

**Fix**: Validate with `Principal.fromText()` and show an error if invalid.

### 14. Expanded Test Suite

Current: 11 tests (crypto, actor null state, OnboardingDialog render).

Needed:
- **Service tests**: Mock actor, test `addProfile`, `shareProfile`, `getSharedProfile`
- **Component tests**: Dashboard renders stats, DataCenter form validation, ProfileDetail checkbox state
- **Integration tests**: Full flow — create account → add data → create profile → share → view

Target: 40+ tests covering all critical paths.

### 15. Linting & Formatting

**Problem**: No ESLint or Prettier configured. Code style varies between files.

**Fix**: Add `eslint` + `eslint-plugin-react` + `prettier`. Add pre-commit hook via `husky` + `lint-staged`.

---

## Low Priority (Post-launch improvements)

### 16. Wallet Page
Currently a stub. Could show:
- Cycles balance of the user's canisters (if applicable)
- ICP balance via ICRC-1 ledger query
- Transaction history

### 17. Help Page
Currently static with non-functional buttons. Replace with:
- Getting started guide
- FAQ
- Link to documentation

### 18. Landing Page Updates
- Update copyright year (currently "2022")
- Verify team member links still work
- Add link to dashboard for logged-in users
- Add "View Demo" flow

### 19. Offline Support
- Cache wallet data in `localStorage` for offline viewing
- Queue mutations for when connection is restored
- Show offline indicator

### 20. Encryption Upgrade
- Replace SHA256-of-principal key derivation with vetKD (IC's threshold key derivation)
- This enables: key recovery, multi-device sync, granular per-field encryption

---

## Summary

| Priority | Items | Effort |
|----------|-------|--------|
| **Critical** (blocks launch) | 5 items | ~40 hours |
| **High** (blocks scaling) | 5 items | ~50 hours |
| **Medium** (quality) | 5 items | ~30 hours |
| **Low** (post-launch) | 5 items | ~40 hours |

**Recommended launch path**: Fix the 5 critical items, ship to mainnet, then iterate on high/medium items based on user feedback.
