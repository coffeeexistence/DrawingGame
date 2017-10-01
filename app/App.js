// @flow

import React from 'react';
import { AppRegistry } from 'react-native';
import DrawingGame from './components/org.drawingGame';

const App = () => <DrawingGame />;

export default App;

AppRegistry.registerComponent('DrawingGame', () => App);
