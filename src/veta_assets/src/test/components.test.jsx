import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OnboardingDialog from "../components/OnboardingDialog";

// Mock the auth context to simulate a new user
vi.mock("../contexts/VetaIdentityContext", () => ({
  default: () => ({
    principal: "test-principal",
    vetaWallet: { name: "", verified: false, profiles: [], data: [] },
    refreshWallet: vi.fn(),
  }),
  VetaIdentityContext: React.createContext({}),
}));

// Mock the actor service
vi.mock("../services/actor", () => ({
  getVetaWalletActor: () => null,
}));

describe("OnboardingDialog", () => {
  it("renders for new users with empty name", () => {
    render(<OnboardingDialog />);
    expect(screen.getByText("Welcome to Veta")).toBeInTheDocument();
    expect(screen.getByLabelText("Display Name")).toBeInTheDocument();
    expect(screen.getByText("Create Account")).toBeInTheDocument();
  });
});
