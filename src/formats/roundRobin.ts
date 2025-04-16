export function generateRoundRobin(teams: string[]) {
  let teamsCopy = teams.length % 2 === 0 ? teams.slice() : [...teams.slice(), "bye"];

  let matches = [];
  for (let i = 0; i < roundsFor(teamsCopy.length); i++) {
    for (let j = 0; j < matchesPerRoundFor(teamsCopy.length); j++) {
      matches.push({
        home: teamsCopy[j],
        away: teamsCopy[teamsCopy.length - 1 - j],
      });
    }

    const fixedTeam = teamsCopy.pop();
    teamsCopy = [teamsCopy[teamsCopy.length - 1], ...teamsCopy.slice(0, -1), fixedTeam!];
  }

  return matches.filter(({ home, away }) => !(home === "bye" || away === "bye"));

  function roundsFor(aQuantity: number) {
    return aQuantity - 1;
  }

  function matchesPerRoundFor(aQuantity: number) {
    return aQuantity / 2;
  }
}
