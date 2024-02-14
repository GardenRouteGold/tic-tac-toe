export class Game {
  #svgs;
  /**
   *
   * @param {Player} player1
   * @param {Player} player2
   * @param {Element} el What Element the game is going to be rendered
   */
  constructor(player1, player2, el) {
    // if (typeof el === "undefined") {
    //   throw new Error("Game Element is not defined!");
    // }
    this.size = 3;
    this.players = { player1, player2 };
    this.currentPlayer = player1;
    this.rounds = 0;
    this.state = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];

    this.el = el;

    this.winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.#svgs = {
      x: `<svg class="game-item game-x hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="10" />
      <line x1="90" y1="10" x2="10" y2="90" stroke="black" stroke-width="10" />
  </svg>`,
      o: `<svg class="game-item game-o hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="40" fill="none" stroke="black" stroke-width="10" />
  </svg>`,
    };
  }
  /**
   * Reset the game state to default
   */
  resetState() {
    this.state = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];
    // Set current player to player1 (X)
    this.currentPlayer = this.players.player1;
  }
  /**
   * Render the game
   * @returns render the game if the element is correct
   */
  render() {
    // A Sanity Check Added because I was throwing an exception on the constructor if no element was passed but this was blocking the unit tests
    if (typeof this.el !== "object") {
      return false;
    }
    // Reset the current element state
    this.el.innerHTML = "";
    // Create the new table
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");
    // Set class name for the table
    table.classList.add("game");
    // Loop through the rows
    const rows = this.state.map((row) => {
      // Create a new table row element
      let tableRow = document.createElement("tr");
      // Add the class to the element
      tableRow.classList.add("game-row");
      // Loop through the current 2d array
      let cells = row.map((cell) => {
        // Create td el
        let tableCell = document.createElement("td");
        tableCell.classList.add("game-cell");
        // Set custom data attribute
        tableCell.setAttribute("data-val", false);
        tableCell.addEventListener("click", this.onCellClick.bind(this));
        // Set SVG Content
        tableCell.innerHTML = `${this.#svgs.x} ${this.#svgs.o}`;
        // Append the element to the table row
        tableRow.appendChild(tableCell);
        // return updated elements
        return cell;
      });
      // Add the row to the table body
      tbody.appendChild(tableRow);
      return row;
    });
    table.appendChild(tbody);
    this.el.appendChild(table);
  }
  /**
   * Click handler for currentPlayers click
   *
   * @param {PointerEvent} ev The Cell that was clicked on
   */
  onCellClick(ev) {
    ev.stopPropagation();
    let el = ev.target;
    // Have we got the SVG ? if so get the td
    if (el.nodeName == "svg") {
      el = el.parentNode;
    }
    if (el.getAttribute("data-val") !== "false") {
      console.warn("already clicked this one");
      return;
    }
    // Get the SVG the current player need
    let svg = el.getElementsByClassName(
      "game-item " + (this.currentPlayer.mode === "X" ? "game-x" : "game-o")
    );
    // Show the SVG
    svg.item(0).classList.add("show");
    // Set the current cells value
    el.setAttribute("data-val", this.currentPlayer.mode);
    const cellIndex = el.cellIndex;
    const rowIndex = el.parentElement.rowIndex;
    // Update the game state
    this.state[rowIndex][cellIndex] = this.currentPlayer.mode;
    let gameTied = this.checkForTie();
    let winningPlayer = this.checkWin();
    // Check game is not tied and there is no winning player
    if (gameTied === true && winningPlayer === null) {
      alert(`The Game has ended in a tie!`);
      this.onResetClick();
    } else {
      // If no winning player
      if (winningPlayer === null) {
        this.changePlayer();
      } else {
        this.currentPlayer.win();
        alert(`${this.currentPlayer.mode} WINS !`);
        this.onResetClick();
      }
    }
  }
  /**
   * Reset button click handler
   */
  onResetClick() {
    this.resetState();
    this.render();
  }
  /**
   * Update the current player for the game
   */
  changePlayer() {
    if (this.currentPlayer.mode === "X") {
      this.currentPlayer.mode = "O";
    } else {
      this.currentPlayer.mode = "X";
    }
  }
  /**
   *
   * @returns string | null it will return null if there is no winner
   */
  checkWin() {
    const size = this.state.length;

    // Check rows
    for (let i = 0; i < size; i++) {
      if (
        this.state[i][0] &&
        this.state[i][0] === this.state[i][1] &&
        this.state[i][0] === this.state[i][2]
      ) {
        // Return the winning player
        return this.state[i][0];
      }
    }

    // Check columns
    for (let j = 0; j < size; j++) {
      if (
        this.state[0][j] &&
        this.state[0][j] === this.state[1][j] &&
        this.state[0][j] === this.state[2][j]
      ) {
        // Return the winning player
        return this.state[0][j];
      }
    }

    // Check diagonals
    if (
      this.state[0][0] &&
      this.state[0][0] === this.state[1][1] &&
      this.state[0][0] === this.state[2][2]
    ) {
      // Return the winning player
      return this.state[0][0];
    }
    if (
      this.state[0][2] &&
      this.state[0][2] === this.state[1][1] &&
      this.state[0][2] === this.state[2][0]
    ) {
      // Return the winning players
      return this.state[0][2];
    }

    // If no winner, and still has moves, return null
    return null;
  }

  /**
   * Check for a tie in the Tic-Tac-Toe game.
   * @returns {boolean} True if the game is tied, false otherwise.
   */
  checkForTie() {
    // Flatten the game state array to check if all cells are filled
    const flattenedState = this.state.flat();
    // Check if any cell is empty
    if (flattenedState.includes(false)) {
      // There are still empty cells, so the game is not tied
      return false;
    } else {
      // The Game is tied
      return true;
    }
  }
}
