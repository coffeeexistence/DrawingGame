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
import FullRow from 'app/components/atm.FullRow';

export default class RequestRoundStart extends React.Component {
  props: { gameState: RequestRoundStartState, game: any };

  startRound = () => this.props.game.sendEvent(USER_EVENTS.USER_STARTED_ROUND);

  render = () => {
    const { roundNumber, challenge } = this.props.gameState;
    return (
      <Screen>
        <FullRow center>
          <RoundBubble roundNumber={roundNumber} />
        </FullRow>
        <FullRow vcenter hcenter expand>
          <ChallengeDescription
            challengeDescription={challenge.challengeDescription}
          />
        </FullRow>
        <BottomActions>
          <Button title="Start Round" onPress={this.startRound} />
        </BottomActions>
      </Screen>
    );
  };
}
