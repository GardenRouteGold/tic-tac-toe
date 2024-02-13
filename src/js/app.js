import { Game, Player } from "./classes";

(function () {
  // set up our players array
  let players = [
    new Player("Player 1", "X", true, 0),
    new Player("Player 2", "O", false, 0),
  ];
  // Get the DOM Element
  const el = document.getElementById("board");
  // Instantiate the new Game class
  let game = new Game(players[0], players[1], el);
  // Render the game
  game.render();
  // Attach the game to the window so we can reference it
  window.Game = game;
})();
