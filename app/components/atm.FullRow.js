// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  expand: { flex: 1 },
  vcenter: { alignItems: 'center' },
  hcenter: { justifyContent: 'center' },
});

type Props = {
  children: typeof React.Children,
  vcenter?: boolean,
  hcenter?: boolean,
  expand?: boolean,
};

const FullRow = ({ children, hcenter, vcenter, expand }: Props) => (
  <View
    style={[
      styles.container,
      hcenter && styles.hcenter,
      vcenter && styles.vcenter,
      expand && styles.expand,
    ]}
  >
    {children}
  </View>
);

FullRow.defaultProps = {
  hcenter: false,
  vcenter: false,
  expand: false,
};

export default FullRow;
