// @flow

import { Observable as $ } from 'rxjs';
import repeatPromiseSequential from '../repeatPromiseSequential';
import nouns from './wordBank/nouns';
import adjectives from './wordBank/adjectives';
import criterias from './wordBank/criteria';
import { type Challenge, type GameConfiguration } from './types';
import {
  requestGameStart,
  requestRoundStart,
  roundInProgress,
  revealCriteria,
} from './stateCreators';

const capitalize = s => s[0].toUpperCase() + s.slice(1);
const selectRandom = array => array[Math.floor(Math.random() * array.length)];

const gameConfig: GameConfiguration = {
  players: [],
  rounds: 7,
};

const roundCountdown = (
  { countdownLength, roundNumber, challenge },
  { setGameState },
) =>
  new Promise(resolve => {
    let secondsLeft = countdownLength;

    const setRoundState = () =>
      setGameState(roundInProgress({ challenge, secondsLeft, roundNumber }));

    const nextSecond = () => {
      secondsLeft -= 1;
      setRoundState();
    };

    $.interval(1000)
      .take(countdownLength)
      .subscribe(nextSecond, null, resolve);

    setRoundState();
  });

const generateChallenge = (): Challenge => {
  const adjective = selectRandom(adjectives);
  const noun = selectRandom(nouns);
  const challengeDescription = capitalize(`${adjective} ${noun}.`);
  const criteria = `${selectRandom(criterias)}.`;
  return { criteria, challengeDescription };
};

const doRound = async (roundNumber, { take, setGameState }) => {
  const challenge = generateChallenge();
  setGameState(requestRoundStart({ challenge, roundNumber }));
  await take('USER_STARTED_ROUND');
  await roundCountdown(
    { countdownLength: 5, roundNumber, challenge },
    { take, setGameState },
  );
  setGameState(revealCriteria({ challenge, roundNumber }));
  await take('USER_ENDED_ROUND');
};

const startGame = async (config: GameConfiguration, utils) => {
  await repeatPromiseSequential(
    roundCount => doRound(roundCount, utils),
    config.rounds,
  );
};

const play = async ({ take, setGameState }) => {
  setGameState(requestGameStart());
  await take('USER_STARTED_GAME');
  await startGame(gameConfig, { take, setGameState });
};

export default { play };
