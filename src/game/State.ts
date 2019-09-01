export interface KeyHash {
  [index: string]: string | number;
}
export interface PathHash {
  [pathName: string]: KeyHash;
}

export interface StateHash {
  globals: KeyHash;
  paths: PathHash;
}
export default class State {
  private _state: StateHash;

  constructor(state?: StateHash) {
    this._state = state || this.defaultState();
  }

  getState(): StateHash {
    return this._state;
  }

  getGlobal(key: string): string | number | undefined {
    return this._state.globals[key];
  }

  getPathVar(pathKey: string, key: string): string | number | undefined {
    const path: KeyHash | null = this._state.paths[pathKey];

    if (path == undefined) {
      return undefined;
    }

    return path[key];
  }

  private defaultState(): StateHash {
    const state: StateHash = {
      globals: {},
      paths: {},
    };

    return state;
  }
}
