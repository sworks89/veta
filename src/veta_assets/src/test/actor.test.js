import { describe, it, expect, beforeEach } from "vitest";
import { getVetaWalletActor, clearActor } from "../services/actor";

describe("actor service", () => {
  beforeEach(() => {
    clearActor();
  });

  it("returns null when no actor is created", () => {
    expect(getVetaWalletActor()).toBeNull();
  });

  it("returns null after clearActor()", () => {
    // Even if it was somehow set, clear should reset
    clearActor();
    expect(getVetaWalletActor()).toBeNull();
  });
});
