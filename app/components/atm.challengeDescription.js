// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  titleText: { fontSize: 30, color: '#333' },
  challengeDescriptionText: { fontSize: 26, color: '#333' },
  container: { paddingTop: 10, paddingBottom: 10 },
});

export default ({ challengeDescription }: Props) => (
  <View style={styles.container}>
    <Text style={styles.titleText}>Draw:</Text>
    <Text style={styles.challengeDescriptionText}>{challengeDescription}</Text>
  </View>
);
