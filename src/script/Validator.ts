import Script, { ValidatesBehavior, ValidationResponse } from "./script";

export default class Validator implements ValidatesBehavior {
  private _script: Script;

  constructor(script: Script) {
    this._script = script;
  }

  check(): ValidationResponse {
    const response: ValidationResponse = {
      valid: true,
      errors: [],
    };

    if (this._script.blockOrder.length == 0) {
      response.valid = false;
      response.errors.push({
        type: "NoBlocksFound",
        message: "A script must have at least one block.",
      });
    }
    return response;
  }
}
