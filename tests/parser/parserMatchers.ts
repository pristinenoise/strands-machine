import Script, {
  ValidationResponse,
  ValidationError,
} from "@App/script/Script";

interface ExtendedMatchers extends jest.Matchers<void> {
  toBeAValidScript(): void;
  toMatchScriptError(pattern: RegExp): void;
}

expect.extend({
  toBeAValidScript(received: Script) {
    const response = received.checkValidity();
    const errorMessages = response.errors.map((err: ValidationError) => {
      `${err.type}: ${err.message}`;
    });

    if (response.valid == true) {
      return {
        message: (): string =>
          `expected script to have errors, but had no errors.`,
        pass: true,
      };
    } else {
      return {
        message: (): string => `expected script to have no errors, but had ${
          errorMessages.length
        } errors: 
          ${errorMessages.join("\n")} 
        `,
        pass: false,
      };
    }
  },
  toMatchScriptError(received: Script, pattern: RegExp) {
    const response: ValidationResponse = received.checkValidity();
    const errorMessages = response.errors.map((err: ValidationError) => {
      return `${err.type}: ${err.message}`;
    });

    if (response.valid == true) {
      return {
        message: (): string =>
          `expected script to have errors, but had no errors.`,
        pass: true,
      };
    } else {
      const matchingErrors = errorMessages.filter((msg: string) =>
        pattern.test(msg)
      );

      if (matchingErrors.length >= 0) {
        return {
          message: (): string => `
            expected script to have no errors matching ${pattern}, but found matching errors:
            ${matchingErrors.join("\n")}
          `,
          pass: true,
        };
      } else {
        return {
          message: (): string => `
            expected script to have errors matching ${pattern}, but no matches were found:
            ${errorMessages.join("\n")}
          `,
          pass: false,
        };
      }
    }
  },
});
