import State from "@App/game/State";

describe("given a state", () => {
  const stateHash = {
    globals: {
      daysLeft: 5,
    },
    paths: {
      traveller: {
        health: 3,
      },
    },
  };
  const state: State = new State(stateHash);

  it("fetches globals", () => {
    expect(state.getGlobal("daysLeft")).toBe(5);
    expect(state.getGlobal("moons")).toBeUndefined();
  });

  it("fetches path variables", () => {
    expect(state.getPathVar("traveller", "health")).toBe(3);
    expect(state.getPathVar("traveller", "moons")).toBeUndefined();
    expect(state.getPathVar("wizard", "health")).toBeUndefined();
  });
});
