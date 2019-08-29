export interface Block {
  startingLine: number;
  name: string;
  transitions: Array<Transition>;
}

export interface Transition {
  text: string;
  visible: boolean;
  target: string;
}
