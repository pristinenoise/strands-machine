import Engine, { ValidatesBehavior, ValidationResponse } from "./Engine";

export default class Validator implements ValidatesBehavior {
  private _engine: Engine;

  constructor(engine: Engine) {
    this._engine = engine;
  }

  check(): ValidationResponse {
    const response: ValidationResponse = {
      valid: true,
      errors: [],
    };

    if (this._engine.blockOrder.length == 0) {
      response.valid = false;
      response.errors.push({
        type: "NoBlocksFound",
        message: "A script must have at least one block.",
      });
    }
    return response;
  }
}
