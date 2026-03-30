// Actor factory for canister communication.
// Creates authenticated actors using the ic_env cookie pattern.
//
// When @icp-sdk/bindgen is set up, replace the manual idlFactory below
// with the generated one from src/bindings/vetawallet.

import { Actor, HttpAgent } from '@icp-sdk/core/agent';
import { IDL } from '@icp-sdk/core/candid';

// ── Candid IDL factory (matches src/vetawallet/vetawallet.did) ──────

const DataCategory = IDL.Variant({
  personal: IDL.Null,
  social: IDL.Null,
  financial: IDL.Null,
});

const Data = IDL.Record({
  dataId: IDL.Text,
  uid: IDL.Principal,
  platformId: IDL.Principal,
  signature: IDL.Text,
  date: IDL.Int,
  dataCategory: DataCategory,
  dataType: IDL.Text,
  dataContent: IDL.Text,
});

const Profile = IDL.Record({
  id: IDL.Text,
  profileName: IDL.Text,
  isDefault: IDL.Bool,
  data: IDL.Vec(Data),
  userId: IDL.Principal,
});

const UserData = IDL.Record({
  id: IDL.Principal,
  verified: IDL.Bool,
  name: IDL.Text,
  profiles: IDL.Vec(Profile),
  data: IDL.Vec(Data),
});

const Record = IDL.Record({
  recordId: IDL.Text,
  userId: IDL.Principal,
  platformId: IDL.Principal,
  dataId: IDL.Text,
  date: IDL.Int,
  signature: IDL.Text,
});

const idlFactory = ({ IDL: _IDL }) =>
  IDL.Service({
    healthcheck: IDL.Func([], [IDL.Bool], []),
    create: IDL.Func([UserData], [], []),
    update: IDL.Func([UserData], [], []),
    get: IDL.Func([IDL.Principal], [UserData], ['query']),
    shareProfile: IDL.Func([Profile], [], []),
    getSharedProfile: IDL.Func([IDL.Text], [IDL.Opt(Profile)], ['query']),
    addRecord: IDL.Func([Record], [], []),
    getRecord: IDL.Func([IDL.Text], [IDL.Opt(Record)], ['query']),
    getOwnId: IDL.Func([], [IDL.Principal], ['query']),
  });

// ── Actor management ────────────────────────────────────────────────

let _actor = null;
let _canisterId = null;

// Try to read canister ID from ic_env cookie (set by asset canister or Vite dev server).
// Falls back to the known mainnet canister ID.
function getCanisterId() {
  if (_canisterId) return _canisterId;

  // Try ic_env cookie
  try {
    const cookie = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('ic_env='));
    if (cookie) {
      const params = new URLSearchParams(decodeURIComponent(cookie.split('=').slice(1).join('=')));
      const id = params.get('PUBLIC_CANISTER_ID:vetawallet');
      if (id) {
        _canisterId = id;
        return id;
      }
    }
  } catch {
    // cookie parsing failed
  }

  // Fallback: mainnet canister ID
  _canisterId = 'k26ku-waaaa-aaaap-aahna-cai';
  return _canisterId;
}

function getRootKey() {
  try {
    const cookie = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('ic_env='));
    if (cookie) {
      const params = new URLSearchParams(decodeURIComponent(cookie.split('=').slice(1).join('=')));
      return params.get('ic_root_key') || undefined;
    }
  } catch {
    // no cookie
  }
  return undefined;
}

/**
 * Create (or re-create) the vetawallet actor with the given identity.
 * Call this after login to get an authenticated actor.
 */
export async function createVetaWalletActor(identity) {
  const canisterId = getCanisterId();
  const rootKey = getRootKey();

  const agent = await HttpAgent.create({
    identity,
    host: window.location.origin,
    ...(rootKey ? { rootKey } : {}),
  });

  _actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });

  return _actor;
}

/**
 * Create an anonymous (unauthenticated) actor for query calls.
 */
export async function createAnonymousActor() {
  const canisterId = getCanisterId();
  const rootKey = getRootKey();

  const agent = await HttpAgent.create({
    host: window.location.origin,
    ...(rootKey ? { rootKey } : {}),
  });

  _actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });

  return _actor;
}

/**
 * Get the current actor instance. Returns null if not yet created.
 */
export function getVetaWalletActor() {
  return _actor;
}

/**
 * Clear the actor (on logout).
 */
export function clearActor() {
  _actor = null;
}
