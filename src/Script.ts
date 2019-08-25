interface BlockIndex {
  [blockName: string]: Block;
}

interface Block {
  startingLine: number;
  name: string;
  transitions: Array<Transition>;
}

interface Transition {
  text: string;
  visible: boolean;
  target: string;
}

export default class Script {
  startingBlock: string | null;
  blocks: BlockIndex;

  constructor() {
    this.startingBlock = null;
    this.blocks = {};
  }

  getBlock(name: string): Block {
    return this.blocks[name];
  }

  getStartingBlock(): Block | null {
    if (this.startingBlock) {
      return this.blocks[this.startingBlock];
    } else {
      return null;
    }
  }
}
