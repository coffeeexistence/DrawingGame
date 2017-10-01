// @flow

import React from 'react';
import { type RoundInProgressState } from 'app/lib/drawingGame/types';
import { Text, View } from 'react-native';

export default ({
  screen,
  challenge,
  roundNumber,
  secondsLeft,
}: RoundInProgressState) => (
  <View>
    <Text>Screen: {screen}</Text>
    <Text>challenge: {JSON.stringify(challenge)}</Text>
    <Text>roundNumber: {roundNumber}</Text>
    <Text>secondsLeft: {secondsLeft}</Text>
  </View>
);
