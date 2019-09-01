import { Command } from "@App/script/Script";
import Validator from "./Validator";

export interface Block {
  name: string;
  data: string;
  transitions: Array<Transition>;
}

export interface Transition {
  text: string;
  visible: boolean;
  targetType: string;
  targetName?: string;
}

export interface ValidatesBehavior {
  check(): ValidationResponse;
}

export interface ValidationResponse {
  valid: boolean;
  errors: Array<ValidationError>;
}

export interface ValidationError {
  type: string;
  message: string;
  startLine?: number;
  endLine?: number;
}

export default class Engine {
  validator: ValidatesBehavior;

  startingBlock: string | null;
  blocks: { [name: string]: Block };
  blockOrder: Array<string>;

  constructor() {
    this.startingBlock = null;
    this.validator = new Validator(this);
    this.blocks = {};
    this.blockOrder = [];
  }

  addCommand(command: Command): void {
    if (command.type == "block") {
      this.addBlock(command);
    } else {
      throw new Error(`unknown block type ${command.type} found`);
    }
  }

  private addBlock(command: Command): void {
    const name: string =
      command.params["name"] || `unnamed_block_${this.blockOrder.length}`;

    // check if block name taken
    if (this.blocks[name]) {
      throw new Error(`block name ${name} already defined`);
    }

    const block: Block = {
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
          const endTransition: Transition = {
            text: "The End",
            visible: true,
            targetType: "end",
          };
          block.transitions.push(endTransition);
        } else {
          const nextBlockName = this.blockOrder[i + 1];
          const nextTransition: Transition = {
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

  getStartingBlock(): Block {
    if (this.startingBlock == null) {
      throw new Error("no starting block defined.");
    }

    return this.blocks[this.startingBlock];
  }

  getBlock(name: string): Block {
    return this.blocks[name];
  }
}
