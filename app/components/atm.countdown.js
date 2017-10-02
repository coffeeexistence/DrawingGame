// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '30%',
  },
  title: { color: '#bbb', fontSize: 30 },
  text: { color: '#bbb', fontSize: 125 },
});

type Props = { secondsLeft: number };

export default ({ secondsLeft }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>Time remaining:</Text>
    <Text style={styles.text}>{secondsLeft}</Text>
  </View>
);
