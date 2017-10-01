// @flow

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Q from 'q';
import GameEngineConnector from '../../lib/drawingGame';

const styles = StyleSheet.create({
  container: { marginTop: 50, width: '100%', height: '100%' },
});

export default class DrawingGame extends React.Component {
  state = {
    ask: 'initial ask state',
    resolveAsk: () => {},
    gameState: {},
  };

  componentDidMount = () => {
    const ask = question => {
      const deferred = Q.defer();
      const resolveAsk = deferred.resolve;
      this.setState({ ask: question, resolveAsk });
      deferred.promise.then(() => this.setState({ ask: null }));
      return deferred.promise;
    };

    const onSetGameState = gameState => this.setState({ gameState });

    const game = new GameEngineConnector(onSetGameState, ask);
    game.start().catch(console.error);
  };

  render = () => (
    <View style={styles.container}>
      <Text>{JSON.stringify(this.state.gameState)}</Text>
      {this.state.ask && (
        <Button title={this.state.ask} onPress={this.state.resolveAsk} />
      )}
    </View>
  );
}
