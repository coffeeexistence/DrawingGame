// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  round: { fontSize: 20, color: '#D7C2E8', backgroundColor: 'transparent' },
  number: { fontSize: 26, color: '#D7C2E8', backgroundColor: 'transparent' },
  bubble: {
    backgroundColor: '#222',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderColor: '#D7C2E8',
    borderWidth: 3,
  },
});

type Props = { roundNumber: number };

// <View
//   style={{
//     backgroundColor: '#D7C2E8',
//     height: '100%',
//     width: 5,
//     position: 'absolute',
//     left: 0,
//   }}
// />

export default ({ roundNumber }: Props) => (
  <View style={styles.container}>
    <View style={styles.bubble}>
      <Text style={styles.round}>Round</Text>
      <Text style={styles.number}>{roundNumber}</Text>
    </View>
  </View>
);
