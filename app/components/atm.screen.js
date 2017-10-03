// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#222',
  },
});

export default ({ children }: Props) => (
  <View style={styles.container}>{children}</View>
);
