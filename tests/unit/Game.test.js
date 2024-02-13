import { test, expect } from "vitest";
import { Game } from "../../src/js/classes";

test("Test Render returns false if no element is provided", () => {
  // Mock player1
  const player1 = { mode: "X" };
  // Mock player2
  const player2 = { mode: "O" };
  // Mock Element ( not a real mock i know )
  let el = `<div></div>`;
  const game = new Game(player1, player2, el);

  expect(game.render()).toEqual(false);
});
test("Test onResetClick method resets game state", () => {
  // Mock player1
  const player1 = { mode: "X" };
  // Mock player2
  const player2 = { mode: "O" };
  // Mock Element ( not a real mock i know )
  let el = `<div></div>`;

  const game = new Game(player1, player2, el);
  // Mock initial game state
  game.state = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["X", "X", "O"],
  ];
  // Call onResetClick method
  game.onResetClick();
  // Expect game state to be reset to initial state
  expect(game.state).toEqual([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);
});

test("Test checkWinner method returns null if no winning player", () => {
  // Mock player1
  const player1 = { mode: "X" };
  // Mock player2
  const player2 = { mode: "O" };
  // Mock Element ( not a real mock i know )
  let el = `<div></div>`;
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
  // Mock player1
  const player1 = { mode: "X" };
  // Mock player2
  const player2 = { mode: "O" };
  // Mock Element ( not a real mock i know )
  let el = `<div></div>`;
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
  // Mock player1
  const player1 = { mode: "X" };
  // Mock player2
  const player2 = { mode: "O" };
  // Mock Element ( not a real mock i know )
  let el = `<div></div>`;
  const game = new Game(player1, player2, el);
  // Mock initial game state
  game.state = [
    ["X", "O", "X"],
    ["X", "O", "O"],
    ["X", "X", "O"],
  ];
  expect(game.checkWin()).toEqual("X");
});
