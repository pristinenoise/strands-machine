import Engine from "../engine/Engine";
import {
  CommandHeader,
  isCommandHeader,
  parseCommandHeader,
} from "./parseCommandHeader";

export interface Command {
  type: string;
  params: { [name: string]: string };
  startLine: number;
  endLine: number;
  data: string;
}

const commentRe = /^\s*\/\//;

export default class Script {
  static readonly commentRegex = /^\/\//;

  engine: Engine;
  private _lines: Array<string>;
  private _numberLines: number;
  commands: Array<Command>;

  constructor(rawInput: string) {
    this._lines = rawInput.match(/[^\r\n]+/g) || [];
    this._numberLines = this._lines.length;
    this.engine = new Engine();
    this.commands = [];
    this.parseIntoCommands();
    this.makeEngine();
  }

  private makeEngine(): void {
    this.commands.forEach(command => {
      this.engine.addCommand(command);
    });
    this.engine.wireDefaultTransitions();
  }

  private parseIntoCommands(): void {
    let activeLine = 0;
    do {
      const command: Command | null = this.parseNextCommand(activeLine);
      if (command == null) {
        break;
      }

      this.commands.push(command);

      activeLine = command.endLine + 1;
    } while (activeLine < this._numberLines);
  }

  private parseNextCommand(earliestLine: number): Command | null {
    const command: Command = {
      type: "unknown",
      params: {},
      startLine: earliestLine,
      endLine: this._numberLines - 1,
      data: "",
    };

    let commandFound = false;

    // find start
    for (let i = earliestLine; i < this._numberLines; i++) {
      const line = this._lines[i];
      if (isCommandHeader(line)) {
        command.startLine = i;
        commandFound = true;
        const header: CommandHeader = parseCommandHeader(line);

        command.type = header.type;
        command.params = header.params;

        break;
      }
    }

    if (!commandFound) {
      return null;
    }

    const lines: Array<string> = [];
    for (let i = command.startLine + 1; i < this._numberLines; i++) {
      const line = this._lines[i];
      if (isCommandHeader(line)) {
        command.endLine = i - 1;
        break;
      } else if (!this.isComment(line)) {
        lines.push(line);
      }
    }

    command.data = lines.join("\n");

    return command;
  }

  private isComment(line: string): boolean {
    return commentRe.test(line);
  }
}
