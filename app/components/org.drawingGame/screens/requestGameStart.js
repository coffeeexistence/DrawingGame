// @flow

import React from 'react';
import {
  // type RequestGameStartState,
  USER_EVENTS,
} from 'app/lib/drawingGame/types';
import { View, Button } from 'react-native';

export default class RequestGameStart extends React.Component {
  props: { game: any };

  startRound = () => {
    this.props.game.sendEvent(USER_EVENTS.USER_STARTED_GAME);
  };

  render = () => (
    <View>
      <Button title="Start Round" onPress={this.startRound} />
    </View>
  );
}
