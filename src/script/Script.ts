import * as script from "./script.d";
import * as parsers from "../parsers/parsers";

export default class Script {
  startingBlock: string | null;
  blocks: { [name: string]: script.Block };
  blockOrder: Array<string>;

  constructor() {
    this.startingBlock = null;
    this.blocks = {};
    this.blockOrder = [];
  }

  checkValidity(): script.ValidationResponse {
    const response: script.ValidationResponse = {
      valid: true,
      errors: [],
    };

    if (this.blockOrder.length == 0) {
      response.valid = false;
      response.errors.push({
        type: "NoBlocksFound",
        message: "A script must have at least one block.",
      });
    }
    return response;
  }

  addCommand(command: parsers.Command): void {
    if (command.type == "block") {
      this.addBlock(command);
    } else {
      throw new Error(`unknown block type ${command.type} found`);
    }
  }

  private addBlock(command: parsers.Command): void {
    const name: string =
      command.params["name"] || `unnamed_block_${this.blockOrder.length}`;

    // check if block name taken
    if (this.blocks[name]) {
      throw new Error(`block name ${name} already defined`);
    }

    const block: script.Block = {
      name: name,
      data: command.data,
      transitions: [],
    };

    this.blocks[name] = block;
    this.blockOrder.push(name);

    if (this.startingBlock == null) {
      this.startingBlock = name;
    }
  }

  wireDefaultTransitions(): void {
    for (let i = 0; i < this.blockOrder.length; i++) {
      const name = this.blockOrder[i];
      const block = this.blocks[name];

      if (block.transitions.length == 0) {
        if (i == this.blockOrder.length - 1) {
          const endTransition: script.Transition = {
            text: "The End",
            visible: true,
            targetType: "end",
          };
          block.transitions.push(endTransition);
        } else {
          const nextBlockName = this.blockOrder[i + 1];
          const nextTransition: script.Transition = {
            text: nextBlockName,
            visible: true,
            targetType: "block",
            targetName: nextBlockName,
          };
          block.transitions.push(nextTransition);
        }
      }
    }
  }

  getStartingBlock(): script.Block {
    if (this.startingBlock == null) {
      throw new Error("no starting block defined.");
    }

    return this.blocks[this.startingBlock];
  }

  getBlock(name: string): script.Block {
    return this.blocks[name];
  }
}
