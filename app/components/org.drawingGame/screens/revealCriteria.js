// @flow

import React from 'react';
import {
  type RevealCriteriaState,
  USER_EVENTS,
} from 'app/lib/drawingGame/types';
import { Text, View, Button } from 'react-native';
import ChallengeDescription from 'app/components/atm.challengeDescription';

export default class RevealCriteria extends React.Component {
  props: { gameState: RevealCriteriaState, game: any };

  endRound = () => this.props.game.sendEvent(USER_EVENTS.USER_ENDED_ROUND);

  render = () => {
    const { roundNumber, challenge } = this.props.gameState;
    return (
      <View>
        <Text>Round {roundNumber}</Text>
        <ChallengeDescription
          challengeDescription={challenge.challengeDescription}
        />
        <Text>{challenge.criteria}</Text>
        <Button title="Tap when winner selected" onPress={this.endRound} />
      </View>
    );
  };
}
