// @flow

import React from 'react';
import HeaderWithSubHeader from 'app/components/atm.headerWithSubheader';

export default ({ challengeDescription }: Props) => (
  <HeaderWithSubHeader header={'Draw:'} subheader={challengeDescription} />
);
