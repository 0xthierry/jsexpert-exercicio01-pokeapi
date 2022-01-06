const { expect } = require("chai");
const random = require("../../src/lib/random");

describe("Random Lib Test Suite", () => {
  it("should retrieve a random number between 0 and 10", () => {
      const result = random.randomNumberMinMax({ min: 0, max: 10 })

      expect(result).to.be.lte(10).and.be.gte(0)
  });
});
