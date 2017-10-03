// @flow

import Rx from 'rxjs';
import { type GameState, type UserEvent } from './types';
import game from './game';

export default class GameEngineConnector {
  fromUI$ = new Rx.Subject();
  gameState$ = new Rx.Subject();
  utils: {
    setGameState: (state: GameState) => void,
    take: UserEvent => Promise<*>,
  };

  take = (str: string) =>
    new Promise(resolve => {
      this.fromUI$
        .filter(event => str === event)
        .take(1)
        .do(resolve)
        .subscribe();
    });

  setGameState = (state: GameState) => this.gameState$.next(state);

  constructor(onGameStateChanged: Object => void, _onAsk: any => Promise<*>) {
    this.gameState$.subscribe(onGameStateChanged);
    this.utils = { setGameState: this.setGameState, take: this.take };
  }

  sendEvent = (event: Object) => {
    this.fromUI$.next(event);
  };

  start = async () => {
    await game.play(this.utils);
  };
}
