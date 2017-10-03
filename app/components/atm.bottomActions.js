// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 0,
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#444',
  },
});

export default ({ children }: Props) => (
  <View style={styles.container}>{children}</View>
);
