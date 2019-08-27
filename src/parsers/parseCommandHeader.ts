interface CommandHeader {
  type: string;
  params: { [index: string]: string };
}

const commandRe = /^%\s*(\w+)\s*(.*)\s*$/;
const commandParamsRe = /(\w*) *= *((['"])((\\\3|[^\3])*?)\3|(\w+))/g;

export function parseCommandHeader(line: string): CommandHeader {
  const match: RegExpMatchArray | null = line.match(commandRe);

  if (match == null) {
    throw new Error(`Invalid first line of command: ${line}`);
  }

  const header: CommandHeader = {
    type: match[1],
    params: {},
  };

  let paramMatch;
  while ((paramMatch = commandParamsRe.exec(match[2])) !== null) {
    header.params[paramMatch[1]] = paramMatch[5];
  }

  return header;
}
