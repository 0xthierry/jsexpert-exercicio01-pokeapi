const Request = require("../../src/lib/request");
const chaiAsPromised = require("chai-as-promised");
const chai = require("chai");
const sinon = require("sinon");
const https = require("https");

chai.use(chaiAsPromised);
const expect = chai.expect;

const mocks = {
  bulbasaur: require("../mocks/bulbasaur.json"),
};

describe("Request lib Test Suite", () => {
  let request = {};
  let sandbox = {};

  before(() => {
    request = new Request({ baseURL: "https://pokeapi.co/api/v2" });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => sandbox.restore());

  it("should make the request and return a bulbasaur", async () => {
    const responseAsBuffer = Buffer.from(JSON.stringify(mocks.bulbasaur));

    sandbox.stub(https, "get").yields({
      on: sinon
        .stub()
        .withArgs("end")
        .yields()
        .withArgs("data")
        .yields(responseAsBuffer),
      statusCode: 200,
    });

    const result = await request.get(`/pokemon/${mocks.bulbasaur.id}`);
    const expected = {
      data: mocks.bulbasaur,
      statusCode: 200,
    };

    expect(result).to.be.deep.equal(expected);
  });

  it("should throw an error when request is wrong", async () => {
    sandbox.stub(https, "get").returns({
      on: sinon
        .stub()
        .withArgs("error")
        .yields(new Error("something went wrong")),
    });

    const result = request.get(`/pokemon/non_existing_id`);

    await expect(result).to.be.rejectedWith("something went wrong");
  });
});
