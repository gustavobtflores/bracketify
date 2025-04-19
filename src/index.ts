import { generateRoundRobin } from "./formats/roundRobin.ts";

interface RoundRobinOptions {}

type ITournamentParams = { format: "round_robin"; options?: RoundRobinOptions; teams: string[] };

function createTournament({ format, teams }: ITournamentParams) {
  switch (format) {
    case "round_robin":
      return {
        format,
        teams,
        matches: generateRoundRobin(teams),
      };
  }
}

export { createTournament, generateRoundRobin };
