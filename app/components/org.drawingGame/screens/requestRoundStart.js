// @flow

import React from 'react';
import { View } from 'react-native';
import {
  type RequestRoundStartState,
  USER_EVENTS,
} from 'app/lib/drawingGame/types';
import ChallengeDescription from 'app/components/atm.challengeDescription';
import Button from 'app/components/atm.button';
import Screen from 'app/components/atm.screen';
import BottomActions from 'app/components/atm.bottomActions';
import RoundBubble from 'app/components/atm.roundBubble';

export default class RequestRoundStart extends React.Component {
  props: { gameState: RequestRoundStartState, game: any };

  startRound = () => this.props.game.sendEvent(USER_EVENTS.USER_STARTED_ROUND);

  render = () => {
    const { roundNumber, challenge } = this.props.gameState;
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
          <Button title="Start Round" onPress={this.startRound} />
        </BottomActions>
      </Screen>
    );
  };
}
