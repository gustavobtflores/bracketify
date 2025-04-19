interface SingleEliminationMatch {
  id: string;
  homeTeam: string | null;
  awayTeam: string | null;
  winnerNextMatchId: string | null;
}

export function generateSingleElimination(seeded: string[]) {
  if (!Number.isInteger(totalRounds())) throw new Error("The amount of teams should be a power of 2");

  let result: SingleEliminationMatch[] = [];
  for (let round = 1; round <= totalRounds(); round++) {
    const isFirstRound = round === 1;

    for (let match = 0; match < totalMatchesFor(round); match++) {
      const nextRoundId = getRoundName(round + 1, totalRounds());

      result.push({
        id: `${getRoundName(round, totalRounds())}-${match}`,
        homeTeam: isFirstRound ? seeded[match] : null,
        awayTeam: isFirstRound ? seeded[seeded.length - 1 - match] : null,
        winnerNextMatchId: nextRoundId,
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
    return seeded.length / (2 * aRound);
  }
}
