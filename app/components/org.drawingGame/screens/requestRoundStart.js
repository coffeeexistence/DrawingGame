// @flow

import React from 'react';
import { type RequestRoundStartState } from 'app/lib/drawingGame/types';
import { Text, View } from 'react-native';

export default ({ screen, challenge, roundNumber }: RequestRoundStartState) => (
  <View>
    <Text>Screen: {screen}</Text>
    <Text>challenge: {JSON.stringify(challenge)}</Text>
    <Text>roundNumber: {roundNumber}</Text>
  </View>
);
