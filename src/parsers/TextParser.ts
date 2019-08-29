import ScriptBuilder from "./ScriptBuilder";
import { isCommandHeader, parseCommandHeader } from "./parseCommandHeader";

import * as parsers from "./parsers";

export default class TextParser {
  static readonly commentRegex = /^\/\//;

  scriptBuilder: ScriptBuilder;
  private _lines: Array<string>;
  private _numberLines: number;
  commands: Array<parsers.Command>;

  constructor(rawInput: string) {
    this._lines = rawInput.match(/[^\r\n]+/g) || [];
    this._numberLines = this._lines.length;
    this.scriptBuilder = new ScriptBuilder();
    this.commands = [];
    this.parseIntoCommands();
    // this.makeScript();
  }

  // private makeScript(): void {}

  private parseIntoCommands(): void {
    let activeLine = 0;
    do {
      const command: parsers.Command | null = this.parseNextCommand(activeLine);
      if (command == null) {
        break;
      }

      this.commands.push(command);

      activeLine = command.endLine + 1;
    } while (activeLine < this._numberLines);
  }

  private parseNextCommand(earliestLine: number): parsers.Command | null {
    const command: parsers.Command = {
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
        const header: parsers.CommandHeader = parseCommandHeader(line);

        command.type = header.type;
        command.params = header.params;
      }
    }

    if (!commandFound) {
      return null;
    }

    for (let i = command.startLine + 1; i < this._numberLines; i++) {
      const line = this._lines[i];
      if (isCommandHeader(line)) {
        command.endLine = i - 1;
        break;
      }
    }

    command.data = this._lines
      .slice(command.startLine, command.endLine)
      .join("\n");

    return command;
  }
}
