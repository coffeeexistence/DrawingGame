// @flow

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  text: { fontSize: 26, color: 'white' },
  button: {
    backgroundColor: '#B58DD6',
    borderRadius: 3,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginRight: 19,
  },
});

export default ({ onPress, title }: Props) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={{ flex: 1, minWidth: 50 }}
    onPress={onPress}
  >
    <View style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </View>
  </TouchableOpacity>
);
