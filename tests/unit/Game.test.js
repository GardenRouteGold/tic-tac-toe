import { test, expect } from "vitest";
import { Game } from "../../src/js/classes";

test("Test Render returns false if no element is provided", () => {
  const player1 = { mode: "X" }; // Mock player1
  const player2 = { mode: "O" }; // Mock player2
  let el = `<div></div>`; // Mock Element ( not a real mock i know )
  const game = new Game(player1, player2, el);

  expect(game.render()).toEqual(false);
});
test("Test onResetClick method resets game state", () => {
  const player1 = { mode: "X" }; // Mock player1
  const player2 = { mode: "O" }; // Mock player2
  let el = `<div></div>`; // Mock Element ( not a real mock i know )

  const game = new Game(player1, player2, el);
  // Mock initial game state
  game.state = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["X", "X", "O"],
  ];

  // Spy on the resetState and render methods
  //   const resetStateSpy = jest.spyOn(game, "resetState");
  //   const renderSpy = jest.spyOn(game, "render");

  // Call onResetClick method
  game.onResetClick();
  //   // Expect resetState and render methods to have been called
  //   expect(resetStateSpy).toHaveBeenCalled();
  //   expect(renderSpy).toHaveBeenCalled();

  // Expect game state to be reset to initial state
  expect(game.state).toEqual([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);
});

test("Test checkWinner method returns null if no winning player", () => {
  const player1 = { mode: "X" }; // Mock player1
  const player2 = { mode: "O" }; // Mock player2
  let el = `<div></div>`; // Mock Element ( not a real mock i know )
  const game = new Game(player1, player2, el);
  // Mock initial game state
  game.state = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["O", "X", "O"],
  ];
  expect(game.checkWin()).toEqual(null);
});

test("Test checkWinner method returns winner if winner horizontal", () => {
  const player1 = { mode: "X" }; // Mock player1
  const player2 = { mode: "O" }; // Mock player2
  let el = `<div></div>`; // Mock Element ( not a real mock i know )
  const game = new Game(player1, player2, el);
  // Mock initial game state
  game.state = [
    ["X", "O", "X"],
    ["O", "O", "O"],
    ["X", "X", "O"],
  ];
  expect(game.checkWin()).toEqual("O");
});

test("Test checkWinner method returns winner if winner vertical", () => {
  const player1 = { mode: "X" }; // Mock player1
  const player2 = { mode: "O" }; // Mock player2
  let el = `<div></div>`; // Mock Element ( not a real mock i know )
  const game = new Game(player1, player2, el);
  // Mock initial game state
  game.state = [
    ["X", "O", "X"],
    ["X", "O", "O"],
    ["X", "X", "O"],
  ];
  expect(game.checkWin()).toEqual("X");
});
