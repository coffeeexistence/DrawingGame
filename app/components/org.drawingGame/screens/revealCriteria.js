// @flow

import React from 'react';
import { View, Dimensions } from 'react-native';
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
import FullRow from 'app/components/atm.FullRow';

export default class RevealCriteria extends React.Component {
  props: { gameState: RevealCriteriaState, game: any };

  endRound = () => this.props.game.sendEvent(USER_EVENTS.USER_ENDED_ROUND);

  render = () => {
    const { roundNumber, challenge } = this.props.gameState;
    return (
      <Screen>
        <FullRow center>
          <RoundBubble roundNumber={roundNumber} />
          <View flex={1} maxWidth={Dimensions.get('screen').width / 2}>
            <ChallengeDescription
              challengeDescription={challenge.challengeDescription}
            />
          </View>
        </FullRow>
        <FullRow vcenter hcenter expand>
          <HeaderWithSubheader
            header={'Winner is:'}
            subheader={challenge.criteria}
          />
        </FullRow>

        <BottomActions>
          <Button title="Winner selected" onPress={this.endRound} />
        </BottomActions>
      </Screen>
    );
  };
}
