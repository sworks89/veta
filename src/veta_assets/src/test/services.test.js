import { describe, it, expect, vi, beforeEach } from 'vitest';
import { unwrapResult } from '../services/actor';

describe('unwrapResult', () => {
  it('does nothing for #ok result', () => {
    expect(() => unwrapResult({ ok: null })).not.toThrow();
  });

  it('throws for #err result with message', () => {
    expect(() => unwrapResult({ err: 'Account already exists' })).toThrow(
      'Account already exists',
    );
  });

  it('throws for unknown result shape', () => {
    expect(() => unwrapResult({})).toThrow('Unexpected canister response');
  });

  it('throws for null', () => {
    expect(() => unwrapResult(null)).toThrow();
  });
});

// Mock the actor module for service tests
const mockActor = {
  get: vi.fn(),
  update: vi.fn(),
  shareProfile: vi.fn(),
  unshareProfile: vi.fn(),
  getSharedProfile: vi.fn(),
  deleteAccount: vi.fn(),
};

vi.mock('../services/actor', async () => {
  const actual = await vi.importActual('../services/actor');
  return {
    ...actual,
    getVetaWalletActor: () => mockActor,
  };
});

describe('VetaWalletServices', () => {
  let services;

  beforeEach(async () => {
    vi.clearAllMocks();
    services = await import('../services/VetaWalletServices.ic');
  });

  describe('addProfile', () => {
    it('appends a profile and calls update', async () => {
      const principal = 'test-principal';
      mockActor.get.mockResolvedValue({ profiles: [], data: [], name: 'Test', id: principal, verified: false });
      mockActor.update.mockResolvedValue({ ok: null });

      await services.addProfile(principal, { name: 'Work' });

      expect(mockActor.get).toHaveBeenCalledWith(principal);
      expect(mockActor.update).toHaveBeenCalled();
      const updateArg = mockActor.update.mock.calls[0][0];
      expect(updateArg.profiles).toHaveLength(1);
      expect(updateArg.profiles[0].profileName).toBe('Work');
      expect(updateArg.profiles[0].id).toBeTruthy();
    });
  });

  describe('deleteProfile', () => {
    it('removes a profile by ID', async () => {
      const principal = 'test-principal';
      mockActor.get.mockResolvedValue({
        profiles: [
          { id: 'keep', profileName: 'A', data: [], isDefault: false, userId: principal },
          { id: 'remove', profileName: 'B', data: [], isDefault: false, userId: principal },
        ],
        data: [],
        name: 'Test',
        id: principal,
        verified: false,
      });
      mockActor.update.mockResolvedValue({ ok: null });

      await services.deleteProfile(principal, 'remove');

      const updateArg = mockActor.update.mock.calls[0][0];
      expect(updateArg.profiles).toHaveLength(1);
      expect(updateArg.profiles[0].id).toBe('keep');
    });
  });

  describe('deleteDataEntry', () => {
    it('removes a data entry and cleans profiles', async () => {
      const principal = 'test-principal';
      const entry1 = { dataId: 'e1', dataType: 'Email', dataContent: 'a@b.com', uid: principal, platformId: principal, signature: '', date: 0, dataCategory: { personal: null } };
      const entry2 = { dataId: 'e2', dataType: 'Phone', dataContent: '555', uid: principal, platformId: principal, signature: '', date: 0, dataCategory: { personal: null } };

      mockActor.get.mockResolvedValue({
        data: [entry1, entry2],
        profiles: [{ id: 'p1', profileName: 'Work', data: [entry1, entry2], isDefault: false, userId: principal }],
        name: 'Test',
        id: principal,
        verified: false,
      });
      mockActor.update.mockResolvedValue({ ok: null });

      await services.deleteDataEntry(principal, 'e1');

      const updateArg = mockActor.update.mock.calls[0][0];
      expect(updateArg.data).toHaveLength(1);
      expect(updateArg.data[0].dataId).toBe('e2');
      expect(updateArg.profiles[0].data).toHaveLength(1);
      expect(updateArg.profiles[0].data[0].dataId).toBe('e2');
    });
  });

  describe('shareProfile', () => {
    it('calls actor.shareProfile and unwraps', async () => {
      mockActor.shareProfile.mockResolvedValue({ ok: null });

      const result = await services.shareProfile({ id: 'p1', profileName: 'Test', data: [], isDefault: false, userId: 'x' });
      expect(result).toBe(true);
    });

    it('throws on canister error', async () => {
      mockActor.shareProfile.mockResolvedValue({ err: 'profileName exceeds max length' });
      await expect(
        services.shareProfile({ id: 'p1', profileName: 'x', data: [], isDefault: false, userId: 'x' }),
      ).rejects.toThrow('profileName exceeds max length');
    });
  });

  describe('deleteAccount', () => {
    it('calls actor.deleteAccount and unwraps', async () => {
      mockActor.deleteAccount.mockResolvedValue({ ok: null });
      const result = await services.deleteAccount();
      expect(result).toBe(true);
    });
  });
});
