// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: { fontSize: 30, color: '#444' },
  subheader: { fontSize: 26, color: '#444' },
  divider: {
    backgroundColor: '#ccc',
    width: '75%',
    height: 1.5,
    marginTop: 5,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
});

type Props = {
  header: string,
  subheader: string,
};

export default ({ header, subheader }: Props) => (
  <View style={styles.container}>
    <Text style={styles.header}>{header}</Text>
    <View style={styles.divider} />
    <Text style={styles.subheader}>{subheader}</Text>
  </View>
);
