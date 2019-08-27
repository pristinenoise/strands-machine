import ScriptBuilder from "../ScriptBuilder";
// import { parseCommandHeader } from "./parseCommandHeader";

interface ParserCommand {
  category: string | null;
  startLine: number;
  endLine: number;
  data: ParserCommandParams;
}

interface ParserCommandParams {
  name: string;
  block: string;
}

export default class TextParser {
  static readonly commentRegex = /^\/\//;

  scriptBuilder: ScriptBuilder;
  private _lines: Array<string>;
  private _numberLines: number;
  commands: Array<ParserCommand>;

  constructor(rawInput: string) {
    this._lines = rawInput.match(/[^\r\n]+/g) || [];
    this._numberLines = this._lines.length;
    this.scriptBuilder = new ScriptBuilder();
    this.commands = [];
    this.parseInput();
  }

  private parseInput(): void {
    let activeLine = 0;
    do {
      activeLine = this.parseNextCommand(activeLine);
    } while (activeLine < this._numberLines);
  }

  private parseNextCommand(earliestLine: number): number {
    //const startLine: number | null = null;
    // const endLine: number | null = null;

    for (let i = earliestLine; i < this._numberLines; i++) {
      // const line = this._lines[i];
    }

    return this._numberLines;
  }
}
