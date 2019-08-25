import Script from "../script";

export default class TextParser {
  script: Script;
  rawInput: string;

  constructor(rawInput: string) {
    this.rawInput = rawInput;
    this.script = new Script();
  }

  getScript(): Script {
    return this.script;
  }
}
