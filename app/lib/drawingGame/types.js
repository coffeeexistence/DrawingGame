// @flow

type Screens = {
  REQUEST_GAME_START: 'REQUEST_GAME_START',
  REQUEST_ROUND_START: 'REQUEST_ROUND_START',
  ROUND_IN_PROGRESS: 'ROUND_IN_PROGRESS',
  REVEAL_CRITERIA: 'REVEAL_CRITERIA',
};

export const SCREENS: Screens = {
  REQUEST_GAME_START: 'REQUEST_GAME_START',
  REQUEST_ROUND_START: 'REQUEST_ROUND_START',
  ROUND_IN_PROGRESS: 'ROUND_IN_PROGRESS',
  REVEAL_CRITERIA: 'REVEAL_CRITERIA',
};

export const USER_EVENTS = {
  USER_STARTED_GAME: 'USER_STARTED_GAME',
  USER_STARTED_ROUND: 'USER_STARTED_ROUND',
  USER_ENDED_ROUND: 'USER_ENDED_ROUND',
};

export type Player = {
  score: number,
};

export type GameConfiguration = {
  players: Player[],
  rounds: number,
};

export type Challenge = {
  criteria: string,
  challengeDescription: string,
};

export type RequestGameStartState = {
  screen: typeof SCREENS.REQUEST_ROUND_START,
};

export type RequestRoundStartState = {
  screen: typeof SCREENS.REQUEST_ROUND_START,
  challenge: Challenge,
  roundNumber: number,
};

export type RoundInProgressState = {
  screen: typeof SCREENS.ROUND_IN_PROGRESS,
  challenge: Challenge,
  roundNumber: number,
  secondsLeft: number,
};

export type RevealCriteriaState = {
  screen: typeof SCREENS.REVEAL_CRITERIA,
  challenge: Challenge,
  roundNumber: number,
};

export type GameState =
  | RequestGameStartState
  | RequestRoundStartState
  | RoundInProgressState
  | RevealCriteriaState;

export type Screen = $Keys<typeof SCREENS>;
export type UserEvent = $Keys<typeof USER_EVENTS>;
