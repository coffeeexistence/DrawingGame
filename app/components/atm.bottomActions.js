// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    paddingBottom: 20,
  },
});

export default ({ children }: Props) => (
  <View style={styles.container}>{children}</View>
);
