export interface KeyHash {
  [index: string]: string | number;
}
export interface PathState {
  locations: KeyHash;
  variables: KeyHash;
}

export interface PathHash {
  [index: string]: PathState;
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

  setGlobal(key: string, value: string | number): void {
    this._state.globals[key] = value;
  }

  getPathVar(pathName: string, key: string): string | number | undefined {
    const path: PathState | null = this._state.paths[pathName];

    if (path == undefined) {
      return undefined;
    }

    return path.variables[key];
  }

  setPathVar(pathKey: string, key: string, value: string | number): void {
    const path: PathState | null = this._state.paths[pathKey];

    // TODO: we should figure out what setpathvar does for a non-existent path
    if (path == undefined) {
      return;
    }

    path.variables[key] = value;
  }

  private defaultState(): StateHash {
    const state: StateHash = {
      globals: {},
      paths: {},
    };

    return state;
  }
}
