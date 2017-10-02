// @flow

import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Q from 'q';
import GameEngineConnector from 'app/lib/drawingGame';
import { SCREENS, type GameState } from 'app/lib/drawingGame/types';

import RequestGameStart from './screens/requestGameStart';
import RequestRoundStart from './screens/requestRoundStart';
import RoundInProgress from './screens/roundInProgress';
import RevealCriteria from './screens/revealCriteria';

const styles = StyleSheet.create({
  container: { width: '100%', height: '100%', padding: 20, paddingTop: 30 },
});

const mapGameStateToScreen = (
  gameState: GameState,
  game: typeof GameEngineConnector,
) => {
  switch (gameState.screen) {
    case SCREENS.REQUEST_GAME_START:
      return <RequestGameStart gameState={gameState} game={game} />;
    case SCREENS.REQUEST_ROUND_START:
      return <RequestRoundStart gameState={gameState} game={game} />;
    case SCREENS.ROUND_IN_PROGRESS:
      return <RoundInProgress gameState={gameState} />;
    case SCREENS.REVEAL_CRITERIA:
      return <RevealCriteria gameState={gameState} game={game} />;
    default:
      return null;
  }
};

export default class DrawingGame extends React.Component {
  state = {
    ask: 'initial ask state',
    resolveAsk: () => {},
    gameState: { screen: SCREENS.REQUEST_GAME_START },
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

    this.game = new GameEngineConnector(onSetGameState, ask);
    // eslint-disable-next-line no-console
    this.game.start().catch(console.error);
  };

  game: any;

  render = () => (
    <View style={styles.container}>
      {mapGameStateToScreen(this.state.gameState, this.game)}
    </View>
  );
}
