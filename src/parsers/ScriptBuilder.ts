import * as script from "./script.d";
import * as parsers from "./parsers.d";

export default class ScriptBuilder {
  startingBlock: string;
  blocks: { [name: string]: script.Block };

  constructor() {
    this.startingBlock = "start";
    this.blocks = {};
  }

  // addCommand(command: parsers.Command): void {}

  getBlock(name: string): script.Block {
    return this.blocks[name];
  }
}
