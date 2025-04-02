const assert = require("assert");
const { ApplicationService } = require("../lib/ApplicationService");

// write mocha tests for ApplicationService
describe("ApplicationService", () => {
  describe("getInfo", () => {
    it("should return an object", () => {
      const info = ApplicationService.getInfo();
      assert.strictEqual(typeof info, "object");
    });
    it("name should be a string", () => {
      const info = ApplicationService.getInfo();
      assert.strictEqual(typeof info.name, "string");
    });
    it("version should be like x.x.x", () => {
      const info = ApplicationService.getInfo();
      assert.match(info.version, /^\d+\.\d+\.\d+$/);
    });
  });
});
