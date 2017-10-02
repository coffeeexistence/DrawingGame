// @flow

import React from 'react';
import {
  type RequestRoundStartState,
  USER_EVENTS,
} from 'app/lib/drawingGame/types';
import { Text } from 'react-native';
import ChallengeDescription from 'app/components/atm.challengeDescription';
import Button from 'app/components/atm.button';
import Screen from 'app/components/atm.screen';
import BottomActions from 'app/components/atm.bottomActions';

export default class RequestRoundStart extends React.Component {
  props: { gameState: RequestRoundStartState, game: any };

  startRound = () => this.props.game.sendEvent(USER_EVENTS.USER_STARTED_ROUND);

  render = () => {
    const { roundNumber, challenge } = this.props.gameState;
    return (
      <Screen>
        <Text>Round {roundNumber}</Text>
        <ChallengeDescription
          challengeDescription={challenge.challengeDescription}
        />
        <BottomActions>
          <Button title="Start Round" onPress={this.startRound} />
        </BottomActions>
      </Screen>
    );
  };
}
