// @flow

import React from 'react';
import { type RoundInProgressState } from 'app/lib/drawingGame/types';
import { Text, View } from 'react-native';
import ChallengeDescription from 'app/components/atm.challengeDescription';
import Screen from 'app/components/atm.screen';
import Countdown from 'app/components/atm.countdown';
import BottomActions from 'app/components/atm.bottomActions';

type Props = { gameState: RoundInProgressState };

export default ({ gameState }: Props) => {
  const { challenge, roundNumber } = gameState;
  return (
    <Screen>
      <Text>Round {roundNumber}</Text>
      <ChallengeDescription
        challengeDescription={challenge.challengeDescription}
      />

      <BottomActions>
        <Countdown secondsLeft={gameState.secondsLeft} />
        <View height={20} />
      </BottomActions>
    </Screen>
  );
};
