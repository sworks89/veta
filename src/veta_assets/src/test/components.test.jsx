import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// ── Mocks ───────────────────────────────────────────────────────────

vi.mock('../contexts/VetaIdentityContext', () => ({
  default: () => ({
    principal: 'test-principal',
    vetaWallet: { name: '', verified: false, profiles: [], data: [] },
    refreshWallet: vi.fn(),
  }),
  VetaIdentityContext: React.createContext({}),
}));

vi.mock('../services/actor', () => ({
  getVetaWalletActor: () => null,
  unwrapResult: (r) => {
    if (r && 'err' in r) throw new Error(r.err);
  },
}));

// ── OnboardingDialog ────────────────────────────────────────────────

import OnboardingDialog from '../components/OnboardingDialog';

describe('OnboardingDialog', () => {
  it('renders for new users with empty name', () => {
    render(<OnboardingDialog />);
    expect(screen.getByText('Welcome to Veta')).toBeInTheDocument();
    expect(screen.getByLabelText('Display Name')).toBeInTheDocument();
  });

  it('has a disabled Create Account button when name is blank', () => {
    render(<OnboardingDialog />);
    const btn = screen.getByText('Create Account').closest('button');
    expect(btn).toBeDisabled();
  });

  it('enables button when name is entered', () => {
    render(<OnboardingDialog />);
    const input = screen.getByLabelText('Display Name');
    fireEvent.change(input, { target: { value: 'Alice' } });
    const btn = screen.getByText('Create Account').closest('button');
    expect(btn).not.toBeDisabled();
  });

  it('shows description text', () => {
    render(<OnboardingDialog />);
    expect(screen.getByText(/Set up your data wallet/)).toBeInTheDocument();
  });
});

// ── AuthGuard ───────────────────────────────────────────────────────

describe('AuthGuard', () => {
  it('is defined and importable', async () => {
    const mod = await import('../components/AuthGuard');
    expect(mod.default).toBeDefined();
  });
});

// ── SessionExpiredDialog ────────────────────────────────────────────

describe('SessionExpiredDialog', () => {
  it('is defined and importable', async () => {
    const mod = await import('../components/SessionExpiredDialog');
    expect(mod.default).toBeDefined();
  });
});
