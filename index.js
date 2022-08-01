const onlyUnique = (value, index, self) => {
	return self.indexOf(value) === index;
};

// each nested array is a team
const teams = [
	['1A', '1B'],
	['2A', '2B'],
	['3A', '3B'],
	['4A', '4B'],
	['5A', '5B'],
	['6A', '6B'],
];

// config
const numberOfRounds = 2;
const playersPerGroup = 4;
const groupsPerRound = 3;

// first tee time is set - playing partners together
const rounds = [
	[
		['1A', '1B', '2A', '2B'],
		['3A', '3B', '4A', '4B'],
		['5A', '5B', '6A', '6B'],
	],
];

const allPlayers = teams.flat();

for (let i = 0; i < numberOfRounds; i++) {
	// generate a list of available players per player
	let playerAvailableHash = rounds.reduce((memo, round) => {
		round.forEach((teeTime) => {
			teeTime.forEach((player) => {
				// player can play with anyone but themselves
				if (!memo[player]) {
					memo[player] = allPlayers.filter((p) => {
						return p !== player;
					});
				}

				// player can't play with their teammate
				const team = teams.find((team) => {
					return team.includes(player);
				});

				// player cant play with anyone they've played with
				memo[player] = memo[player].filter((p) => {
					return !teeTime.includes(p) && !team.includes(p);
				});
			});
		});

		return memo;
	}, {});

	console.log('available players');
	console.log(JSON.stringify(playerAvailableHash));
}
