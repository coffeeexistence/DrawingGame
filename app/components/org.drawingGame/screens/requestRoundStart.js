// @flow

import React from 'react';
import {
  type RequestRoundStartState,
  USER_EVENTS,
} from 'app/lib/drawingGame/types';
import { Text, View, Button } from 'react-native';

export default class RequestRoundStart extends React.Component {
  props: { gameState: RequestRoundStartState, game: any };

  startGame = () => this.props.game.sendEvent(USER_EVENTS.USER_STARTED_ROUND);

  render = () => (
    <View>
      <Text>Screen: {screen}</Text>
      <Text>challenge: {JSON.stringify(this.props.gameState.challenge)}</Text>
      <Text>roundNumber: {this.props.gameState.roundNumber}</Text>
      <Button title="Start Game" onPress={this.startGame} />
    </View>
  );
}
