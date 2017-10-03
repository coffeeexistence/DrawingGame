// @flow

import React from 'react';
import { type RoundInProgressState } from 'app/lib/drawingGame/types';
import { View, Dimensions } from 'react-native';
import ChallengeDescription from 'app/components/atm.challengeDescription';
import Screen from 'app/components/atm.screen';
import Countdown from 'app/components/atm.countdown';
import RoundBubble from 'app/components/atm.roundBubble';
import FullRow from 'app/components/atm.FullRow';

type Props = { gameState: RoundInProgressState };

export default ({ gameState }: Props) => {
  const { challenge, roundNumber } = gameState;
  return (
    <Screen>
      <FullRow center>
        <RoundBubble roundNumber={roundNumber} />
        <View flex={1} maxWidth={Dimensions.get('screen').width / 2}>
          <ChallengeDescription
            challengeDescription={challenge.challengeDescription}
          />
        </View>
      </FullRow>
      <FullRow vcenter hcenter expand />
      <Countdown secondsLeft={gameState.secondsLeft} />
    </Screen>
  );
};
