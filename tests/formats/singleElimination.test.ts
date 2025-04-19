import { expect, describe, it } from "vitest";
import { generateSingleElimination } from "../../src/formats/singleElimination";

describe("Single elimination tests", () => {
  it("should correctly generate matches", () => {
    const seededTeams = ["Bravo", "Charlie", "Delta", "Alpha"];

    const matches = generateSingleElimination(seededTeams);

    expect(matches).toHaveLength(3);
  });

  it("should throw an error if teams amount is invalid", () => {
    const seededTeams = ["Bravo", "Charlie", "Delta", "Alpha", "Echo"];

    expect(() => generateSingleElimination(seededTeams)).toThrow("The amount of teams should be a power of 2");
  });
});
