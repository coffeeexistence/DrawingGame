// @flow

import React from 'react';
import { type RoundInProgressState } from 'app/lib/drawingGame/types';
import { View } from 'react-native';
import ChallengeDescription from 'app/components/atm.challengeDescription';
import Screen from 'app/components/atm.screen';
import Countdown from 'app/components/atm.countdown';
import BottomActions from 'app/components/atm.bottomActions';
import RoundBubble from 'app/components/atm.roundBubble';

type Props = { gameState: RoundInProgressState };

export default ({ gameState }: Props) => {
  const { challenge, roundNumber } = gameState;
  return (
    <Screen>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          minHeight: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RoundBubble roundNumber={roundNumber} />
        <ChallengeDescription
          challengeDescription={challenge.challengeDescription}
        />
      </View>

      <BottomActions>
        <Countdown secondsLeft={gameState.secondsLeft} />
      </BottomActions>
    </Screen>
  );
};
