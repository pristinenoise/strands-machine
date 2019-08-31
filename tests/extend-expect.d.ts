declare namespace jest {
  interface Matchers<R> {
    toBeAValidScript(): R;
    toMatchScriptError(pattern: RegExp): R;
  }
}
