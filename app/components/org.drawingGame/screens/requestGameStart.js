// @flow

import React from 'react';
import { View } from 'react-native';
import {
  // type RequestGameStartState,
  USER_EVENTS,
} from 'app/lib/drawingGame/types';
import Button from 'app/components/atm.button';
import Screen from 'app/components/atm.screen';
import BottomActions from 'app/components/atm.bottomActions';

export default class RequestGameStart extends React.Component {
  props: { game: any };

  startRound = () => {
    this.props.game.sendEvent(USER_EVENTS.USER_STARTED_GAME);
  };

  render = () => (
    <Screen>
      <View flex={1} />
      <BottomActions>
        <Button title="New Game" onPress={this.startRound} />
      </BottomActions>
    </Screen>
  );
}
