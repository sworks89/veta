// Actor factory for canister communication.

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

const ApiResult = IDL.Variant({
  ok: IDL.Null,
  err: IDL.Text,
});

const idlFactory = ({ IDL: _IDL }) =>
  IDL.Service({
    healthcheck: IDL.Func([], [IDL.Bool], []),
    create: IDL.Func([UserData], [ApiResult], []),
    update: IDL.Func([UserData], [ApiResult], []),
    deleteAccount: IDL.Func([], [ApiResult], []),
    get: IDL.Func([IDL.Principal], [UserData], ['query']),
    getDataCount: IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    getDataPage: IDL.Func([IDL.Principal, IDL.Nat, IDL.Nat], [IDL.Vec(Data)], ['query']),
    shareProfile: IDL.Func([Profile], [ApiResult], []),
    getSharedProfile: IDL.Func([IDL.Text], [IDL.Opt(Profile)], ['query']),
    unshareProfile: IDL.Func([IDL.Text], [ApiResult], []),
    addRecord: IDL.Func([Record], [ApiResult], []),
    getRecord: IDL.Func([IDL.Text], [IDL.Opt(Record)], ['query']),
    getOwnId: IDL.Func([], [IDL.Principal], ['query']),
  });

// ── Result helper ───────────────────────────────────────────────────

export function unwrapResult(result) {
  if ('ok' in result) return;
  if ('err' in result) throw new Error(result.err);
  throw new Error('Unexpected canister response');
}

// ── Actor management ────────────────────────────────────────────────

let _actor = null;
let _canisterId = null;

function getCanisterId() {
  if (_canisterId) return _canisterId;
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

export async function createVetaWalletActor(identity) {
  const canisterId = getCanisterId();
  const rootKey = getRootKey();
  const agent = await HttpAgent.create({
    identity,
    host: window.location.origin,
    ...(rootKey ? { rootKey } : {}),
  });
  _actor = Actor.createActor(idlFactory, { agent, canisterId });
  return _actor;
}

export async function createAnonymousActor() {
  const canisterId = getCanisterId();
  const rootKey = getRootKey();
  const agent = await HttpAgent.create({
    host: window.location.origin,
    ...(rootKey ? { rootKey } : {}),
  });
  _actor = Actor.createActor(idlFactory, { agent, canisterId });
  return _actor;
}

export function getVetaWalletActor() {
  return _actor;
}

export function clearActor() {
  _actor = null;
}
