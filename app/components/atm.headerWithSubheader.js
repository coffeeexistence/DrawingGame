// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: { fontSize: 30, color: '#999' },
  subheader: { fontSize: 30, color: '#D7C2E8' },
  container: {
    flexDirection: 'column',
    paddingRight: 10,
    paddingLeft: 10,
  },
});

type Props = {
  header: string,
  subheader: string,
};

export default ({ header, subheader }: Props) => (
  <View style={styles.container}>
    <Text style={styles.header}>{header}</Text>
    <Text style={styles.subheader}>{subheader}</Text>
  </View>
);
