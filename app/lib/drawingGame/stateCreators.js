// @flow

import {
  type Challenge,
  type RequestGameStartState,
  type RequestRoundStartState,
  type RoundInProgressState,
  type RevealCriteriaState,
  SCREENS,
} from './types';

export const requestGameStart = (): RequestGameStartState => ({
  screen: SCREENS.REQUEST_GAME_START,
});

type RequestRoundStartParams = {
  challenge: Challenge,
  roundNumber: number,
};

export const requestRoundStart = ({
  challenge,
  roundNumber,
}: RequestRoundStartParams): RequestRoundStartState => ({
  screen: SCREENS.REQUEST_ROUND_START,
  challenge,
  roundNumber,
});

type RoundInProgressParams = {
  challenge: Challenge,
  secondsLeft: number,
  roundNumber: number,
};

export const roundInProgress = ({
  challenge,
  secondsLeft,
  roundNumber,
}: RoundInProgressParams): RoundInProgressState => ({
  screen: SCREENS.ROUND_IN_PROGRESS,
  challenge,
  roundNumber,
  secondsLeft,
});

type RevealCriteriaParams = {
  challenge: Challenge,
  roundNumber: number,
};

export const revealCriteria = ({
  challenge,
  roundNumber,
}: RevealCriteriaParams): RevealCriteriaState => ({
  screen: SCREENS.REVEAL_CRITERIA,
  challenge,
  roundNumber,
});
