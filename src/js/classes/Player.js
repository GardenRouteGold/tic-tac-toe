export class Player {
  /**
   *
   * @param {string} name       Player name
   * @param {string} mode       X || O
   * @param {boolean} playing   Currently making a move
   * @param {number} score      Count of wins
   */
  constructor(name, mode, playing, score) {
    this.name = name;
    this.mode = mode;
    this.playing = playing;
    this.score = score;
  }

  /**
   * @param {string} name
   */
  setName(name) {
    if (typeof name === "string") {
      this.name = name;
    } else {
      throw new Error("Expected a string.");
    }
  }

  /**
   * @param {boolean} playing
   */
  setPlaying(playing) {
    if (typeof playing === "boolean") {
      this.playing = playing;
    } else {
      throw new Error("Expected a string.");
    }
  }

  /**
   * Increment the score
   */
  win() {
    console.log("Player " + this.name + " WON");
    this.score = ++this.score;
  }
}
