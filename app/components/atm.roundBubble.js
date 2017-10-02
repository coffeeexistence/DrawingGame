// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center', flex: 1 },
  round: { fontSize: 20, color: 'white' },
  number: { fontSize: 26, color: 'white' },
  bubble: {
    backgroundColor: '#648093',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
});

type Props = { roundNumber: number };

export default ({ roundNumber }: Props) => (
  <View style={styles.container}>
    <View style={styles.bubble}>
      <Text style={styles.round}>Round</Text>
      <Text style={styles.number}>{roundNumber}</Text>
    </View>
  </View>
);
