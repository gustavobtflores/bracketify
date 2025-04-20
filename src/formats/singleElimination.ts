interface SingleEliminationMatch {
  id: string;
  homeTeam: string | null;
  awayTeam: string | null;
  winnerNextMatchId: string | null;
  winnerNextMatchSeat: "home" | "away" | null;
  round: number;
  position: number;
}

// TODO: adicionar geração de bye's
export function generateSingleElimination(seeded: string[]) {
  if (!Number.isInteger(totalRounds())) throw new Error("The amount of teams should be a power of 2");

  const seats = ["home", "away"] as const;

  const result: SingleEliminationMatch[] = [];
  for (let round = 1; round <= totalRounds(); round++) {
    const isFirstRound = round === 1;

    for (let match = 0; match < totalMatchesFor(round); match++) {
      const nextRoundId = getRoundName(round + 1, totalRounds());
      const nextRoundNumber = Math.ceil((match + 1) / 2);

      result.push({
        id: `${getRoundName(round, totalRounds())}-${match + 1}`,
        homeTeam: isFirstRound ? seeded[match] : null,
        awayTeam: isFirstRound ? seeded[seeded.length - 1 - match] : null,
        winnerNextMatchSeat: nextRoundId !== null ? seats[match % 2] : null,
        winnerNextMatchId: nextRoundId !== null ? `${nextRoundId}-${nextRoundNumber}` : null,
        round,
        position: match + 1,
      });
    }
  }

  return result;

  function getRoundName(round: number, totalRounds: number) {
    if (round > totalRounds) return null;
    if (round === totalRounds) return "FF";
    if (round === totalRounds - 1) return "SF";
    if (round === totalRounds - 2) return "QF";

    const power = 2 ** (totalRounds - round);
    return "R" + power;
  }

  function totalRounds() {
    return Math.log(seeded.length) / Math.log(2);
  }

  function totalMatchesFor(aRound: number) {
    return seeded.length / 2 ** aRound;
  }
}
