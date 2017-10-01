// @flow

import Rx, { Observable as $ } from 'rxjs';
import repeatPromiseSequential from '../repeatPromiseSequential';
import nouns from './wordBank/nouns';
import adjectives from './wordBank/adjectives';
import criteria from './wordBank/criteria';
import {
  type Challenge,
  type GameConfiguration,
  SCREENS,
  USER_EVENTS,
} from './types';
import {
  requestGameStart,
  requestRoundStart,
  roundInProgress,
  revealCriteria,
} from './stateCreators';

const selectRandom = array => array[Math.floor(Math.random() * array.length)];

type Screen = $Keys<typeof SCREENS>;
type UserEvent = $Keys<typeof USER_EVENTS>;
type GameState = {
  screen: Screen,
};

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

const generateChallenge = (): Challenge => ({
  criteria: `Winner is: ${selectRandom(criteria)}.`,
  challengeDescription: `${selectRandom(adjectives)} ${selectRandom(nouns)}.`,
});

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

export default class GameEngineConnector {
  fromUI$ = new Rx.Subject();
  gameState$ = new Rx.Subject();
  utils: {
    setGameState: (state: GameState) => void,
    take: UserEvent => Promise<*>,
  };

  constructor(onGameStateChanged: Object => void, onAsk: any => Promise<*>) {
    this.gameState$.subscribe(onGameStateChanged);

    const setGameState = state => this.gameState$.next(state);
    const take = str =>
      new Promise(resolve => {
        this.fromUI$
          .filter(event => str === event)
          .take(1)
          .do(resolve)
          .subscribe();
        onAsk(`Fire ${str}`).then(() => this.fromUI$.next(str));
      });
    this.utils = { setGameState, take };
  }

  sendEvent = (event: Object) => {
    this.fromUI$.next(event);
  };

  start = async () => {
    await play(this.utils);
  };
}
