import State from "@App/game/State";

describe("given a state", () => {
  const stateHash = {
    globals: {
      daysLeft: 5,
    },
    paths: {
      traveller: {
        locations: {},
        variables: {
          health: 3,
        },
      },
    },
  };
  const state: State = new State(stateHash);

  it("fetches globals", () => {
    expect(state.getGlobal("daysLeft")).toBe(5);
    expect(state.getGlobal("moons")).toBeUndefined();
  });

  it("overwrites globals", () => {
    state.setGlobal("daysLeft", 6);
    expect(state.getGlobal("daysLeft")).toBe(6);
  });

  it("creates new globals", () => {
    state.setGlobal("galaxies", 4);
    expect(state.getGlobal("galaxies")).toBe(4);
  });

  it("fetches path variables", () => {
    expect(state.getPathVar("traveller", "health")).toBe(3);
    expect(state.getPathVar("traveller", "moons")).toBeUndefined();
    expect(state.getPathVar("wizard", "health")).toBeUndefined();
  });

  it("sets new path variables for existing paths", () => {
    state.setPathVar("traveller", "health", 6);
    expect(state.getPathVar("traveller", "health")).toBe(6);

    state.setPathVar("traveller", "dinosaurs", "raptor");
    expect(state.getPathVar("traveller", "dinosaurs")).toBe("raptor");
  });

  // does this error when trying to create a new path?
});
