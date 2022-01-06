const DocsController = require("../../src/controllers/docs-controller");
const { expect } = require("chai");

describe("Docs Controller Test Suite", () => {
  let docsController = {};

  before(() => {
    docsController = new DocsController();
  });

  it("should return api documentation and status code 200", () => {
    const result = docsController.index();
    const expected = {
      body: ["/teams - GET - Return three random pokemons"],
      statusCode: 200,
    };

    expect(result).to.be.deep.equal(expected);
  });
});
