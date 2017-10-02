// @flow

import React from 'react';
import {
  type RequestRoundStartState,
  USER_EVENTS,
} from 'app/lib/drawingGame/types';
import { Text, View, Button } from 'react-native';
import ChallengeDescription from 'app/components/atm.challengeDescription';

export default class RequestRoundStart extends React.Component {
  props: { gameState: RequestRoundStartState, game: any };

  startRound = () => this.props.game.sendEvent(USER_EVENTS.USER_STARTED_ROUND);

  render = () => {
    const { roundNumber, challenge } = this.props.gameState;
    return (
      <View>
        <Text>Round {roundNumber}</Text>
        <ChallengeDescription
          challengeDescription={challenge.challengeDescription}
        />
        <Button title="Start Round" onPress={this.startRound} />
      </View>
    );
  };
}
