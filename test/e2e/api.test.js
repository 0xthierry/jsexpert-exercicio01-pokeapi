const { expect } = require("chai");
const { describe, it } = require("mocha");
const request = require("supertest");
const https = require("https");
const sinon = require("sinon");
const app = require("../../src/api");
const TeamService = require("../../src/service/team-service");

const mocks = {
  bulbasaur: require("../mocks/bulbasaur.json"),
};

describe("API Suite test", () => {
  describe("/", () => {
    it("should request the / and return HTTP Status 200 and JSON response", async () => {
      const response = await request(app).get("/").expect(200);
      expect(typeof response.body === "object").to.be.ok;
    });
  });

  describe("/teams", () => {
    let sandbox = {};

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => sandbox.restore());

    it("should request the /teams and return HTTP Status 200 and JSON response", async () => {
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

      const response = await request(app).get("/teams").expect(200);
      const expected = [
        {
          id: 1,
          name: "bulbasaur",
          moves: ["razor-wind", "swords-dance", "cut"],
        },
        {
          id: 1,
          name: "bulbasaur",
          moves: ["razor-wind", "swords-dance", "cut"],
        },
        {
          id: 1,
          name: "bulbasaur",
          moves: ["razor-wind", "swords-dance", "cut"],
        },
      ];

      expect(response.body).to.deep.include.members(expected);
    });
  });
});
