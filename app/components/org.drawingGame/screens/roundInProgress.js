// @flow

import React from 'react';
import { type RoundInProgressState } from 'app/lib/drawingGame/types';
import { Text, View } from 'react-native';
import ChallengeDescription from 'app/components/atm.challengeDescription';

type Props = { gameState: RoundInProgressState };

export default ({ gameState }: Props) => {
  const { challenge, roundNumber } = gameState;
  return (
    <View>
      <Text>Round {roundNumber}</Text>
      <ChallengeDescription
        challengeDescription={challenge.challengeDescription}
      />
      <Text>{gameState.secondsLeft} seconds remaining.</Text>
    </View>
  );
};
