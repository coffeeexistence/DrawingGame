// @flow

import Rx, { Observable as $ } from 'rxjs';
import repeatPromiseSequential from '../repeatPromiseSequential';
import nouns from './nouns';
import adjectives from './adjectives';
import criteria from './criteria';

const selectRandom = array => array[Math.floor(Math.random() * array.length)];

type Player = {
  score: number,
};

type GameConfiguration = {
  players: Player[],
  rounds: number,
};

type Challenge = {
  criteria: string,
  challengeDescription: string,
};

const SCREENS = {
  REQUEST_GAME_START: 'REQUEST_GAME_START',
  REQUEST_ROUND_START: 'REQUEST_ROUND_START',
  ROUND_IN_PROGRESS: 'ROUND_IN_PROGRESS',
  REVEAL_CRITERIA: 'REVEAL_CRITERIA',
};

const USER_EVENTS = {
  USER_STARTED_GAME: 'USER_STARTED_GAME',
  USER_STARTED_ROUND: 'USER_STARTED_ROUND',
  USER_ENDED_ROUND: 'USER_ENDED_ROUND',
};

type RequestGameStartAction = () => {
  screen: typeof SCREENS.REQUEST_GAME_START,
};

type RequestRoundStartAction = ({
  challenge: Challenge,
  roundNumber: number,
}) => {
  screen: typeof SCREENS.REQUEST_ROUND_START,
  challenge: Challenge,
  roundNumber: number,
};

type RoundInProgressAction = ({
  challenge: Challenge,
  secondsLeft: number,
  roundNumber: number,
}) => {
  screen: typeof SCREENS.ROUND_IN_PROGRESS,
  challenge: Challenge,
  roundNumber: number,
  secondsLeft: number,
};

type RevealCriteriaAction = ({
  challenge: Challenge,
  roundNumber: number,
}) => {
  screen: typeof SCREENS.REVEAL_CRITERIA,
  challenge: Challenge,
  roundNumber: number,
};

const requestGameStart: RequestGameStartAction = () => ({
  screen: SCREENS.REQUEST_GAME_START,
});
const requestRoundStart: RequestRoundStartAction = ({
  challenge,
  roundNumber,
}) => ({
  screen: SCREENS.REQUEST_ROUND_START,
  challenge,
  roundNumber,
});

const roundInProgress: RoundInProgressAction = ({
  challenge,
  secondsLeft,
  roundNumber,
}) => ({
  screen: SCREENS.ROUND_IN_PROGRESS,
  challenge,
  roundNumber,
  secondsLeft,
});

const revealCriteria: RevealCriteriaAction = ({ challenge, roundNumber }) => ({
  screen: SCREENS.REVEAL_CRITERIA,
  challenge,
  roundNumber,
});

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
