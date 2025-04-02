const puppeteer = require("puppeteer");
const { spawn } = require("child_process");
const assert = require("assert");

let server, browser, page;

before(async function () {
  this.timeout(20000)
  server = spawn("node", ["index.js"], { shell: true });

  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:8080");
});

after(async function () {
  await browser.close();
  server.kill();
});

describe("Connection Test", function () {
  it(`should h1 with "Home content" exist`, async function () {
    const homeContent = await page.$eval("h1", (el) => el.textContent);
    assert.strictEqual(homeContent, "Home content");
  });

  it("should create buttons successfully", async function () {
    const buttons = await page.$$("button");
    assert.ok(buttons.length > 0, "Buttons were not created");
  });
});
