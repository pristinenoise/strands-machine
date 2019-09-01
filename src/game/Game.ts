import Engine from "@App/engine/Engine";
import State from "./State";

export default class Game {
  private _engine: Engine;
  private _state: State;

  constructor(engine: Engine) {
    this._engine = engine;
    this._state = new State();
  }
}
