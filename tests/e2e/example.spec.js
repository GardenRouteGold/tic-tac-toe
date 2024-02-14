// @ts-check
const { test, expect } = require("@playwright/test");

test("has title", async ({ page }) => {
  await page.goto("http://127.0.0.1:8080/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Tic Tac Toe/);
});

test.describe("Tic-Tac-Toe Game", () => {
  let page;
  // Launch a browser instance before each test
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("http://127.0.0.1:8080"); // Assuming your game is hosted at http://127.0.0.1:8080
  });
  // Close the browser instance after each test
  test.afterEach(async () => {
    await page.close();
  });
  test("Player X wins the game", async ({ page }) => {
    await page.goto("http://127.0.0.1:8080"); // Assuming your game is hosted at http://127.0.0.1:8080

    // Click on the game cells to simulate player interactions
    await page.locator(".game-cell").nth(0).click();
    await page.locator(".game-cell").nth(4).click();
    await page.locator(".game-cell").nth(1).click();
    await page.locator(".game-cell").nth(5).click();
    await page.locator(".game-cell").nth(2).click();

    // Assert that the alert displays the correct winner
    await page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert");
      expect(dialog.message()).toContain("X WINS");
      await dialog.accept();
    });
  });
  test("Player O wins the game", async ({ page }) => {
    await page.goto("http://127.0.0.1:8080"); // Assuming your game is hosted at http://127.0.0.1:8080

    // Click on the game cells to simulate player interactions
    await page.locator(".game-cell").nth(4).click();
    await page.locator(".game-cell").nth(0).click();
    await page.locator(".game-cell").nth(5).click();
    await page.locator(".game-cell").nth(1).click();
    await page.locator(".game-cell").nth(8).click();
    await page.locator(".game-cell").nth(2).click();

    // Assert that the alert displays the correct winner
    await page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert");
      expect(dialog.message()).toContain("O WINS");
      await dialog.accept();
    });
  });
  test("Game ends in a tie", async ({ page }) => {
    await page.goto("http://127.0.0.1:8080"); // Assuming your game is hosted at http://127.0.0.1:8080

    // Click on the game cells to simulate player interactions
    await page.locator(".game-cell").nth(0).click();
    await page.locator(".game-cell").nth(1).click();
    await page.locator(".game-cell").nth(2).click();
    await page.locator(".game-cell").nth(4).click();
    await page.locator(".game-cell").nth(3).click();
    await page.locator(".game-cell").nth(5).click();
    await page.locator(".game-cell").nth(7).click();
    await page.locator(".game-cell").nth(6).click();
    await page.locator(".game-cell").nth(8).click();

    // Assert that the alert displays the game has ended in a tie
    await page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert");
      expect(dialog.message()).toContain("The Game has ended in a tie!");
      await dialog.accept();
    });
  });
  test("Clicking the reset button updates the game state", async ({ page }) => {
    await page.goto("http://127.0.0.1:8080"); // Assuming your game is hosted at http://127.0.0.1:8080

    // Click on the game cells to simulate player interactions
    await page.locator(".game-cell").nth(0).click();
    await page.locator(".game-cell").nth(1).click();
    await page.locator(".game-cell").nth(2).click();
    // Click on the reset button
    await page.locator("#reset").nth(0).click();
    expect(page.locator(".game-cell svg").nth(0).isHidden());
    expect(page.locator(".game-cell svg").nth(1).isHidden());
    expect(page.locator(".game-cell svg").nth(2).isHidden());
  });
  test("Clicking on squares to place X or O", async () => {
    // Click on the first game cell
    await page.click(".game-cell:nth-child(1)");

    // Verify that an X SVG appears in the clicked cell
    const xSvgVisible = await page.isVisible(".game-cell:nth-child(1) .game-x");
    expect(xSvgVisible).toBe(true);

    // Click on the second game cell
    await page.click(".game-cell:nth-child(2)");

    // Verify that an O SVG appears in the clicked cell
    const oSvgVisible = await page.isVisible(".game-cell:nth-child(2) .game-o");
    expect(oSvgVisible).toBe(true);
  });
});
