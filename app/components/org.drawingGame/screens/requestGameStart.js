// @flow

import React from 'react';
import { type RequestGameStartState } from 'app/lib/drawingGame/types';
import { Text, View } from 'react-native';

export default ({ screen }: RequestGameStartState) => (
  <View>
    <Text>Screen: {screen}</Text>
  </View>
);
