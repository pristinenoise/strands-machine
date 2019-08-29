export interface Block {
  name: string;
  data: string;
  transitions: Array<Transition>;
}

export interface Transition {
  text: string;
  visible: boolean;
  targetType: string;
  targetName: string;
}
