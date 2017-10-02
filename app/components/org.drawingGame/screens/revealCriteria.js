// @flow

import React from 'react';
import { View } from 'react-native';
import {
  type RevealCriteriaState,
  USER_EVENTS,
} from 'app/lib/drawingGame/types';
import ChallengeDescription from 'app/components/atm.challengeDescription';
import Button from 'app/components/atm.button';
import Screen from 'app/components/atm.screen';
import BottomActions from 'app/components/atm.bottomActions';
import RoundBubble from 'app/components/atm.roundBubble';
import HeaderWithSubheader from 'app/components/atm.headerWithSubheader';

export default class RevealCriteria extends React.Component {
  props: { gameState: RevealCriteriaState, game: any };

  endRound = () => this.props.game.sendEvent(USER_EVENTS.USER_ENDED_ROUND);

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
          <HeaderWithSubheader
            header={'Winner is:'}
            subheader={challenge.criteria}
          />
          <View height={15} />
          <Button title="Tap when winner selected" onPress={this.endRound} />
        </BottomActions>
      </Screen>
    );
  };
}
