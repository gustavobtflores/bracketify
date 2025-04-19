import { expect, describe, it } from "vitest";
import { createTournament } from "../../src/index";

describe("Create tournament tests", () => {
  it("should correctly create a round robin tournament", () => {
    const teams = ["Alpha", "Bravo", "Charlie", "Delta"];

    const tournament = createTournament({
      format: "round_robin",
      teams,
    });

    expect(tournament).toEqual({
      format: "round_robin",
      teams,
      matches: tournament.matches,
    });
  });
});
