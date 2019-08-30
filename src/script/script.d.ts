export interface Block {
  name: string;
  data: string;
  transitions: Array<Transition>;
}

export interface Transition {
  text: string;
  visible: boolean;
  targetType: string;
  targetName?: string;
}

export interface ValidationResponse {
  valid: boolean;
  errors: Array<ValidationError>;
}

export interface ValidationError {
  type: string;
  message: string;
  startLine?: number;
  endLine?: number;
}
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAValidScript(): R;
      toMatchScriptError(pattern: RegExp): R;
    }
  }
}
