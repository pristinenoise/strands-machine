export interface CommandHeader {
  type: string;
  params: { [name: string]: string };
}

export interface Command {
  type: string;
  params: { [name: string]: string };
  startLine: number;
  endLine: number;
  data: string;
}
