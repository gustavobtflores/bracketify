import { expect, describe, it } from "vitest";
import { generateRoundRobin } from "../../src/formats/roundRobin";

describe("Round-Robin tests", () => {
  it("should correctly generate matches", () => {
    const teams = ["Alpha", "Bravo", "Charlie", "Delta"];
    const matches = generateRoundRobin(teams);
    expect(matches).toHaveLength(6);
  });

  it("should correctly generate matches with odd teams", () => {
    const teams = ["Alpha", "Bravo", "Charlie", "Delta", "Echo"];
    const matches = generateRoundRobin(teams);
    expect(matches).toHaveLength(10);
  });
});
