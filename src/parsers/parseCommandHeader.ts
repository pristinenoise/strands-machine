const commandRe = /^\s*%\s*(\w+)\s*(.*)\s*$/;
const commandParamsRe = /(\w*) *= *((['"])((\\\3|[^\3])*?)\3|(\w+))/g;

import * as parser from "./parsers";

export function isCommandHeader(line: string): boolean {
  return commandRe.test(line);
}

export function parseCommandHeader(line: string): parser.CommandHeader {
  const match: RegExpMatchArray | null = line.match(commandRe);

  if (match == null) {
    throw new Error(`Invalid first line of command: ${line}`);
  }

  const commandType = match[1];
  const commandParams = match[2];

  const header: parser.CommandHeader = {
    type: commandType,
    params: {},
  };

  let paramMatch;
  while ((paramMatch = commandParamsRe.exec(commandParams)) !== null) {
    header.params[paramMatch[1]] = paramMatch[4];
  }

  return header;
}
